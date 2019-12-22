const { Command, flags } = require("@oclif/command");
const pkg = require("../package.json");
const got = require("got");
const Device = require("./types/Device");

class TelethingsCommand extends Command {
  async run() {
    const { flags } = this.parse(TelethingsCommand);
    const { token, url } = flags;

    const options = {
      responseType: "json",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "user-agent": `${pkg.name}/${pkg.version} (${pkg.homepage})`
      }
    };

    const devices = await got(`${url}/things`, options).json();

    devices.forEach(data => {
      console.log(new Device(data));
    });
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
