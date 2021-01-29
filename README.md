# convert-inline style react

this tools for parsing inline style your code into single file

## How to Use

```bash
npm i -g conver-inline-styles-react

# do it in your current working directory
convert-styles sample_file.js
```

```js
// sample_file.js

<View style={{ marginBottom: 20 }} />
// automaticaly refactored to
<View style={styles.style0} />
```

```js
// sample_file_style.js, this file is created automatically

import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  style1: {
      marginBottom: 20
    }
})

```


![video](https://imgur.com/xAztEga)

