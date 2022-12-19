# Data Entities


<br />

## Load

The library is the single JavaScript file *index.js*.

Browser:

```html
<script src='./dist/index.js'></script>
```

[Node.js](http://nodejs.org):

```bash
$ npm install @evestx/data-entities
```

```javascript
const { BigNumber } = require('@evestx/data-entities');
```

ES6 module:

```javascript
import { BigNumber } from "@evestx/data-entities"
```

AMD loader libraries such as [requireJS](http://requirejs.org/):

```javascript
require(['@evestx/data-entities'], function(data) {
    // Use BigNumber here in local scope. No global BigNumber.
});
```