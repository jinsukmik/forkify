# forkify
THANK YOU Jonas Schmedtmann of Udemy - I really liked going over everything line by line!

If you plan on cloning this app. You will not be able to "npm run build" this file because of a terser having code breaking changes. Terser-webpack-plugin must use an older version 3.14.

OR

Do what I did and go into the NODE_MODULES folder after you "npm i". Open the "terser-webpack-plugin" folder and go into dist and go open the minify.js file. Proceed to line 175 and change '_terser.default.minify' into '_terser.minify'

Then you can npm run build and it should all work!
