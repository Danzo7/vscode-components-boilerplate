# Components boilerplate
![Logo](assets/logo.png)

    Components boilerplate is a Vscode Plugin to generate code pattern from a predefined configuration.
This plugin will increase the productivity and help maintain the same files structure across different developers/project.
## Guide of usage
Components boilerplate generates files/folders/code from a giving configuration file.
### Creating config file:
To be able to generate a well defined components you have to create a boilerplate config file with the necessary boilerplate code.
* A valid config file must be in your workspace project directory under the name of `boilerplates.config.js` in order for the plugin to work.
### config structure:
the config file contains `BoilerplateConfig[]`.
##### **Type definition:**
```ts
interface BoilerplateConfig {
  name: string;
  variants: string[];
  template:[string,string][];
}
```


| proprieties | definition |
| -----| ------ | 
|``name : string``|Name of the boilerplate,In case you have more then on element in the config array you will be asked to select a boilerplate template by name|
|``variants : string[]``|array of string will be used later to fill the boilerplate code|
|``template:[path,content][]``|an array of doubles contains the path and content of the file that will be generated|

```js
[
  { name:"name",
    variants:["variant1","variant2",...],
    template:[
      ["path","content"],
      ...
      ]
    },
    ...
  ]
```

### How to use variants:
variants are a placeholders to variables,You will be asked to provide a value for each variant when generating a component.
Any string that wrapped in double brackets and have a value that exists in variants array will be replaced by the value provided when generating the component. 
eg:


```js
[
  { name:"template_name",
    variants:["name","variant","variant1"],
    template:[
      [`index.js`,
       `import {{variant}} from "{{variant1}}.js"`
      ],
      [`{{variant1}}.js`,
       `export default {{variant}}="hello world";`
      ]
    ]
  },
  { name:"SimpleFile",
    variants:["variant1","variant2","variant3"],
    template:[
      ["boilerplate/{{variant1}}.txt",
      `{{variant1}}+{{variant2}}={{variant3}}`],
      
      ]
    }
]
```
> eg:`{{variant}}` will be replaced to a value giving by the user when generating the component. 

![React component example](assets/TestExample.gif)

#### Naming Conventions:
we've added a new feature that allow you to convert the value of variants before replacing them in template into different case styles.
by providing a `suffix` after the first closing brackets `{{variant}suffix}` with one of the following values the variant placeholder will be replaced by the selected case.


|Suffix|Case Style|Definition
|------|------|-----|
|``cc``|`camelCase`|the value will be converted to [camelCase](https://en.wikipedia.org/wiki/Camel_case),eg:`hello word`=>`helloWorld`.
|``sc``|`snake_case`|the value will be converted to [snake_case](https://en.wikipedia.org/wiki/Snake_case),eg:`helloWorld`=>`hello_world`.
|``pc``|`PascalCase`|the value will be converted to [PascalCase](https://en.wikipedia.org/wiki/Pascal_case),eg:`hello_world`=>`HelloWorld`.
|``kc``|`kebab-case`|the value will be converted to [kebab-case](https://en.wikipedia.org/wiki/kebab_case),eg:`hello_world`=>`hello-world`.



* This extension is not that smart so values need to be written in a valid [case styles](https://en.wikipedia.org/wiki/Naming_convention_(programming)) to get a correct conversion.

###### eg:
`{{variant}sc} //convert to snake_case`
`hello world` || `HelloWorld`...ext will be converted to `hello_world` as intended.

In other world `hellowoRld` will be converted to `Hellowo_rld`. which is not what we want propably.


### Plugin options:
|Option|Value|Definition
|------|------|-----|
|``isWrapped``(***deprecated***)|`Default:disabled`|When enabled first variant will be used as a wrapper directory for the generated component 


## Generate components:
- Right click on the intended folder
- click on `Generate new component...`
- Fill the necessary data.
- Done!
  

### example:
#### ***generate react typescript component :***
`isWrapped=enabled`

![React component example](assets/reactExample.gif)

`boilerplates.config.js`:
```js
[
  {name:"react",variants:["componentName"],template:[
    [
      '{{componentName}sc}/{{componentName}pc}.tsx',
`import React from 'react';
import './index.scss';
interface I{{componentName}cc} {
}

function {{componentName}pc}({}: I{{componentName}cc}) {
  return (
    <div className="{{componentName}pc}"></div>
  );
}
    
export default {{componentName}pc};

`,
    ],
    [
      '{{componentName}sc}/index.ts',
`import {{componentName}pc} from './{{componentName}pc}';
export default {{componentName}pc};`,
    ],
    [
      '{{componentName}sc}/index.scss',
      `.{{componentName}kc}{
      }`,
    ],
  ]
  }
];
```

## Whats next?
At this point the plugin has reach its goal, The one that I really need it to be like, a tool to help me organize my project structure and to be able to keep the same structure with all my dev friends and what a satisfaction when its reached a point when I can say "I did it".
Some says that files structure is small part of the project and you shouldn't [overthink](https://reactjs.org/docs/faq-structure.html#dont-overthink-it) on that, I don't take that advice and here we are.But even though it takes me some time to realize that it was a mistake, I enjoy the idea that could be somebody out there who will find this helpful event though its more possible that nobody really will hear of it, Like a peace of sand in the desert, I may not get a trophy or a complement for the work but I will consider this as an achievement some thing that "I did".
At the end I have to say thank you to you who's reading this and for the time that you give to try this plugin even if its not the best or the only out there ,So the next is you. 

#### TL;DR:
For me I accomplish my mission and I consider this as a finished product, But their could be people out there with a different mindset and ideas. If you like to contribute to this project You are very welcomed and I will be here (at least if I'm not dead) to accept any [PR](https://github.com/Danzo7/vscode-components-boilerplate/pulls) that provides new things to the plugin, Also feel free to clone or fork the repo if you like to.

To report an issue or request a feature :[create an issue](https://github.com/Danzo7/vscode-components-boilerplate/issues)

### Accomplishments:
- [x] Fully customizable template boilerplate.
- [x] Support multi templates and variants.
- [x] Support Naming conversion.
- [x] Proper documentation.
- [x] Add some examples. 

### Ideas that can be implemented:
- [x] Support Naming conversion.
- [ ] Add shortcut support.
- [ ] change the location of config file to /.vscode.
- [ ] Create config file automatically on first start with .vscode as a location.
- [ ] Generate a template from a giving file/folder.