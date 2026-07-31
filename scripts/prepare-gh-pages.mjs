import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

writeFileSync(join('dist', '.nojekyll'), '');
