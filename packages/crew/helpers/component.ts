// eslint-disable-next-line import/prefer-default-export
export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function displayUrl(url, length) {
  if (url) {
    const cleanUrl = url.replace(/^(https?|http):\/\//, '');
    if (cleanUrl && cleanUrl.length > length) {
      return `${cleanUrl.substring(0, length)}...`;
    }
    return cleanUrl;
  }
  return '';
}
