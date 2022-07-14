console.log('content run');


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	console.log('content 接收:', request);
  console.log('sender:', sender);

  sendResponse('来自 content runtime 的回复');

  chrome.runtime.sendMessage('content 主动发送');
});


// const port = chrome.runtime.connect({name: `plugin-demo-${new Date().getTime()}`});
// console.log('port:', port);
// port.onMessage.addListener((msg) => {
//   console.log('content 长链接收到消息：', msg);

//   port.postMessage('来自content长链接');
// });