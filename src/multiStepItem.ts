//new stepItems()
import {  window, Disposable, CancellationToken, QuickInputButton, QuickInput, ExtensionContext, QuickInputButtons, Uri } from 'vscode';

interface Inputs {
  placeholder: string,
  items: string[],
  onDidSelectItem?: (item: any) => any
  description?:string
}
type CallBack = ((item: any) => string)[];


function validate(componentName: string): string | null {  
	if (!componentName || componentName === "") {
	  	return "component name can not be empty";
	}

	if (!componentName.match(/^[0-9a-zA-Z]+$/)) {
		return "component can't have non-alphanumeric character";
	}
	return null;
}

async function showQuickPick({ placeholder, items, onDidSelectItem,description}:Inputs) {
  const result = await window.showQuickPick(items.map(label => ({ label,description })), {
    placeHolder: placeholder,
    onDidSelectItem:onDidSelectItem
  });
  return result;
}
async function showInputBox({placeholder,prompt}) {
	const result = await window.showInputBox({
    placeHolder: placeholder,
    prompt,
		validateInput: validate
	});
  return result;
}

export class ShowMultiple{
  shows: CallBack = [];
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
 
  private async walk(value){
    let i = 0;
    if (typeof value === "string") {
      let result;
      while (result === undefined) {
         if (i > 0) { throw new Error("Cancelled?"); }
            i++;
        result = await showInputBox({ placeholder: "Enter a value for " + value,prompt:this.results[0]+": "+this.details[this.results.length] });};
      this.results.push({[value]:result});
        return result;
     
    }
    
    else {                

      if (Array.isArray(value[0])) {
        if (value[0].length > 1) {
          return await this.walk(value[0]);
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
            if (i > 0) { throw new Error("Cancelled?"); }
            i++;
            result = await showQuickPick({placeholder:this.details[this.results.length], items: value, });
          }
           this.results.push(result?.label);
           return value[value.indexOf(result?.label)];
        }
    }
  }

  
}


/*
[{react,obj,obj2,{}},{vue,[abc,e]},{test,c}]
[..arr.first]

multi=new()
multi.add(a)
multi.add(showi,input)
*/