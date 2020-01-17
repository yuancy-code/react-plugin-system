# react-plugin-system

React plugin development system

## Describe

Independent react plugin development, plugin can be quickly inserted and pulled out, plugin async loading mode.

## How to use

```javascript
// src/index.js
import { register } from "react-plugin-system";
let pages = require.context("@plugins", true, /\/.*config\.js$/);
pages.keys().map(key => {
  let config = pages(key).default;
  // reigster plugins
  register(config);
  return config;
});
```

```jsx
// src/pages/*/*.jsx
import React from "react";
import { callPlugin, Plugin } from "react-plugin-system";
export defalut class ButtonBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    /**
     * add
     */
    addHandle = async () => {
        // callPlugin
        const path = (callPlugin('add'));
        const plugin = await import("@plugins/" + path);
        (plugin.default)({ a: 1 });
    }
    /**
     * infoClose
     */
    infoCloseHandel = (data) => {
        console.log(data)
    }
    render() {
        const path = (callPlugin('info'));
        return <div>
            <Button icon="plus" onClick={this.addHandle}>新增</Button>
            <Plugin importComponent={() => { return import("@plugins/" + path) }} onClose={this.infoCloseHandel} />
        </div>
    }
}
```

## plugin demo

### Add plugin

```js
// src/plugins/add/config.js
export default {
  id: "add",
  index: "add/index.js"
};
```

```js
// scr/plugins/add/index.js
import { message } from "antd";
export default function(config = {}) {
  const { calllBack = () => {} } = config;
  message.success("Add success!");
  calllBack();
}
```

### Info plugin

```js
// src/plugins/info/config.js
export default {
  id: "info",
  index: "info/index.jsx"
};
```

```js
// scr/plugins/info/index.jsx
import React from "react";
import { Button, notification } from "antd";
export default class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  clickHandle = () => {
    const { onClose = () => {} } = this.props;
    notification["info"]({
      message: "Project info",
      description: "Here is the notice!",
      onClose: () => {
        onClose("User Close");
      }
    });
  };
  render() {
    return (
      <Button icon="info-circle" onClick={this.clickHandle}>
        Info
      </Button>
    );
  }
}
```

## Notice

The system needs to add "@plugins" alias.

```js
// webpack.config.js
{
    alias: {
        "react-native": "react-native-web",
        "@plugins": path.resolve("./src/plugins"),
    }
}
```

###

## License

Licensed under the Apache License, Version 2.0
(<http://www.apache.org/licenses/LICENSE-2.0>)
