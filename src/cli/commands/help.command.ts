import { Command } from './command.interface.js';
import chalk from 'chalk';

const main = chalk.bold.red;
const examples = chalk.bold.blue;
const example1 = chalk.bold.green;
const commands = chalk.bold.cyan;
const versionAll = chalk.bold.yellow;


export class HelpCommand implements Command {
  public getName(): string{
    return '--help';
  }


  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
            ${main('Программа для подготовки данных для REST API сервера.')}
            ${examples('Пример:')}
                ${example1('cli.js --<command>-- [--arguments]')}
            ${commands('Команды:')}
                ${versionAll('--version:                      # выводит номер версии')}
                ${versionAll('--help:                         # печатает этот текст')}
                ${versionAll('--import <path>:                # импортирует данные из TSV')} 
                ${versionAll('--generate <n> <path> <url>     # генерирует произвольное количество тестовых данных')}
                `);
  }
}

