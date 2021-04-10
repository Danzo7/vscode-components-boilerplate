import * as fs from 'fs';
import * as path from 'path';
import * as mustache from 'mustache';
import * as vm from 'vm';
import { NO_CONFIG, READ_FAIL } from './errors';
import BoilerplateConfig, { InputsConfig } from './d';

export function getBoilerPlatesFromConfig(workspace: string, configfile: string) {
    const boilerplateFile = path.join(workspace, configfile);
    let boilerplates:BoilerplateConfig[];
    try {
         boilerplates = vm.runInThisContext(fs.readFileSync(boilerplateFile, 'utf8'));
    }
    catch (err){
        try {
            console.warn("tying windows fix");
            boilerplates = vm.runInThisContext(fs.readFileSync(boilerplateFile.replace("\\", ""), 'utf8'));
           
        }
        catch (err) {
            if (err.message.includes("ENOENT")) {throw new Error(READ_FAIL);}
            else { throw new Error(NO_CONFIG); }
        }
    }
     
    let inputs: InputsConfig[] = [];
    for (let boilerplate of boilerplates) {
        if (boilerplates === undefined||!configTypeGuard(boilerplate)) {
            throw new Error(NO_CONFIG);
               }
        let {name,variants} = boilerplate;
        let fixedVariants = variants.map(item => [item]);
        inputs.push({"variants":fixedVariants,name});
    }
  
    return {inputs,boilerplates};

}
const configTypeGuard = (value: BoilerplateConfig) => {
    return (value?.variants && value?.name && value.template) ? true : false;
};
const buildTemplate = (variant: {[x: string]:string}[], wPath: string, config) => {
    let plates: [string, string][];
    plates = JSON.parse(mustache.render(JSON.stringify(config), variant));
    fs.mkdirSync(wPath, { recursive: true });
    
        plates.forEach(([tPath, content]) => {
         if (path.dirname(tPath) !== ".") {
             fs.mkdirSync(path.join(wPath, path.dirname(tPath)), { recursive: true });
         };
        fs.writeFileSync(
            path.join(
                wPath,tPath),
            content
        );
        });
    return;
};
export default  buildTemplate;