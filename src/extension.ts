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

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('react-component-template.create-react-component', (e) => {
		if(!e){
			vscode.window.showInformationMessage("Just right click on Explorer and Create react Component!");
			return;
		}
		const componentNameOptions: vscode.InputBoxOptions = {
			prompt: `Component will be created at ${e.fsPath}`,
			placeHolder: "Enter Component Name",
			validateInput: validate,
			ignoreFocusOut: true
		};
		vscode.window.showInputBox(componentNameOptions).then(componentName => {
			if (componentName === undefined) { throw new Error("no name");};
			const componentFolder = path.join(e.fsPath, componentName);
			try {
				buildReactTemplate({scss:true,typescript:true,storybook:false}, componentName, componentFolder);
			}
			catch (e){vscode.window.showErrorMessage(e);}
			
		});

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}


