#!/usr/bin/env node

import { CommandManager } from "./engine";
import { trace, printHelp, debug, ExecutionConfig, setTraceLevel, TraceLevel } from "./common";
import { BaseCommand } from "./engine";


// print copyright ?
trace("\nWelcome to 8base command line interface");

let command: BaseCommand;

try {
    let config = new ExecutionConfig(process.argv.slice(2));

    if (config.getParameter('d')) {
        setTraceLevel(TraceLevel.Debug);
    } else {
        setTraceLevel(TraceLevel.Trace);
    }

    command = CommandManager.initialize(config);
}
catch(err) {
    trace("Error = " + err.message);
    printHelp();
    process.exit(0);
}

CommandManager.run(command)
    .then(() => {
        trace("\n" + command.onSuccess());
    })
    .catch(err => { trace("\nError = " + err.message); });