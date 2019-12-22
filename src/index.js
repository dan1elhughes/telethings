const { Command, flags } = require("@oclif/command");
const got = require("got");

const Device = require("./types/Device");
const { fetch, configure } = require("./utils/request");
const normaliseFields = require("./utils/normaliseFields");

const pkg = require("../package.json");

class TelethingsCommand extends Command {
  async run() {
    const { flags } = this.parse(TelethingsCommand);
    const { token, url } = flags;

    configure(url, {
      responseType: "json",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "user-agent": `${pkg.name}/${pkg.version} (${pkg.homepage})`
      }
    });

    const data = await fetch(`/things`);

    const devices = data.map(Device.build);

    const points = await Promise.all(
      devices.map(async device => {
        const { title } = device;
        const rawFields = await device.readProperties();
        const normalisedFields = normaliseFields(rawFields);
        return { name: title, ...normalisedFields };
      })
    );

    this.log(JSON.stringify(points));
  }
}

TelethingsCommand.flags = {
  version: flags.version({ char: "v" }),
  help: flags.help({ char: "h" }),
  token: flags.string({
    char: "t",
    required: true,
    description: "Authorization token with read access"
  }),
  url: flags.string({ char: "u", required: true, description: "Gateway URL" })
};

module.exports = TelethingsCommand;
