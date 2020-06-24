import * as vscode from 'vscode';

let TERMINAL_NAME = "Rails easy migration";

function getCurrentFile() {
	return vscode.window.activeTextEditor?.document.uri.path;
}

function getTerminal() {
	let terminal = vscode.window.terminals.find(terminal => terminal.name == TERMINAL_NAME);
	if (!terminal) {
		terminal = vscode.window.createTerminal(TERMINAL_NAME);
	}
	terminal.show();

	return terminal;
}

function executeCommand(commandText: string) {
	let easyMigrateTerminal = getTerminal();
	easyMigrateTerminal.sendText(commandText);
}

export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(
		vscode.commands.registerCommand('extension.helloWorld', () => {
			executeCommand('ls');
			vscode.window.showInformationMessage('Hello from SoHung!');
		})
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}
