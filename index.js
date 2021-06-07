const fs = require('fs')
const path = './debug.txt'

const fileHandler = {
  createFile: () => fs.open(path, 'w', (err) => {
    if(err) throw err
  }),
  updateFile: (data) => fs.appendFile(path, `${data}\n`, (err) => {
    if(err) { throw err }
  }),
  checkFile: () => fs.existsSync(path)
}

const logWriter = () => {
  if (fileHandler.checkFile()) {
    setInterval(() => {
      const date = new Date
      fileHandler.updateFile(date)
    }, 1000)
  } else {
    fileHandler.createFile()
    setInterval(() => {
      const date = new Date
      fileHandler.updateFile(date)
    }, 1000)
  }
}

logWriter()