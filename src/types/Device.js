module.exports = class Device {
  constructor(opts) {
    this.title = opts.title;
    this.href = opts.href;

    this.properties = [];
    for (const [key, value] of Object.entries(opts.properties)) {
      this.properties.push({ key, ...value });
    }
  }
};
