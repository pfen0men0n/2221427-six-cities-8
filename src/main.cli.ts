#!c:\Program Files\nodejs

import { CLIApplication, HelpCommand, VersionCommand, ImportCommand} from './cli/index.js';

function bootstrap () {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
  ]);

  cliApplication.processCommand(process.argv);
}
bootstrap();
