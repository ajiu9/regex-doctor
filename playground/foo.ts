import fs from 'node:fs/promises'

import { startRegexDoctor } from '../src'

using doctor = startRegexDoctor()

const regex  = /This   should not be matched/

await fs.writeFile('regex-doctor.json', JSON.stringify(doctor.dump(), null, 2), 'utf-8')
