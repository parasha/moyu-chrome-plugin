let changeColor = document.getElementById("changeColor");

// button 的点击事件
changeColor.addEventListener("click", () => {
  console.log('change color div click');
  // 获取tabs
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    console.log('get current tab:', tabs);
    // 获取 storage 本地存储
    chrome.storage.sync.get("color", ({ color }) => {
      console.log('get storage color:', color);
      // 操作tab
      chrome.tabs.executeScript(tabs[0].id, {
        code: 'document.body.style.backgroundColor = "' + color + '";',
      });
    });
  });
});
