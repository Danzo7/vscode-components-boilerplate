import * as fs from 'fs';
import * as path from 'path';
import * as mustache from 'mustache';
import * as vm from 'vm';
import options from './component-boilerplate';
export function getBoilerPlatesFromConfig(workspace: string, configfile: string) {
    const boilerplateFile = path.join(workspace, configfile);
    let boilerplates;
    try {
         boilerplates = vm.runInThisContext(fs.readFileSync(boilerplateFile, 'utf8'));
    }
    catch (err){
        try {
            boilerplates = vm.runInThisContext(fs.readFileSync(boilerplateFile.replace("\\", ""), 'utf8'));
        }
        catch (err) {
            console.error("no config file found maybe :/  " + err);
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
const generatePlateFromBuildIn = ({ framework = "reactJs", typescript = false, styling = "css", storybook = false }) => {
    
    let result: [string, string][] = [];
    if (typescript&&options.framework[framework].typescript) { 
        options.framework[framework].typescript.forEach(e => result.push(e));
    }
    else {
        result.push(options.framework[framework].javascript);
    }
    if (storybook&&options.framework[framework].storybook) {
        result.push(options.framework[framework].storybook);
    };
    result.push(options.styling[styling]);
    return result;
};
const buildTemplate = (variant: {[x: string]:string}[], cPath: string, config) => {
    let plates: [string, string][];
    try {
        plates = JSON.parse(mustache.render(JSON.stringify(config),variant));
    }
    catch (e) {
        plates = JSON.parse(mustache.render(JSON.stringify(generatePlateFromBuildIn(config)),variant));
    }
    //create component directory
    fs.mkdirSync(cPath, { recursive: true });
    
        plates.forEach(([tPath, content]) => {
         if (path.dirname(tPath) !== ".") {
             fs.mkdirSync(path.join(cPath, path.dirname(tPath)), { recursive: true });
         };
        fs.writeFileSync(
            path.join(
                cPath,tPath),
            content
        );
        });
    return;
};
export default  buildTemplate;