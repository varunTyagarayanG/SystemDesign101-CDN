const fs = require('fs');
const path = require('path');

class Logger {
    static logFilePath = path.join(__dirname, 'logs.txt');

    static logEvent(event) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ${event}`;
        console.log(logMessage);

        // Append the log to a file
        fs.appendFileSync(Logger.logFilePath, `${logMessage}\n`, 'utf8');
    }
}

module.exports = Logger;
