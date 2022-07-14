let button = document.getElementById("button");

const sendMessage = async () => {
  const response = await chrome.runtime.sendMessage('来自popup的hello');
  console.log('收到的response:', response);
}

const getCurrentTab = async () => {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
};

sendContentMessage = async () => {
  const tab = await getCurrentTab();
  await chrome.tabs.sendMessage(tab.id, '向 content 发送消息', (response) => {
    console.log('收到来自content的response:', response);
  });
}

// 长链接的形式不好用
// let port;
// chrome.runtime.onConnect.addListener(function (port) {
//   console.log('port:', port);
//   port = port;
// });

button.onclick = function () {
  sendMessage();
  sendContentMessage();

  // if (port) {
  //   port.postMessage('popup 长链接发送');
  // }
};

