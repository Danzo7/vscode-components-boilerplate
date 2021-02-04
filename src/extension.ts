import  {workspace,window,ExtensionContext,commands,InputBoxOptions} from 'vscode';
import buildTemplate from './utils';
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
		window.showInformationMessage("Just right click on Explorer and Create react Component!");
		return;
	}
	const componentNameOptions: InputBoxOptions = {
		prompt: `Component will be created at ${fsPath}`,
		placeHolder: "Enter Component Name",
		validateInput: validate,
		ignoreFocusOut: true
	};
	


	window.showInputBox(componentNameOptions).then(componentName => {
		if (typeof componentName === "string") {
			const componentFolder = path.join(fsPath, componentName);
			try {
				if (!workspace.workspaceFolders || workspace.workspaceFolders.length < 1) {
								window.showErrorMessage("please open a workspace first");
					return null;
			}
			const config={
				"framework":workspace.getConfiguration().get("componentBoiler.component.framework"),
				"typescript":workspace.getConfiguration().get("componentBoiler.component.Typescript"),
				"styling":workspace.getConfiguration().get("componentBoiler.component.Styling"),
				"storybook":workspace.getConfiguration().get("componentBoiler.component.StoryBook")
			};
			console.log("config: "+config);
				buildTemplate([componentName], componentFolder,workspace.workspaceFolders[0].uri.path,config);
				window.showInformationMessage(componentName+" component has been created under "+componentFolder);

			}
			catch (e) { window.showErrorMessage("something happened "+e); }

		}
		else {
			window.showErrorMessage("something went wrong");
		}
	});

};

export function activate(context: ExtensionContext) {
	context.subscriptions.push(commands.registerCommand('extension.boil-a-component',excute));
}

// this method is called when your extension is deactivated
export function deactivate() {}


