import fs from 'node:fs/promises'

import { startRegexDoctor } from '../src'

{
  using doctor = startRegexDoctor()
  await import('./foo')

  doctor.stop()
  const regex = /This should not be matched/
  const _result = regex.exec('This is a test')

  await fs.writeFile('./regex-doctor.json', JSON.stringify(doctor.dump(), null, 2))
}
