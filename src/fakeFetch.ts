const nativeFetch = window.fetch;

const url = 'https://httpbin.org/';
function fakeFetch(_: any, options: RequestInit | undefined) {
  return nativeFetch(url, options);
}

export default fakeFetch;
