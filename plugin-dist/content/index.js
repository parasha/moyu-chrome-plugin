console.log('content sctipt run');

// get popup2content info
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request.info)
  sendResponse('我收到了，background~')
});

// Chrome提供的大部分API是不支持在content_scripts中运行
// sendMessage onMessage 是可以使用
// run!
chrome.runtime.sendMessage({
  info: "我是 content.js"
}, res => {
  // 答复
  // alert(res)
  console.log(res);
})
