import * as vscode from 'vscode';
import * as fs from 'fs';

export function activate(context) {
	let disposable = vscode.commands.registerCommand('ts-react-component-generator.generate-ts-component', (e : any) => {
		
		if(!e){
			vscode.window.showInformationMessage("Just right click on Explorer and Create TS Component!");
			return;
		}


		let rootPath = e.fsPath;
		
		
		vscode.window.showInputBox().then(function(componentName1) {

			function replaceAll(string : string, search : string, replace :string) : string {
				return string.split(search).join(replace);
			}

			var componentName : string = "";

			if(componentName1){
				//Trim Whitespaces
				componentName = replaceAll(componentName1," ",'');}
			else{
				//Some Error Occured 
				vscode.window.showInformationMessage("[ " +componentName + " ]"+' is a wrong Component Name');
				return;
			}

			//Check Regex for accepted ComponentName
			if(/^[a-zA-Z_$][*a-zA-Z0-9_$]/.test(componentName) == false){
				vscode.window.showInformationMessage("[ " +componentName + " ]"+' is a wrong Component Name! Component starts with [a-zA-Z_$]');
				return;
			}

			//Check if folder already exists
			if (fs.existsSync(rootPath + '/' + componentName)) {				 
				vscode.window.showInformationMessage("[ " +componentName + " ]"+' folder already exists!');
				return;
			}else{	
				//Perfect! Lets create our folder
				fs.mkdirSync(rootPath + '/' + componentName);
			}
			
			var component_tsx : string = `import React, { Component } from 'react'; 
import './index.css';
export interface I-component-Props {
	//Here we pass the Props Interface
}
export interface I-component-State {
	//here we pass the State Interface
}
//class ComponentName Component<PropsInterface, StateInterface>
class -component- extends Component<I-component-Props, I-component-State> {
	
	//Component State
	state = {
	}
	//Add style here
	style = {
	};
	// Before the component mounts, we initialise our state
	componentWillMount() {
	 }
	// After the component did mount, we set the state.
	componentDidMount() {
	}
	render() {
		return (
			<div className="-component-" style={this.style}>
			</div>
		);
	}
}
export default -component-;`;
			
			var component_css : string = `.-component- {\r\n\r\n}`;
			
			//Replace ComponentName
			component_tsx = replaceAll(component_tsx,"-component-",componentName);//replace -component- with given componentName
			component_css = replaceAll(component_css,"-component-",componentName);//replace -component- with given componentName
			
			//Create Component Files Inside our folder
			fs.writeFileSync(rootPath + '/' + componentName + '/' + 'index.tsx', component_tsx);
			fs.writeFileSync(rootPath + '/' + componentName + '/' + 'index.css', component_css);

			//Success! Show our Success message.
			vscode.window.showInformationMessage("[ " +componentName + " ]"+' ts component created successfully.');
		});
	});
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
	vscode.window.showInformationMessage("[TS React Component Generator]:"+' Thank you for using this component. Cya later aligator!');
}