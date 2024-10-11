novel_mode = false;

chrome.action.onClicked.addListener((tab) => {
    if (novel_mode){
        chrome.tabs.sendMessage(tab.id, { action: 'hide' }, (response) => {
            setTimeout(() => {
                chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
                    chrome.tabs.sendMessage(tab.id, { action: "pic", dataUrl: dataUrl });
                });
            }, 500);
        });
    }else{
        chrome.tabs.create({ url: "https://github.com/Flareonz44/booklive-jp-manga-dumper?tab=readme-ov-file#booklivejp-manga-dumper" }, null);
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'novel_mode') {
        novel_mode = true;
    }
});
  