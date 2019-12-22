const { Command, flags } = require("@oclif/command");

class TelethingsCommand extends Command {
  async run() {
    const { flags } = this.parse(TelethingsCommand);
    const name = flags.name || "world";
    this.log(`hello ${name} from ./src/index.js`);
  }
}

TelethingsCommand.flags = {
  version: flags.version({ char: "v" }),
  help: flags.help({ char: "h" }),
  name: flags.string({ char: "n", description: "name to print" })
};

module.exports = TelethingsCommand;
