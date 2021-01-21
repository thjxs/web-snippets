import * as mersenne from '../vendor/mersenne';

function number(options) {
  if (typeof options === 'number') {
    options = {
      max: options,
    };
  }

  options = options || {};
  if (typeof options.min === 'undefined') {
    options.min = 0;
  }

  if (typeof options.max === 'undefined') {
    options.max = 99999;
  }

  if (typeof options.precision === 'undefined') {
    options.precision = 1;
  }

  let max = options.max;
  if (max >= 0) {
    max += options.precision;
  }

  let randomNumber = Math.floor(
    mersenne.rand(max / options.precision, options.min / options.precision)
  );
  randomNumber = randomNumber / (1 / options.precision);

  return randomNumber;
}

window.randomNumber = number;
