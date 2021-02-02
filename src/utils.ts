import * as fs from 'fs';
import * as path from 'path';
import * as mustache from 'mustache';
import buildInBoiler from './component-boilerplate.js';
/*
 const buildReactTemplate = ({ scss, typescript, storybook }: { scss: Boolean, typescript: boolean, storybook: boolean }, componentName: string, cPath: string) => {
    
    let stylingExtension = scss ? ".scss" : ".css";
    let indexExtension = typescript ? ".ts" : ".js";
    let componentExtension = `${indexExtension}x`;

    const options = {
        styleDir: `style`,
        styling: `style/index${stylingExtension}`,
        component: `${componentName}${componentExtension}`,
        componentIndex: `index${indexExtension}`,
        storybook: `${componentName}.stories${componentExtension}`
    };

    const COMPONENT_TEMPLATE = indexExtension === ".ts" ? buildInTemplate.typescript : buildInTemplate.javascript;
    fs.mkdirSync(path.join(
        cPath,
        options.styleDir
    ));
    // Writing main component file
    fs.writeFileSync(
        path.join(
            cPath,
            options.component
        ),
        mustache.render(COMPONENT_TEMPLATE, { componentName })
    );

    // Writing component index file
    fs.writeFileSync(
        path.join(
            cPath,
            options.componentIndex
        ),
        mustache.render(buildInTemplate.index, { componentName })
    );
    
   

    // Writing component styling file
    fs.writeFileSync(
        path.join(
            cPath,
            options.styling
        ),
        mustache.render(buildInTemplate.style, { componentName })
    );

    // Writing storybook file
    if (storybook) {
        fs.writeFileSync(
            path.join(
                cPath,
                options.storybook
            ),
            mustache.render(buildInTemplate.storybook, { componentName })
        );
    }
 };*/
 const buildTemplate = (componentName: string, cPath: string, workspace: string) => {
     const boilerplateFile = path.join(workspace, "components-boilerplate.js");
     console.log(workspace);
    fs.mkdirSync(cPath,{ recursive: true });
    const plates: [string, string][] = JSON.parse(mustache.render((fs.existsSync(boilerplateFile) ? require(boilerplateFile) : buildInBoiler).toString(),{ componentName }));
 //    const plates: [string, string][] = Object.entries(config);
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
};
export default  buildTemplate;