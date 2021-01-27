export default {
  javascript: `
import React, { Fragment } from 'react';
import './styles/index{{StyleExtension}}';
const {{componentName}} = (props) => {
  return <Fragment></Fragment>;
};
export default {{componentName}}
`,
  typescript: `
//
import React from 'react';
import './styles/index{{StyleExtension}}';

interface {{componentName}} {
//props
}

function {{componentName}}({}: {{componentName}}) {
  // const [count, setCount] = useState(0);
  // useEffect(func, [count, setCount]);
  // Return the App component.
  return (
    <div className="{{componentName}}"></div>
  );
}

export default {{componentName}};

`,
  storybook: `
import React, {Fragment} from 'react';
import {{componentName}} from './{{componentName}}';
export default {title: 'Component|{{componentName}}'};
export const {{componentName}}Example = () => (
  <Fragment>
      <{{componentName}} />
  </Fragment>
);
`,
  index: `
import {{componentName}} from './{{componentName}}';
export default {{componentName}};    
`,
  style: ``
};