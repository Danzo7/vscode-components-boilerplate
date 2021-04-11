import  {workspace,window,ExtensionContext,commands} from 'vscode';
import buildTemplate,{getBoilerPlatesFromConfig} from './utils';
import * as path from 'path';
import { ShowMultiple } from './multiStepItem';
import { READ_FAIL,CANCELLED, NO_CONFIG } from './errors';



async function excute({ fsPath }: { fsPath: string; }) {
	const config={
		"isWrapped":workspace.getConfiguration().get("boilerplate.component.isWrapped"),
	};
	if (!workspace.workspaceFolders || workspace.workspaceFolders.length < 1) {
		window.showErrorMessage("please open a workspace first");
return null;
	}

	try {
		let { inputs, boilerplates } = getBoilerPlatesFromConfig(workspace.workspaceFolders[0].uri.path, "boilerplates.config.js");
		if (boilerplates === undefined) { throw new Error(NO_CONFIG); }
		else {
		let multiple = new ShowMultiple(inputs, ["Choose a template : ", `Component will be created at ${fsPath}`]);
		await multiple.show();
		const boilerPlateType = multiple.results.shift();
			const template = boilerplates.find((item: { name: string }) => item.name === boilerPlateType)?.template;
			const variants = multiple.results.reduce((value, obj) => Object.assign(obj, value), {});
			//first variant is the wrapper
			const wrapperName: string = config.isWrapped ? Object.values(multiple.results[0])[0] as string : "";
			const wrapperDirectory = path.join(fsPath, wrapperName);
		
			buildTemplate(variants, wrapperDirectory, template);
			window.showInformationMessage("Boilerplate component successfully generated");
		}
	}
	catch (e) {
		console.error(e);
		switch (e.message){
			case CANCELLED:
				window.showInformationMessage("cancelled.");
				break;
				case READ_FAIL:
					window.showErrorMessage("No configuration file found please read the Docs.");
				break;
				case NO_CONFIG:
				window.showErrorMessage("Config File is not valid");
				break;
			default:
				window.showErrorMessage(e.message);
}
		}

}
export function activate(context: ExtensionContext) {
	context.subscriptions.push(commands.registerCommand('extension.generate-boilerplate', (x) => { excute(x);}));
}

export function deactivate() { }