/* eslint-env node */
import { readFileSync } from 'fs'
import { createHmac } from 'crypto'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Read .env file
const envPath = join(__dirname, '..', '.env')
let envContent = ''

try {
  envContent = readFileSync(envPath, 'utf-8')
} catch {
  console.error('Error: Could not read .env file. Make sure it exists in the root directory.')
  process.exit(1)
}

// Parse .env file
const envVars = {}
envContent.split('\n').forEach(line => {
  const trimmedLine = line.trim()
  if (trimmedLine && !trimmedLine.startsWith('#')) {
    const equalIndex = trimmedLine.indexOf('=')
    if (equalIndex > 0) {
      const key = trimmedLine.substring(0, equalIndex).trim()
      let value = trimmedLine.substring(equalIndex + 1).trim()
      // Remove surrounding quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      if (key && value) {
        envVars[key] = value
      }
    }
  }
})

// Get required variables
const apiKey = envVars.VITE_API_KEY || process.env.VITE_API_KEY
const userId = envVars.VITE_USER_ID || process.env.VITE_USER_ID

if (!apiKey) {
  console.error('Error: VITE_API_KEY not found in .env file or environment variables.')
  console.error('Please add VITE_API_KEY=your_api_key to your .env file.')
  process.exit(1)
}

if (!userId) {
  console.error('Error: VITE_USER_ID not found in .env file or environment variables.')
  console.error('Please add VITE_USER_ID=your_user_id to your .env file.')
  process.exit(1)
}

// Generate hash
const key = Buffer.from(apiKey, 'utf-8')
const hash = createHmac('sha256', key).update(userId).digest('hex')

console.log('\n✅ Generated VITE_HASHED_USER_ID:')
console.log(hash)
console.log('\n📋 Copy this value and add it to your .env file as:')
console.log(`VITE_HASHED_USER_ID=${hash}\n`)

