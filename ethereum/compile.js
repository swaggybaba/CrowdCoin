const path = require('path');
const solc = require('solc');
//file system->it gives access to the file system on our local computer
//fs-extra is similar to fs module but it has extra functions
const fs = require('fs-extra');

//delete entire build folder
//__dirname->current working directory
const buildpath = path.resolve(__dirname, 'build');
fs.removeSync(buildpath);

//read 'Campaign.sol' from the 'contracts' folder
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

//compile both contracts with solidity compiler
const output = solc.compile(source, 1).contracts;

//recreate build folder
//ensureDirSync checks if a directory exists and if it does not exists this function will create for us
fs.ensureDirSync(buildpath);

for(let contract in output){
    let name = contract.replace(':', '');
    fs.outputJsonSync(
        path.resolve(buildpath, name + '.json'),
        output[contract]
    );
}