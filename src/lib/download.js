import _ from 'lodash'

function download (filename, obj, document) {
  var element = document.createElement('a')
  element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(_.toPlainObject(obj), null, '  ')))
  element.setAttribute('download', `${filename}.json`)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

export default download
