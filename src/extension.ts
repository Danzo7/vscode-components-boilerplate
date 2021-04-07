import  {workspace,window,ExtensionContext,commands,InputBoxOptions} from 'vscode';
import buildTemplate,{getBoilerPlatesFromConfig} from './utils';
import * as path from 'path';
import { ShowMultiple } from './multiStepItem';

 
function validate(componentName: string): string | null {  
	if (!componentName || componentName === "") {
	  	return "component name can not be empty";
	}

	if (!componentName.match(/^[0-9a-zA-Z]+$/)) {
		return "component can't have non-alphanumeric character";
	}
	return null;
}
async function test({ fsPath }: { fsPath: string; }, context: ExtensionContext) {
	if (!workspace.workspaceFolders || workspace.workspaceFolders.length < 1) {
		window.showErrorMessage("please open a workspace first");
return null;
	}
	let {inputs,boilerplates}=getBoilerPlatesFromConfig(workspace.workspaceFolders[0].uri.path, "components-boilerplate.js");
	let multiple = new ShowMultiple(inputs,["Choose a template : ",`Component will be created at ${fsPath}`]);
	try {
		await multiple.show();
		const boilerPlateType=multiple.results.shift();
		const template = boilerplates.find(item => item.name === boilerPlateType).template;
		const variant = multiple.results.reduce((value,obj)=>Object.assign(obj,value),{});
		const componentName: string = Object.values(multiple.results[0])[0] as string;


		

		const componentFolder = path.join(fsPath, componentName);
		buildTemplate(variant, componentFolder, template);
		window.showInformationMessage("component has been created");
	}
	catch (e) {
	window.showErrorMessage(e.toString());
}

}
async function  excute({ fsPath }: { fsPath: string; }, context: ExtensionContext) {
	if (!fsPath) {
		window.showInformationMessage("Just right click on Explorer and Create react Component!");
	}

	const componentNameOptions: InputBoxOptions = {
		prompt: `Component will be created at ${fsPath}`,
		placeHolder: "Enter Component Name",
		validateInput: validate,
		ignoreFocusOut: true
	};
	 async function showQuickPick() {
		let i = 0;
		const result = await window.showQuickPick(['eins', 'zwei', 'drei'], {
			placeHolder: 'eins, zwei or drei',
			onDidSelectItem: item => window.showInformationMessage(`Focus ${++i}: ${item}`)
		});
		 window.showInformationMessage(`Got: ${result}`);
	
	}
	await showQuickPick();
	
	window.showInputBox(componentNameOptions).then(componentName => {
		if (typeof componentName === "string") {
			const componentFolder = path.join(fsPath, componentName);
			try {
				if (!workspace.workspaceFolders || workspace.workspaceFolders.length < 1) {
								window.showErrorMessage("please open a workspace first");
					return null;
			}
			//remove in official release
				
			const config={
				"framework":workspace.getConfiguration().get("componentBoiler.component.framework"),
				"typescript":workspace.getConfiguration().get("componentBoiler.component.Typescript"),
				"styling":workspace.getConfiguration().get("componentBoiler.component.Styling"),
				"storybook":workspace.getConfiguration().get("componentBoiler.component.StoryBook")
			};
				console.log("config: " + config);
				
//				buildTemplate([componentName], componentFolder,workspace.workspaceFolders[0].uri.path,config,);
				window.showInformationMessage(componentName+" component has been created under "+componentFolder);

			}
			catch (e) { window.showErrorMessage("something happened "+e); }

		}
		else {
			window.showInformationMessage("Closed");
		}
	});

};

export function activate(context: ExtensionContext) {
	context.subscriptions.push(commands.registerCommand('extension.generate-boilerplate', (x) => { test(x,context);}));
}

// this method is called when your extension is deactivated
export function deactivate() {}