import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { runInNewContext } from 'node:vm'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const read = path => readFile(new URL(path, root), 'utf8')
const require = createRequire(import.meta.url)
const pkg = JSON.parse(await read('package.json'))

// These are static/built-factory regressions, not a real browser mount test.
test('manifest declares the target cohort and all injected peers', () => {
  assert.equal(pkg.peerDependencies['@deepseek-ai/cordis'], '^4.0.1')
  for (const [name, range] of Object.entries(pkg.peerDependencies)) {
    if (name.startsWith('@deepseek-ai/dsh-')) assert.equal(range, '^0.1.5-rc.2')
  }
  for (const [name, version] of Object.entries(pkg.devDependencies)) {
    if (name.startsWith('@deepseek-ai/dsh-')) assert.equal(version, '0.1.5-rc.2')
  }
  for (const name of pkg.dsh.client.inject) assert.ok(pkg.peerDependencies[name], name)
  assert.deepEqual(pkg.dsh.client.inject, [
    '@deepseek-ai/dsh-client-ui-slots',
    '@deepseek-ai/dsh-client-ui-conversation',
  ])
})

test('removed runtime cannot survive manifest, source, preset, lockfile or artifacts', async () => {
  for (const path of ['package.json', 'pnpm-lock.yaml', 'src/client/index.ts',
    'scripts/dsh-client-preset.ts', 'client.js', 'client.js.map']) {
    assert.doesNotMatch(await read(path), /@deepseek-ai\/dsh-client-runtime/, path)
  }
  const lock = await read('pnpm-lock.yaml')
  const versions = [...lock.matchAll(/@deepseek-ai\/dsh-[^@'\s]+@(0\.[^('\s:]+)/g)].map(match => match[1])
  assert.ok(versions.length > 0)
  assert.deepEqual([...new Set(versions)], ['0.1.5-rc.2'])
})

test('built factory uses only React externals and registers the existing slot', async () => {
  let descriptor
  runInNewContext(await read('client.js'), {
    window: { __ModuleLoader__: { load(value) { descriptor = value } } },
  })
  assert.equal(descriptor.id, pkg.name)
  const externals = []
  const plugin = descriptor.factory(name => {
    assert.ok(['react', 'react-dom', 'react/jsx-runtime'].includes(name), name)
    externals.push(name)
    return require(name)
  })
  assert.equal(typeof plugin.apply, 'function')
  assert.deepEqual(Array.from(plugin.inject), ['slots', 'conversation'])
  const registrations = []
  plugin.apply({ slots: { register(options, component) { registrations.push({ options, component }) } } })
  assert.equal(registrations.length, 1)
  assert.equal(registrations[0].options.name, 'conversation.session.header.actions')
  assert.equal(registrations[0].options.id, 'chat-jump-widget')
  assert.equal(registrations[0].options.order, 50)
  assert.equal(typeof registrations[0].component, 'function')
  assert.deepEqual(externals.sort(), ['react', 'react-dom', 'react/jsx-runtime'])
})

test('built host entry remains a side-effect-free plugin', async () => {
  const host = await import(new URL('index.mjs', root))
  assert.equal(host.name, 'chat-jump')
  assert.deepEqual(host.inject, [])
  assert.equal(host.apply({}), undefined)
})

test('client bundle contains rules and logic to automatically disable DSH new turn navigation UI', async () => {
  const clientJs = await read('client.js')
  assert.match(clientJs, /nav\[aria-label[^\]]*轮次导航/)
  assert.match(clientJs, /nav\[aria-label[^\]]*navigation/i)
  assert.match(clientJs, /dsh-native-turn-nav/)
  assert.match(clientJs, /dsh-turn-nav-disabled/)
})
