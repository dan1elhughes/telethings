const got = require("got");

let rootUrl = "";
let options = {};

module.exports.configure = (url, opts) => {
  rootUrl = url;
  options = opts;
};

module.exports.fetch = async url => got(rootUrl + url, options).json();
