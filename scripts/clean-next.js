import { rmSync } from 'fs'

try {
  rmSync('.next', { recursive: true, force: true })
  console.log('Cleaned .next folder')
} catch (error) {
  // Folder doesn't exist, that's fine
}
