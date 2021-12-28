let changeColor = document.getElementById("changeColor");

// button 的点击事件
changeColor.addEventListener("click", () => {
  // 获取tabs
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // 获取 storage 本地存储
    chrome.storage.sync.get("color", ({ color }) => {
      // 操作tab
      chrome.tabs.executeScript(tabs[0].id, {
        code: 'document.body.style.backgroundColor = "' + color + '";',
      });
    });
  });
});
