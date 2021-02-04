
interface IOption{
  framework: {
    reactJs: {
      typescript: [string[], string[]];
      javascript: [string, string];
      storybook: [string, string];
    };
    vueJs: any;
    /*{
      typescript: [string[],string[]];
      javascript: [string,string];
      storybook: [string,string];
    };*/
};
styling: {
    css: [string,string];
    scss: [string,string];
  }
}
const options:IOption =
  {
    framework: {
      reactJs: {
        typescript: [[
          "{{componentName}}.tsx",
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
  
  `],

            ["{{componentName}}.ts",
            `
  import {{componentName}} from './{{componentName}}';
  export default {{componentName}};    
  `,
          ]],
        javascript: [
          "{{componentName}}.js",
          `
      import React, { Fragment } from 'react';
      import './styles/index{{StyleExtension}}';
      const {{componentName}} = (props) => {
        return <Fragment></Fragment>;
      };
      export default {{componentName}};
      `,
        ],
        storybook: [
          "{{componentName}}.storybook.js",
          `import React, {Fragment} from 'react';
    import {{componentName}} from './{{componentName}}';
    export default {title: 'Component|{{componentName}}'};
    export const {{componentName}}Example = () => (
      <Fragment>
          <{{componentName}} />
      </Fragment>
    );
    `
        ]
  

      },
      vueJs: { 
      }

    },
      styling: {
        css: ["style/index.css", ``],
        scss:["style/index.scss", ``]
      }

};
export default  options; 