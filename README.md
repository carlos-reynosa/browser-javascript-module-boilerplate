# Browser JavaScript Module Boilerplate

This repository contains boilerplate files and tool configurations that aim to simplify the process of
starting a project to implement a single JavaScript browser based module. 

##Quick Start

1. Clone the repository into your project folder.
    * `git clone git@github.com:carlos-reynosa/browser-javascript-module-boilerplate.git .`
2. Install Node dependencies for development 
    * `npm install`
    
3. Edit the module source file located in `src/module.js`. If you want to rename the file, make sure to also change
the file name within the `gulp-config.json` configuration. 

4. Run the build Gulp task which lints, tests, and uglifies the module. 
    * `gulp build`
    
Once you have successfully run the build Gulp task, the final uglified (module.min.js or dist/module.min.js) and original module (module.js) source files should appear 
within the root of the project directory and within the `dist` folder. 

