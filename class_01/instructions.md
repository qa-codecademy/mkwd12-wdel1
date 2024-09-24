# General instructions for working with Node.js and NPM

## Node.js

1. Download and install Node.js from [nodejs.org](https://nodejs.org/). Choose the LTS (latest stable version) version.
2. No need to change any settings during installation, just click next until it's done.
3. Open a terminal and run `node -v` to check that Node.js is installed.
4. Run `npm -v` to check that NPM is installed. (NPM is included with Node.js.)

## Terminal Git Bash

1. Download and install Git Bash from [git-scm.com](https://git-scm.com/).
2. No need to change any settings during installation, just click next until it's done.

## Install a package

1. Open a terminal and navigate to the folder where the `package.json` file is located.
2. Run `npm install <package-name>` to install a package. Replace `<package-name>` with the name of the package you want to install.
3. The package will be installed and added to the `package.json` file as a dependency.
4. If you want to install a package and save it as a development dependency, run `npm install <package-name> --save-dev`.
5. If you want to install a specific version of a package, run `npm install <package-name>@<version>`.

## Uninstall a package

1. Open a terminal and navigate to the folder where the `package.json` file is located.
2. Run `npm uninstall <package-name>` to uninstall a package. Replace `<package-name>` with the name of the package you want to uninstall.
3. The package will be uninstalled and removed from the `package.json` file.

## Global packages

1. Global packages are installed in a different location than local packages, and they can be used by any Node.js project.
2. If you want to install a package globally, run `npm install -g <package-name>`.
3. If you want to uninstall a package globally, run `npm uninstall -g <package-name>`.

## Node Modules

1. When you install a package, it will be added to a folder called `node_modules` in the root of your project.
2. The `node_modules` folder contains all the installed packages and their dependencies.
3. You should not modify the contents of the `node_modules` folder manually. If you need to make changes to a package, you should do it through NPM.
4. The `node_modules` folder is not included in version control, so it will not be uploaded to your repository when you push your code to GitHub.
5. When you clone a repository that contains a `package.json` file, you can run `npm install` to install all the dependencies listed in the `package.json` file.
6. If you want to install the dependencies for a project that you have cloned, run `npm install` in the root of the project folder.

## Package.json

1. The `package.json` file contains information about the Node.js project, such as the name, version, description, and dependencies.
2. You can edit the `package.json` file manually, but it's usually better to use NPM commands to manage the file.
3. The `package.json` file is used to specify the dependencies of the project, so that other developers can install the same dependencies by running `npm install`.
4. The `package.json` file also contains scripts that can be run with `npm run <script-name>`. For example, you can add a script to start the project with `npm start`.
5. The `package.json` file is automatically updated when you install or uninstall packages with NPM.

## NPM Scripts

1. The `package.json` file can contain scripts that can be run with `npm run <script-name>`.
2. You can add custom scripts to the `package.json` file to automate tasks such as starting the project, running tests, or building the project for production.
3. To run a script, use the command `npm run <script-name>`. Replace `<script-name>` with the name of the script you want to run.
4. You can also run scripts with `npm start` and `npm test` without specifying the script name. These are special scripts that are used to start the project and run tests, respectively.
