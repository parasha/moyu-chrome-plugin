console.log("background script run");

function getViews() {
  // 获取所有 tab
  const pops =
    chrome.extension.getViews({
      type: "popup",
    }) || [];

  console.log(pops);
}

chrome.extension.onConnect.addListener((port)=>{
  if(port.name === 'popup'){
    port.onMessage.addListener((msg)=>{
      console.log('收到 popup 传来的msg');
      port.postMessage('给 popup 传递信息~')
    })
  }
})