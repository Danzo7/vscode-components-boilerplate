import * as fs from 'fs';
import * as path from 'path';
import * as mustache from 'mustache';
import REACT_TEMPLATES from './templates/react';
import { FILE } from 'dns';

export const buildReactTemplate = ({scss,typescript,storybook}: { scss: Boolean,typescript:boolean,storybook:boolean}, componentName: string, cPath: string) => {
    
    let stylingExtension = scss ? ".scss" : ".css";
    let indexExtension = typescript? ".ts" : ".js";
    let componentExtension = `${indexExtension}x`;

    const FILE_NAMES = {
        styleDir: `style`,
        styling: `style/index${stylingExtension}`,
        component: `${componentName}${componentExtension}`,
        componentIndex: `index${indexExtension}`,
        storybook: `${componentName}.stories${componentExtension}`
    };

    const COMPONENT_TEMPLATE = indexExtension === ".ts" ? REACT_TEMPLATES.TS_TEMPLATE : REACT_TEMPLATES.JS_TEMPLATE;
    
    // Writing main component file
   fs.writeFileSync(
        path.join(
            cPath,
            FILE_NAMES.component
        ),
        mustache.render(COMPONENT_TEMPLATE, {componentName})
    );

    // Writing component index file
     fs.writeFileSync(
        path.join(
            cPath,
            FILE_NAMES.componentIndex
        ),
        mustache.render(REACT_TEMPLATES.INDEX, {componentName})
    );
    
    // Creating style directory
     fs.mkdirSync(path.join(
        cPath,
        FILE_NAMES.styleDir
    ));

    // Writing component styling file
     fs.writeFileSync(
        path.join(
            cPath,
            FILE_NAMES.styling
        ),
        mustache.render(REACT_TEMPLATES.STYLING, {componentName})
    );

    // Writing storybook file
    if(storybook) {
   fs.writeFileSync(
            path.join(
                cPath,
                FILE_NAMES.storybook
            ),
            mustache.render(REACT_TEMPLATES.STORYBOOK, {componentName})
        );
    }

}