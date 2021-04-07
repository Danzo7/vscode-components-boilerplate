import * as fs from 'fs';
import * as path from 'path';
import * as mustache from 'mustache';
import * as vm from 'vm';
import { READ_FAIL } from './errors';
export function getBoilerPlatesFromConfig(workspace: string, configfile: string) {
    const boilerplateFile = path.join(workspace, configfile);
    let boilerplates:any;
    try {
         boilerplates = vm.runInThisContext(fs.readFileSync(boilerplateFile, 'utf8'));
    }
    catch (err){
        try {
            console.warn("tying windows fix");
            boilerplates = vm.runInThisContext(fs.readFileSync(boilerplateFile.replace("\\", ""), 'utf8'));
        }
        catch (err) {
            console.error(err);
            throw new Error(READ_FAIL);
        }
    }
    let inputs :any= [];
    for (let boilerplate of boilerplates) {
        let { template, ...input } = boilerplate;
        input.variant = input.variant.map(item => [item]);   
        inputs.push(input);
    }
  
    return {inputs,boilerplates};

}
const buildTemplate = (variant: {[x: string]:string}[], wPath: string, config) => {
    let plates: [string, string][];
        plates = JSON.parse(mustache.render(JSON.stringify(config),variant));
    //create wrapper directory
    //TODO:ADD optional wrapper directory
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