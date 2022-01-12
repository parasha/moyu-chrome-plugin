console.log("background script run");

function getViews() {
  // 获取所有 tab
  const pops =
    chrome.extension.getViews({
      type: "popup",
    }) || [];

  console.log(pops);
}

chrome.extension.onConnect.addListener((port) => {
  if (port.name === "popup") {
    port.onMessage.addListener((msg) => {
      console.log("收到 popup 传来的msg");
      port.postMessage("给 popup 传递信息~");
    });
  }
});

chrome.tabs.query(
  {
    active: true,
    currentWindow: true,
  },
  (tabs) => {
    let message = {
      info: "来自background: 💌",
    };
    console.log(tabs);
    // chrome.tabs.sendMessage(tabs[0].id, message, (res) => {
    //   console.log("popup=>content");
    //   console.log(res);
    // });
  }
);

// run!
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  sendResponse("我收到了你的来信");
  console.log("接收了来自 content.js的消息", req.info);
});
