let button = document.getElementById("button");

// 根据id创建长链接
function createConnectChannel (tabId) {
  if(!tabId){
    return;
  }
  // 创建链接
  var port = chrome.tabs.connect(tabId, { name: 'test-connect' });
  console.log('创建链接:', port);
  // 发送消息
  port.postMessage({ question: '你是谁啊？' });
  console.log('发送消息');
  // 监听消息
  port.onMessage.addListener(function (msg) {
    console.log('收到消息:', msg);
    // port.disconnect();
  });
};


// 获取当前选项卡ID
function getCurrentTabId(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log('获取tab:', tabs);
    if (callback) callback(tabs.length ? tabs[0].id : null);
  });
}



button.onclick = function () {
  getCurrentTabId(createConnectChannel)
};