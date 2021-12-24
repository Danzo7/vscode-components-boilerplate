import { CANCELLED } from './errors';
import {  window} from 'vscode';

interface Inputs {
  placeholder: string,
  items: string[],
  onDidSelectItem?: (item: any) => any
  description?:string
}
function validate(componentName: string): string | null {  
	if (!componentName || componentName === "") {
	  	return "component name can not be empty";
	}

	if (!componentName.match(/^[0-9a-zA-Z ]+$/)) {
		return "component can't have non-alphanumeric character";
	}
	return null;
}

async function showQuickPick({ placeholder, items, onDidSelectItem,description}:Inputs) {
  return  window.showQuickPick(items.map(label => ({ label,description })), {
    placeHolder: placeholder,
    onDidSelectItem:onDidSelectItem
  });
}
async function showInputBox({placeholder,prompt}) {
	return window.showInputBox({
    placeHolder: placeholder,
    prompt,
		validateInput: validate
	});
}

export class ShowMultiple{
  value: {}[];
  details: string[];
  results: any[]=[];
  constructor(value:any, details:string[]) {
    this.details = details;
    this.value = value;
  }
  async show() {
    await this.walk(this.value);
}
 //TODO:Need to reduce its Cognitive Complexity from 35 to <=15.
  private async walk(value:any){
    let i = 0;
    if (typeof value === "string") {
      let result;
      while (result === undefined) {
         if (i > 0) { throw new Error(CANCELLED); }
            i++;
        result = await showInputBox({ placeholder: "Enter a value for " + value,prompt:this.results[0]+": "+(this.details[this.results.length]||this.details[this.details.length-1]) });}
      this.results.push({[value]:result});
        return result;
     
    }
    
    else {                

      if (Array.isArray(value[0])) {
        if (value[0].length > 1) {
          return  this.walk(value[0]);
        }
        else {
          for (let item of value) {
           await this.walk(item[0]);
          }
          
        }
        }
      else
        if (typeof value[0] === "object") {
          let keys = value.map(v => Object.values(v)[0] as string | {} | []);
          let result;
          if (value.length <= 1) {
            result = keys[0];
            this.results.push(result);
          }
          else{
            result = await this.walk(keys);
          }
          //remove first one
          let { [Object.keys(value[keys.indexOf(result)])[0]]: _,...newV } = value[keys.indexOf(result)];
          for (let item of Object.values(newV)) {
            console.log(item);
            await this.walk(item);     
}        
        }
        else if (typeof value[0] === "string") {
          let result: any;
          
          while (result === undefined) {
            if (i > 0) { throw new Error(CANCELLED); }
            i++;
            result = await showQuickPick({placeholder:(this.details[this.results.length]||this.details[this.details.length-1]), items: value, });
          }
           this.results.push(result?.label);
           return value[value.indexOf(result?.label)];
        }
    }
  }
  
}