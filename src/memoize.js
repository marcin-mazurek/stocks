module.exports = function memoize(fn) {
  let cache = {};

  return (...args) => {
    const key = JSON.stringify(args);

    if (cache[key] === undefined) {
      cache[key] = fn(...args);
    }

    return cache[key];
  };
}
