chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (!request.icon) {
      return;
    }

    removeIconsFromHead();

    appendToHead(createIcon(request.icon));
  }
);

function removeIconsFromHead() {
  var tags = document.getElementsByTagName('link');
  
  for (var i = 0; i < tags.length; i++) {
    var tag = tags[i];
    var rel = tag.getAttribute('rel');

    if (rel && rel.indexOf('icon') !== -1) {
        tag.remove();
    }
  }
}

function createIcon(base64icon) {
  var icon = document.createElement('link');
  
  icon.setAttribute('rel', 'icon');
  icon.setAttribute('type', 'image/x-icon');
  icon.setAttribute('href', base64icon);

  return icon;
}

function appendToHead(el) {
  document.head.appendChild(el);
}