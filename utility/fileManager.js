const fs = require('fs-extra')

const file = '/tmp/this/path/does/not/exist/file.txt'

fs.pathExists(file, (err, exists) => {
  console.log(err) // => null
  console.log(exists) // => false
})

fs.outputFile(file, 'hello!', err => {
  console.log(err) // => null

  fs.readFile(file, 'utf8', (err, data) => {
    if (err) return console.error(err)
    console.log(data) // => hello!
  })
})

fs.outputJson(file, {name: 'JP'}, err => {
  console.log(err) // => null
  fs.readJson(file, (err, data) => {
    if (err) return console.error(err)
    console.log(data.name) // => JP
  })
})

fs.writeJson('./package.json', {name: 'fs-extra'}, err => {
  if (err) return console.error(err)
  console.log('success!')
})

fs.readJson('./package.json', (err, packageObj) => {
  if (err) console.error(err)
  console.log(packageObj.version) // => 0.1.3
})

fs.remove('/tmp/myfile', err => {
  if (err) return console.error(err)
  console.log('success!')
})

fs.remove('/home/jprichardson', err => {
  if (err) return console.error(err)
  console.log('success!') // I just deleted my entire HOME directory.
})