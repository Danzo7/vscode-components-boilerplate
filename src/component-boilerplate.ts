export  default [
  [
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

`,
  ],
  [
    "{{componentName}}.js",
    `
  import React, { Fragment } from 'react';
  import './styles/index{{StyleExtension}}';
  const {{componentName}} = (props) => {
    return <Fragment></Fragment>;
  };
  export default {{componentName}}
  `,
  ],
  [
    "{{componentName}}.storybook.js",
    `import React, {Fragment} from 'react';
  import {{componentName}} from './{{componentName}}';
  export default {title: 'Component|{{componentName}}'};
  export const {{componentName}}Example = () => (
    <Fragment>
        <{{componentName}} />
    </Fragment>
  );
  `,
  ],
  [
    "{{componentName}}.ts",
    `
  import {{componentName}} from './{{componentName}}';
  export default {{componentName}};    
  `,
  ],
  ["style/index.scss", ``],
];
