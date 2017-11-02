chrome.runtime.onMessage.addListener(
  ({icon}, sender, sendResponse) => {
    if (!icon) {
      return;
    }

    removeIconsFromHead();

    appendToHead(createIcon(icon));
  }
);

function removeIconsFromHead() {
  const tags = document.getElementsByTagName('link');

  for (const tag of tags) {
    const rel = tag.getAttribute('rel');

    if (rel && rel.indexOf('icon') !== -1) {
        tag.remove();
    }
  }
}

function createIcon(base64icon) {
  const icon = document.createElement('link');
  
  icon.setAttribute('rel', 'icon');
  icon.setAttribute('type', 'image/x-icon');
  icon.setAttribute('href', base64icon);

  return icon;
}

function appendToHead(el) {
  document.head.appendChild(el);
}