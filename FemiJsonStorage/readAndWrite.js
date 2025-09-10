'use strict';

const fs = require('fs').promises;

const readMopedStorage = async (mopedStorageFile)=>{
    try{
        return (JSON.parse(await fs.readFile(mopedStorageFile, 'utf8')))
    }
    catch(err){
        return [];
    }
}

const writeMopedStorage = async(mopedStorageFile, mopedData)=>{
    try{
       await fs.writeFile(mopedStorageFile, JSON.stringify(mopedData, null, 4)),{
            encoding:'utf8',
            flag:'w'
       };
        return "successful";
    }
    catch(err){
        return "unsuccessful";
    }
}

module.exports={readMopedStorage, writeMopedStorage};