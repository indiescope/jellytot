var canvas = document.createElement('canvas');
canvas.width = 32;
canvas.height = 32;

var ctx = canvas.getContext('2d');

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status !== 'complete') {
    return;
  }

  var currentUrl = tab.url;

  chrome.storage.sync.get('items', function(data) {
    for (var i = 0; i < data.items.length; i++) {
      var item = data.items[i];

      if (currentUrl.match(item.regex)) {
        ctx.fillStyle = item.colour;

        clearCanvas();
        drawCircle();
      
        var icon = canvas.toDataURL();
      
        chrome.tabs.sendMessage(tabId, { icon: icon });
      }
    }
  });
});

function clearCanvas() {
  ctx.clearRect(0, 0, 32, 32);
}

function drawCircle() {
  ctx.beginPath();
  ctx.arc(16, 16, 12, 0, 2 * Math.PI);
  ctx.fill();
}