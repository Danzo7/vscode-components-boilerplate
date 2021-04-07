import  {workspace,window,ExtensionContext,commands} from 'vscode';
import buildTemplate,{getBoilerPlatesFromConfig} from './utils';
import * as path from 'path';
import { ShowMultiple } from './multiStepItem';
import { READ_FAIL,CANCELLED } from './errors';



async function excute({ fsPath }: { fsPath: string; }) {
	if (!workspace.workspaceFolders || workspace.workspaceFolders.length < 1) {
		window.showErrorMessage("please open a workspace first");
return null;
	}

	try {
		let {inputs,boilerplates}=getBoilerPlatesFromConfig(workspace.workspaceFolders[0].uri.path, "components-boilerplate.js");
		let multiple = new ShowMultiple(inputs,["Choose a template : ",`Component will be created at ${fsPath}`]);	
		await multiple.show();
		const boilerPlateType=multiple.results.shift();
		const template = boilerplates.find((item: { name: string; }) => item.name === boilerPlateType).template;
		const variant = multiple.results.reduce((value,obj)=>Object.assign(obj,value),{});
		const componentName: string = Object.values(multiple.results[0])[0] as string;

		const componentFolder = path.join(fsPath, componentName);
		buildTemplate(variant, componentFolder, template);
		window.showInformationMessage("Boilerplate component successfully generated");
	}
	catch (e) {
		switch (e.message){
			case CANCELLED:
				window.showInformationMessage("cancelled.");
				break;
			case READ_FAIL:
				window.showErrorMessage("No configuration file found please read the Docs.");
				break;
			default:
				window.showErrorMessage(e.toString());
}
		}

}
export function activate(context: ExtensionContext) {
	context.subscriptions.push(commands.registerCommand('extension.generate-boilerplate', (x) => { excute(x);}));
}

export function deactivate() { }