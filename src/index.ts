import * as readline from 'readline';
import * as fs from 'fs';

export interface IReadFile {
    path: string;
    onLine?(line: string, resume: Function): void;
    onSuccess(lines?: Array<string>): void;
    onError(err: ErrorEvent): void;
}

export default class ReadFile {

    private lines: string[] = [];
    
    constructor(options: IReadFile) {

        const rl = readline.createInterface({
            input: fs.createReadStream(options.path),
            crlfDelay: Infinity
        })
        .on('line', (line: string) => {
            if(!options.onLine) {
                return this.lines.push(line);
            }

            rl.pause()
            options.onLine(line, () => {rl.resume()});
        })
        .on('close', () => {
            if(!options.onLine) {
                return options.onSuccess(this.lines);
            }
            options.onSuccess();
        })
        .on('error', (err: ErrorEvent) => {
            options.onError(err);
        });
    }
}