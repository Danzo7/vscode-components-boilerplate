import  {workspace,window,ExtensionContext,commands,InputBoxOptions} from 'vscode';
import buildTemplate,{getBoilerPlatesFromConfig,generatePlateFromBuildIn} from './utils';
import * as path from 'path';
import { ShowMultiple } from './multiStepItem';



async function excute({ fsPath }: { fsPath: string; }) {
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
		
		const defaultConfig={
			"framework":workspace.getConfiguration().get("componentBoiler.component.framework"),
			"typescript":workspace.getConfiguration().get("componentBoiler.component.Typescript"),
			"styling":workspace.getConfiguration().get("componentBoiler.component.Styling"),
			"storybook":workspace.getConfiguration().get("componentBoiler.component.StoryBook")
		};
	//	buildTemplate({componentName:}, componentFolder,defaultConfig);
}

}
export function activate(context: ExtensionContext) {
	context.subscriptions.push(commands.registerCommand('extension.generate-boilerplate', (x) => { excute(x);}));
}

export function deactivate() { }