const FS = require('fs')

const fileHandler = {
  createFile: (filePath) => FS.openSync(filePath, 'w'),
  updateFile: (filePath, data) => FS.appendFileSync(filePath, `${data}\n`),
  readFile: (filePath) => FS.readFileSync(filePath, 'utf8'),
  checkFile: (filePath) => FS.existsSync(filePath),
  getFiles: (filePath) => FS.readdirSync(filePath),
  getSize: (filePath) => FS.statSync(filePath).size
}
module.exports = fileHandler