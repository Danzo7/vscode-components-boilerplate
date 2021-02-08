# Components boilerplate

Components boilerplate is an extension that help you organize your components and be more productive,its work by allowing users to spawn/generate predefined component with specific name using a specific folders hierarchy and files defined by the boilerplate,
>the generated component files will be filled using the specified name by a boilerplate code.
## How to use?
- Right click any directory in the explorer panel
- Select Boil a new component
- enter the name
- Submit

## Configuration
You can use default templates to generate components 
``preferences>extenstion>components boilerplate``
### here you can see this options
| configuration | definition |options|
| ------ | ------ | ------ |
|typescript|if true will generate .ts file |boolean|
|framework|if react will generate .jsx/.tsx file|currently support: react|
|styling|styling method generate .css/.scss| scss\|css|

### Whats are this Files??
The default templates ais opinionated, admittedly. They adhere to the principles of feature-based structuring, as promoted in this article by Max Stoiber.
>You dont have to use the default templates and you should'nt.

## Costumize templates
You can use a costum template boilerplate to generate your component just by adding a confguration file to the root folder.
create a file in the root folder and name it `components-boilerplate.js`
use this syntax  `[string=path,string=content][]`

| option | definition |
| ------ | ------ | 
|path:string|path to the generated file example: `path/to/file.js` (create new file at `selectedFolder/componentName/path/to/file.js`)|
|content:string|the content of the generated file. |
### content
the file content is the boilerplate code with a name placeholder
We use mustache.js to replace the placeholders
####  placeholders
``{{componentName}}``: the name of component that you submit
Use the backtick \`` to avoid the missmatching
>>`components-boilerplate.js` is not a loaded as js you dont need to use any variable declaration you just need to declare an array with the defined configs
### example
`components-boilerplate.js`
```
[
  [
    '{{componentName}}.tsx',
    `
  import React from 'react';
  import './styles/index{{StyleExtension}}';
  interface {{componentName}} {
  }
  
  function {{componentName}}({}: {{componentName}}) {
    return (
      <div className="{{componentName}}"></div>
    );
  }
  
  export default {{componentName}};
  
  `,
  ],
  [
    'index.ts',
    `
    import {{componentName}} from './{{componentName}}';
    export default {{componentName}};    
    `,
  ],
  ['style/index.scss', ``],
];
```
## report issues an featues
[create an issue](https://github.com/Danzo7/vscode-components-boilerplate/issues)
## Roadmap
- add suppoet for multiple templates
- add support for multiple cases (now only name)