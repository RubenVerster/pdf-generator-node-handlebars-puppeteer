Node v16.14.2 was used for this

You should be able to just run 'npm i' and all should be good
Reference the package.json for possible files to generate and preview

There is an additional argumant you can add to the node scripts:

Nodemon is used to watch the script for when changes are made
Passing 'headless' after the script will run the generator without the browser preview and only generate the pdf document in the 'pdfs' directory
'npm run generate:biotang headless' - this would run without browswer preview
'generate:biotang' - this would run with the browser preview and rerun the script when any changes are made
