console.log('hello world')

import { run } from './app'

const button = document.getElementById('run-button')

button.addEventListener('click', async () => {
  const jsonUpload = document.getElementById('json-upload');
  const weightsUpload = document.getElementById('weights-upload');

  if ( jsonUpload.files[0] && weightsUpload.files[0] ) {
    await run(jsonUpload.files[0], weightsUpload.files[0])
  }

})