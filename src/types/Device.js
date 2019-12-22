const { fetch } = require("../utils/request");
const mergeObjects = require("../utils/mergeObjects");

module.exports = class Device {
  static build(...args) {
    return new Device(...args);
  }

  constructor(opts) {
    this.title = opts.title;
    this.href = opts.href;
    this.properties = opts.properties;
  }

  async readProperties() {
    return mergeObjects(
      await Promise.all(
        Object.keys(this.properties).map(key => this.readProperty(key))
      )
    );
  }

  async readProperty(key) {
    const { links, type } = this.properties[key];
    const [link] = links;
    const { href } = link;
    return fetch(href);
  }
};
