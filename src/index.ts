console.log('hello world')

import { run } from './app'

(async function () {
  console.log('preparing to run...')
  await run()
  console.log('run complete')
})().catch((err) => {
  console.warn('Unhandled error capture in final catch of app')
  console.error(err)
})

