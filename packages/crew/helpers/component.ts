// eslint-disable-next-line import/prefer-default-export
export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function displayUrl(url) {
  if (url) {
    const cleanUrl = url.replace(/^(https?|http):\/\//, '');
    if (cleanUrl && cleanUrl.length > 32) {
      return `${cleanUrl.substring(0, 32)}...`;
    }
    return cleanUrl;
  }
  return '';
}
