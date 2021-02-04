import * as fs from 'fs';
import * as path from 'path';
import * as mustache from 'mustache';
import * as vm from 'vm';

import options  from './component-boilerplate';
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
const buildTemplate = ([componentName]: string[], cPath: string, workspace: string, config={}) => {
    const boilerplateFile = path.join(workspace, "components-boilerplate.js");
    console.log(boilerplateFile);
    let plates: [string, string][];
    try {
        plates = vm.runInThisContext(mustache.render(fs.readFileSync(boilerplateFile, 'utf8'), { componentName }));
    }
    catch (e) {
        console.error("no config file found maybe :/ \n " + e);
        plates = JSON.parse(mustache.render(JSON.stringify(generatePlateFromBuildIn(config)),{ componentName }));
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