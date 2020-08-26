## THE FUSION CONFIGURATOR

This is the Fusion Configurator. My first React App and first time using JavaScript, so inevitably some things are done slightly inneficiently. But it runs fine and works, so it's certainly a success. Still a work in progress but nearly completed this first draft.

Link: https://www.fusionconfigurator.com/

### How it all ties together

Basically we've got the classic 'App.js' which sends data down to sub components and sub comonents of sub components ect ect. Therefore it's quite a large file, holds a fair few variables and does most of the actual data processing. 

We've got the subcomponents in the /components/ directory and in the /Config/ directory we have the config file, used to set up custom versions of the configurator for different businesses/countries ect. In the /Funcitons/ directory we have some general purpose functions I created which are used across the project. One for formatting money and one for importing and parsing csv files. 

### Dependencies

All the packages it use are under the MIT license, the list of which can be seen below. I only used dependencies where I really had to, and it made sense to outsource code. For example, for creating PDFs and XLSX files.

1. React-Bootstrap - https://react-bootstrap.github.io/
2. Html2Canvas - https://html2canvas.hertzen.com/
3. React-PDF - https://react-pdf.org/
4. React-device-detect - https://www.npmjs.com/package/react-device-detect
5. React-Modal - https://github.com/reactjs/react-modal
6. React-data-export - https://www.npmjs.com/package/react-data-export
7. File-saver - https://www.npmjs.com/package/file-saver


