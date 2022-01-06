let button = document.getElementById("button");

const bg = chrome.extension.getBackgroundPage();

// 使用长连接
const port = chrome.extension.connect({
  name: "popup",
});

button.onclick = () => {
  // 使用postMs 发送信息
  port.postMessage("给 background 传递信息~");
};

// 接收信息
port.onMessage.addListener((msg) => {
  console.log("接收的信息：", msg);
});
