// chrome.runtime.onConnectExternal.addListener(function(port) {
//     port.onMessage.addListener(function(msg) {
//       // See other examples for sample onMessage handlers.
//       console.log('background receive message:', msg);
//     });
//   });
console.log('background run');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	console.log('收到消息：', request);
	sendResponse({data: 'from background'});
});
