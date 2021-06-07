const PATH = require('path')
const fileHandler = require('./src/fileHandler.js')
const optimizeSVG = require('./src/lib/svgo.js')
const IMG_PATH = PATH.resolve(__dirname, './src/assets')
const OPTIMIZE_IMG_PATH = PATH.resolve(__dirname, './build/images')
const DEBUG_PATH = PATH.resolve(__dirname, './debug.log')

//---------------------------------
const logWriter = (data) => {
  if (fileHandler.checkFile(DEBUG_PATH)) {
    fileHandler.updateFile(DEBUG_PATH, data)
  } else {
    fileHandler.createFile(DEBUG_PATH)
    fileHandler.updateFile(DEBUG_PATH, data)
  }
}

const createRecord = (fileName, leadTime) => {
  const date = new Date()
  const prevSize = fileHandler.getSize(`${IMG_PATH}/${fileName}`)
  const newSize = fileHandler.getSize(`${OPTIMIZE_IMG_PATH}/${fileName}`)
  const result = `[дата:${date.toLocaleString()}] имя файла:${fileName} ${IMG_PATH} ==> ${OPTIMIZE_IMG_PATH} размер файла:${prevSize} ==> ${newSize} время выполнения: ${leadTime}`
  logWriter(result)
}


const imgArr = fileHandler.getFiles(IMG_PATH)

imgArr.forEach((fileName) => {
  const filePath = `${IMG_PATH}/${fileName}`
  const svg = fileHandler.readFile(filePath)
  const date = new Date()
  const newSVG = optimizeSVG(svg, filePath)
  const time  = new Date()
  
  fileHandler.createFile(`${OPTIMIZE_IMG_PATH}/${fileName}`)
  fileHandler.updateFile(`${OPTIMIZE_IMG_PATH}/${fileName}`, newSVG.data)
  createRecord(fileName, time - date)
})
