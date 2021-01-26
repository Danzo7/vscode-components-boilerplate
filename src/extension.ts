import * as vscode from 'vscode';
import { buildReactTemplate } from './utils';
import * as path from 'path';

function validate(componentName: string): string | null {  
	if (!componentName || componentName === "") {
	  	return "component name can not be empty";
	}
	if (!componentName.match(/^[A-Z]/)) {
		return "component name has to start with a uppercase alphabet";
	}
	if (!componentName.match(/^[0-9a-zA-Z]+$/)) {
		return "component can't have non-alphanumeric character";
	}
	return null;
}
const excute = ({fsPath}: { fsPath: string; }) => {
	if (!fsPath) {
		vscode.window.showInformationMessage("Just right click on Explorer and Create react Component!");
		return;
	}
	const componentNameOptions: vscode.InputBoxOptions = {
		prompt: `Component will be created at ${fsPath}`,
		placeHolder: "Enter Component Name",
		validateInput: validate,
		ignoreFocusOut: true
	};
	vscode.window.showInputBox(componentNameOptions).then(componentName => {
		if (typeof componentName === "string") {
			const componentFolder = path.join(fsPath, componentName);
			try {
				buildReactTemplate({ scss: true, typescript: true, storybook: false }, componentName, componentFolder);
			}
			catch (e) { vscode.window.showErrorMessage(e); }
		
		}
	});

};

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('extension.create-react-component',excute));
}

// this method is called when your extension is deactivated
export function deactivate() {}


