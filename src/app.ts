import * as tf from "@tensorflow/tfjs"

const randomNumbersArray = (count: number = 100) => {
  return Array(count).fill(0).map(() => {
    return Math.random()
  })
}

const normaliseThanActivatedData = (dataArray: number[]) => {
  let i = 0
  let len = dataArray.length

  for ( ; i < len ; i+= 1 ) {
    dataArray[i] = dataArray[i] * 0.5 + 0.5
  }

  return dataArray
}

const canvas = document.getElementById('pixel-panel')

/**
 * Print each 3 numbers as one pixel, and break line after 128 pixels.
 * 
 * @param dataArray number array
 */
const printFromPixelArray = (dataArray: number[]) => {
  const context2D = canvas.getContext('2d')
  const iamgeContent = context2D.createImageData( 128, 64 )
  const data = iamgeContent.data;

  let i = 0
  let len = dataArray.length
  for ( ; i < len; i += 1 ) {
    data[i] = dataArray[i] * 255
  }

  context2D.putImageData(iamgeContent, 0, 0)
}

export const run = async (modelData, weightData) => {

  // loadModel expets to "load" from http or something like that.
  // we can also provide a API interface that loads data. 
  // since we have the data already here in modelJSON, we pass it
  // along.
  const model = await tf.loadModel(
    tf.io.browserFiles([modelData, weightData])
  )

  // const model = await tf.loadModel('../assets/nn/model.json')

  console.log('succesfully loaded model:')
  model.summary()

  const randoms = randomNumbersArray(100)
  const noise = tf.tensor2d([randoms])

  console.log('will call predict model with:')
  noise.print()

  const predictionResult = await model.predict(noise).data()

  console.log('normalizing data to be between 0 - 1...')
  normaliseThanActivatedData(predictionResult)

  console.log("expcting data to have 3 values per pixel, 128 x 64 pixels per image")

  console.log("extracitng first 128 x 64 x 3 values as first image")

  const firstImageSet = predictionResult.slice(0, 128 * 64 * 3)

  console.log('attempting canvas print of first iamge set')

  printFromPixelArray(firstImageSet)

}