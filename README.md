# Mighty Codemods :-D

Includes a list of my codemods. It can be found inside transforms directory.


## Usage
1. jscodeshift is a pre-requisite for running the transform.
2. Install it globally or in the project. https://www.npmjs.com/package/jscodeshift
3. The transforms can be run by adding a script in package.json or if installing globally just run it bare.
4. Copy a transform and run it.

To run the transforms/addMjsExtensionToImports

jscodeshift ./src --extensions=mjs -t ./transforms/mjsTransform.js --ignore-config ../.gitignore


