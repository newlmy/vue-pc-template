function fixType (type) {
  return 'image/' + type.toLocaleLowerCase().replace(/jpg/i, 'jpeg').match(/png|jpeg|bmp|gif/)[0]
}
function isImage (path) {
  return /\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(path)
}
function isJSON (path) {
  return /\.(json)$/.test(path)
}
function getFile ({e, type}) {
  let files = e.target.files
  if (files.length <= 0) return false
  if (type === 'multiple') {
    let arr = []
    files.forEach((file) => {
      let index = file.name.lastIndexOf('.')
      arr.push({
        file: file,
        name: file.name.substring(0, index),
        ext: file.name.substr(index)
      })
    })
    return arr
  } else {
    let file = files[0]
    let index = file.name.lastIndexOf('.')
    return {
      file: file,
      name: file.name.substring(0, index),
      ext: file.name.substr(index)
    }
  }
}
function fileTransformDataURL (file) {
  return URL.createObjectURL(file)
}
function canvasTransformDataURL ({canvas, imgType = 'png'}) {
  let type = fixType(imgType)
  let dataURL = canvas.toDataURL(type)
  return dataURL
}
function dataTransformJSONDataURL (data) {
  return URL.createObjectURL(new Blob([JSON.stringify(data)]))
}
function fileTransformJSON (file) {
  let promise = new Promise((resolve, reject) => {
    let oFReader = new FileReader()
    oFReader.onload = function (result) {
      resolve(result)
    }
    oFReader.readAsText(file)
  })
  return promise
}
function autoDownload ({dataURL, filename}) {
  let eleLink = document.createElement('a')
  eleLink.download = filename
  eleLink.style.display = 'none'
  eleLink.href = dataURL
  document.body.appendChild(eleLink)
  eleLink.click()
  document.body.removeChild(eleLink)
}
export {fixType, isImage, isJSON, getFile, autoDownload, fileTransformDataURL, canvasTransformDataURL, dataTransformJSONDataURL, fileTransformJSON}