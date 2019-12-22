// Input: [{a:1}, {b:2}]
// Output: {a:1, b:2}
module.exports = objects =>
  objects.reduce((accumulator, obj) => Object.assign(accumulator, obj), {});
