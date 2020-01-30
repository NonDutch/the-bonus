const isBrowser = process.browser;

function save(key, value) {
  if (isBrowser) {
    localStorage.setItem(key, value);
  }
}

function remove(key) {
  if (isBrowser) {
    if (Array.isArray(key)) {
      key.map(item => localStorage.removeItem(item));
    } else {
      localStorage.removeItem(key);
    }
  }
}

function retrieve(key) {
  if (isBrowser) {
    const item = localStorage.getItem(key);
    return key === "token" ? JSON.parse(item) : item;
  }

  return "";
}

function clear() {
  if (isBrowser) {
    localStorage.clear();
  }
}

export { save, retrieve, remove, clear };
