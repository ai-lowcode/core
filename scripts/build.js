import { argv, cwd } from 'node:process'

import { findWorkspacePackages } from '@pnpm/workspace.find-packages'
import { execa } from 'execa'
import minimist from 'minimist'

const args = minimist(argv.slice(2))
const targets = args._
const formatArgs = args.formats
const prod = args.prod || args.p
const buildTypes = args.types || args.t

async function run() {
  const packages = await findWorkspacePackages(cwd())
  const targetPackageName = `@ai-lowcode/${targets[0]}`
  const manifest = packages.filter(item => item.manifest.name === targetPackageName)[0].manifest

  await execa('pnpm', ['--filter', manifest.name, 'build'], {
    stdio: 'inherit',
    env: {
      PROD: prod,
      FORMATS: formatArgs || (!prod ? 'es' : undefined),
      VERSION: manifest.version,
    },
  })

  if (buildTypes) {
    await execa('pnpm', ['--filter', manifest.name, 'build:dts'], {
      stdio: 'inherit',
    })
  }
}

run()
