
## About

This is a gulp script for a static website. It:
 - Handles internationalisation
 - Minifys HTML, CSS, JS and image assets
 - Cache squashes files so the CDN will behave correctly 
 - Auto syncs browser and reloads changed files while developing


## Getting started

`npm install -g gulp`

`npm install`

`gulp`

This will host the english version locally and keep the browser synced with changes made to the html, css, js, translation files and images

Alternatively, you can build, host and sync one of the localizations with:

`gulp --lang=zh`

`gulp --lang=pseudo`

You can build the localized versions of the site without browser-sync with:

`gulp build --lang=en`
`gulp build --lang=zh`
`gulp build --lang=pseudo`


## Working with localized strings

When adding a new string to the html, use the following syntax to identify the string:

`${{ index.MyString }}$`

Add the definition to the JSON in `locale/en/index.json`

`"MyString": "My String!"`


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
     - /img
     - /js
     - /partials
     - /styles
     - /vendor
     - index.html
```


## Adding new translations

Let's say you want to create a Korean translation (ko).  

- Send a copy of your English json file off to your translator
- Create the directory with the language code in locale and place in the new .json translation file.  Eg  `locale/ko/index.json`
- You can then build and sync with `gulp --lang=ko`
- Run `gulp build --lang=ko` and you will have the new translated build under `build/ko`. 


## Limitations

 - Trying to call `gulp build --lang=xx` where the `xx` localization doesn't exist will fill the build with garbage localizations
 - If a string is missing in one of the localizations it will fill the missing string with garbage but it will warn you in the console of the missing file.

