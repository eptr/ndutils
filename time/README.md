# @ndutils/time

A cross-platform node.js package for manage system clock.

# Installation

```sh
npm i @ndutils/time --save
```

# Usage

import package and call setClock function to change system clock. A null date will try to recover system clock from ntp.

```ts
import {TimeUtils} from "@ndutils/time";

// set system clock
TimeUtils.setClock(new Date('2011-11-11 11:11:11')).then(std => {
    console.log(std);
}).catch(error => {
    console.log(error);
});

// recover system clock
TimeUtils.setClock(null).then(std => {
    console.log(std);
}).catch(error => {
    console.log(error);
});
```

# License

(c) 2021 ptr.io, MIT license.