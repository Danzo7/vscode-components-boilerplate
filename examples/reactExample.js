[
    {name:"react",variants:["componentName"],template:[
      [
        '{{componentName}sc}/{{componentName}pc}.tsx',
  `import React from 'react';
  import '.style/index.scss';
  interface I{{componentName}pc} {
  }
  
  function {{componentName}pc}({}: I{{componentName}pc}) {
    return (
      <div className="{{componentName}kc}"></div>
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
        '{{componentName}sc}/style/index.scss',
        `.{{componentName}kc}{
  }`,
      ],
      ["{{componentName}sc}/{{componentName}pc}.stories.tsx",
      `import React, { ComponentProps } from 'react';
  import type { Story } from '@storybook/react';
  import  {{componentName}pc}  from './{{componentName}pc}';
  //👇 This default export determines where your story goes in the story list
  export default {
    title: '{{componentName}pc}',
    component: {{componentName}pc},
  };
  const Template: Story<ComponentProps<typeof {{componentName}pc}>> = (args) => <{{componentName}pc} {...args} />;
  export const FirstStory = Template.bind({});
  FirstStory.args = {
  };`
    ]
    ]
    }
  ];