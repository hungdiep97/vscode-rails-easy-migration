import * as vscode from "vscode";
const fs = require("fs");

const TERMINAL_NAME = "Rails easy migration";
const STRING_TO_SEPERATE = "/db/migrate/";
const MIGRATE_SRIPT = "bundle exec rake db:migrate"
const WORKSPACE = vscode.workspace.rootPath

function getCurrentFile() {
	return vscode.window.activeTextEditor?.document.uri.path;
}

function getRootFolder() {
	return getCurrentFile()?.split(STRING_TO_SEPERATE)[0];
}

function getMigrationFileName() {
	return getCurrentFile()?.split(STRING_TO_SEPERATE)[1];
}

function getMigrationVersion() {
	return getMigrationFileName()?.split("_")[0];
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

	if (isMigrateFolder()) {
		vscode.commands.executeCommand("workbench.action.terminal.clear");
		easyMigrateTerminal.sendText(`cd ${getRootFolder()} && ${commandText}`);
	} else {
		vscode.window.showWarningMessage("RailsEasyMigration: Only run on migrate folder.");
	}
}

function isMigrateFolder() {
	return getCurrentFile()?.indexOf(STRING_TO_SEPERATE) !== -1;
}

function executeMigrate() {
	executeCommand(MIGRATE_SRIPT);
	vscode.window.showInformationMessage(`⌘+m ⌘+m was pressed. Running project migrations ...`);
}

function executeMigrateUp() {
	let upCommand = `${MIGRATE_SRIPT}:up VERSION=${getMigrationVersion()}`;
	executeCommand(upCommand);
	vscode.window.showInformationMessage(`⌘+m ⌘+u was pressed. Executing ${upCommand} ...`);
}

function executeMigrateDown() {
	let downCommand = `${MIGRATE_SRIPT}:down VERSION=${getMigrationVersion()}`;
	executeCommand(downCommand);
	vscode.window.showInformationMessage(`⌘+m ⌘+d was pressed. Executing ${downCommand} ...`);
}

function executeMigrateRerun() {
	let reRunCommand = `${MIGRATE_SRIPT}:redo VERSION=${getMigrationVersion()}`;
	executeCommand(reRunCommand);
	vscode.window.showInformationMessage(`⌘+m ⌘+r was pressed. Re-running version ${getMigrationVersion()} ...`);
}

function openLastestMigrationFile() {
	fs.readdir(`${WORKSPACE}${STRING_TO_SEPERATE}`, (errors: any, files: string | any[]) => {
    if (errors) {
      vscode.window.showErrorMessage("Can not read migration files");
      return;
    }
    if (files.length && files[files.length - 1]) {
      const lastFile = files[files.length - 1];
      const path = vscode.Uri.file(`${WORKSPACE}${STRING_TO_SEPERATE}${lastFile}`);
      vscode.workspace.openTextDocument(path).then((document) => {
        vscode.window.showTextDocument(document);
      });
    }
  });
}

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(
		vscode.commands.registerCommand("extension.migrate", () => {
			executeMigrate();
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand("extension.migrateUp", () => {
			executeMigrateUp();
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand("extension.migrateDown", () => {
			executeMigrateDown();
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand("extension.migrateRerun", () => {
			executeMigrateRerun();
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand("extension.openLatestFile", () => {
			openLastestMigrationFile();
		})
	);

}

// this method is called when your extension is deactivated
export function deactivate() {}
