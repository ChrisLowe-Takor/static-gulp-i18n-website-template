
## About

This is a gulp script for a static website. It:
 - Handles internationalisation
 - Minifys HTML, CSS, JS and image assets
 - Auto syncs browser


## Getting started

`npm install -g gulp`

`npm install`

`gulp`

This will host the english version locally and keep the browser synced with changes made to the html, css, js, translation files and images

Alternatively, you can host one of the translations with:

`gulp sync-zh`

`gulp sync-pseduo`

## Project structure

```
 - build
   - en
   - pseduo
   - zh
 - locale
   - en
     - index.json
   - pseudo
     - index.json
   - zh
     - index.json
  - src
     - img
     - js
     - styles
     - index.html
```


## Working with this template

When adding a new string to the html, use the following syntax to identify the string:

`${{ MyString }}$`

Add the definition to the JSON in `locale/en/index.json`

`"MyString": "My String!"`

The other translations in the locale directory will fall back to the English definition if they are not defined.

## Adding new translations

Let's say you want to create a Korean translation (ko).  

- Send a copy of your English json file off to your translator to translate the values
- Create the directory with the language code in locale and place the new .json translation file.  Eg  `locale/ko/index.json`
- Open gulpfile.js and add it to the `buildDirs` variable. Ie:
    ```
	var buildDirs = [
	   'build/en/',
	   'build/zh/',
	   'build/pseudo/',
	   'build/ko'
	];
	```

 - If all goes well you will have a new build directory with the translated website. To see it in action you should copy one of the existing sync tasks such as `sync-zh` to `synch-ko` and change the `baseDir`.





