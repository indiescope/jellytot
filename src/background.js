const canvas = document.createElement('canvas');
const size = 32;

canvas.width = size;
canvas.height = size;

const ctx = canvas.getContext('2d');

const onUpdatedHandler = (tabId, {status}, {url}) => {
  if (status !== 'complete') {
    return;
  }

  const currentUrl = url;

  chrome.storage.sync.get('items', ({items}) => {
    if (!items) {
      return;
    }

    for (const item of items) {
      if (currentUrl.match(item.regex)) {
        ctx.fillStyle = item.colour;

        // Clear canvas
        context.clearRect(0, 0, size, size);
        
        // Draw circle
        context.beginPath();
        context.arc(16, 16, 12, 0, 2 * Math.PI);
        context.fill();
      
        const icon = canvas.toDataURL();
      
        chrome.tabs.sendMessage(tabId, { icon: icon });
      }
    }
  });
};

chrome.tabs.onUpdated.addListener(onUpdatedHandler);