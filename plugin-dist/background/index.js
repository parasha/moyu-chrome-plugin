chrome.runtime.onInstalled.addListener(function () {
  // chrome 的 本地存储
  chrome.storage.sync.set({ color: "#3aa757" }, function () {
    console.log("The color is green.");
  });
  
});
