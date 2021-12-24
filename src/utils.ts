import * as fs from 'fs';
import * as path from 'path';
import * as vm from 'vm';
import * as cap from "@shipengine/capitalization";

import { NO_CONFIG, READ_FAIL } from './errors';
import BoilerplateConfig, { InputsConfig } from './d';
type Variant={[x: string]:string}[];
export function getBoilerPlatesFromConfig(workspace: string, configfile: string) {
    const boilerplateFile = path.join(workspace, configfile);
    let boilerplates:BoilerplateConfig[];
    try {
         boilerplates = vm.runInThisContext(fs.readFileSync(boilerplateFile, 'utf8'));
    }
    catch (err:any){
        try {
            if (err.message.includes("ENOENT")) {
                boilerplates = vm.runInThisContext(fs.readFileSync(boilerplateFile.replace("\\", ""), 'utf8')); }
            else { throw new Error(err);}
        }
        catch (err2:any) {
            if (err2.message.includes("ENOENT")) {throw new Error(READ_FAIL);}
            else { throw new Error(NO_CONFIG); }
        }
    }
    if (!Array.isArray(boilerplates)) {throw new Error(NO_CONFIG);}

    let inputs: InputsConfig[] = [];
    for (let boilerplate of boilerplates) {
        if (boilerplates === undefined||!configTypeGuard(boilerplate)) {
            throw new Error(NO_CONFIG);
               }
        let {name,variants} = boilerplate;
        let fixedVariants = variants.map(item => [item]);
        inputs.push({name,"variants":fixedVariants});
    }
  
    return {inputs,boilerplates};

}
const configTypeGuard = (value: BoilerplateConfig) => {
    return (value?.variants && value?.name && value.template) ? true : false;
};
const buildTemplate = (variant: Variant, wPath: string, config) => {
    let plates: [string, string][];
    plates = JSON.parse(render(JSON.stringify(config), variant));
    fs.mkdirSync(wPath, { recursive: true });
    
        plates.forEach(([tPath, content]) => {
         if (path.dirname(tPath) !== ".") {
             fs.mkdirSync(path.join(wPath, path.dirname(tPath)), { recursive: true });
         }
        fs.writeFileSync(
            path.join(
                wPath,tPath),
            content,{flag:"ax"}
        );
        });
};

function render(template: string, variants: any) {
    return template.replace(
      /{{([^{} ]+)}([a-zA-Z0-9]+)?}/g,
      function (match: string, p1: string, p2: string) {
        console.log(match);
        console.log(p1);
        console.log(p2);
        console.log(variants);
        let r: string;
        switch (p2) {
          case "sc":
            r = cap.snakeCase(variants[p1]);
            break;
          case "kc":
            r = cap.kebabCase(variants[p1]);
            break;
          case "cc":
            r = cap.camelCase(variants[p1]);
            break;
          case "pc":
            r = cap.pascalCase(variants[p1]);
            break;
          default:
            if (p2 !== undefined) {
              throw Error(
                `Found "${p2}" in "${match}" that stands for nothing,please follow docs:\ncc : CamelCase.\nsc : snake_case.\nsc : pascalCase.\nkc : kebab-case.`
              );
            }
            r = variants[p1];
  
            break;
        }
  
        return typeof r === "string" || typeof r === "number" ? r : match;
      }
    );
  }
  

export default  buildTemplate;