// 全局库demo
function getTitle() {
  return document ? document.title : ''
}

function setTitle(title) {
  document && (document.title = title)
}

var initDocumentTitle = getTitle()

console.log('load global-lib-demo successfully!')
