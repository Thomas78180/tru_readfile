# tru_readfile
A node module that reads a file line by line.
 - Start your task with a an array of all the lines
 - Run async tasks on each line then resume the job

## License
ISC

## Installation
```javascript
npm install tru_readfile --save
// or
yarn add tru_readfile
```
build source with `tsc`

## Usage

### Javascript

```js
var ReadFile = require('tru_readfile');

// get all lines
new ReadFile({
    path: 'myFile.txt',
    onSuccess: function(lines) {
        console.log(lines);
    },
    onError: function(err) {
        throw err;
    }
});

// or perform an async task on each line then resume file loading
new ReadFile({
    path: 'myFile.txt',
    onLine: function(line, resume) {

        // async task
        setTimeout(function() {
            console.log('new line: '+line);
            resume(); // do not forget to resume
        }, 1000);
    },
    onSuccess: function() {
        console.log('end of file');
    },
    onError: function(err) {
        throw err;
    }
});

```
### TypeScript

```typescript
import ReadFile from 'tru_readfile';

// get all lines
new ReadFile({
    path: 'myFile.txt',
    onSuccess: (lines: string[]) => {
        console.log(lines);
    },
    onError: (err: ErrorEvent) => {
        throw err;
    }
});

// or perform an async task on each line then resume file loading
new ReadFile({
    path: 'myFile.txt',
    onLine: (line: string, resume(): void) => {

        // async task
        setTimeout(() => {
            console.log('new line: '+line);
            resume(); // do not forget to resume
        }, 1000);
    },
    onSuccess: () => {
        console.log('end of file');
    },
    onError: (err: ErrorEvent) => {
        throw err;
    }
});

```
