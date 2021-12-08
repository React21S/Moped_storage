'use strict';

const path = require('path');

const {readMopedStorage, writeMopedStorage}=require('./readAndWrite');

const {adapt}=require(path.join(__dirname,'./mopedAdaptor'));
const mopedStorageFilePath = path.join(__dirname, './Oyinloye_Femi_mopeds.json');

// To get all mopeds from storage 
const getAllFromStorage = async()=>{
    return readMopedStorage(mopedStorageFilePath );
};



//T get one mope from storage 
const getOneFromStorage = async(mopedId)=>{
   return ( await readMopedStorage(mopedStorageFilePath)).find(item=>item.mopedId == mopedId) || null; 
};


// Add to the mope in the storage
const addToStorage=async(newMoped)=>{
    const storage = await readMopedStorage(mopedStorageFilePath);
    storage.push(adapt(newMoped));
    return await writeMopedStorage(mopedStorageFilePath, storage);
};





// To update mope
const updateStorage=async(updatedMoped)=>{
    const storage = await readMopedStorage(mopedStorageFilePath);
    const oldMoped = storage.find(item=>item.mopedId == updatedMoped.mopedId);
    if (oldMoped){
        Object.assign(oldMoped, adapt(updatedMoped));
        return await writeMopedStorage(mopedStorageFilePath, storage);
    }
    else {
        return false;
    }
};


// To remove mope from storage 
const removeFromStorage= async(mopedId)=>{
    const storage = await readMopedStorage(mopedStorageFilePath);;
    const i = storage.findIndex(item=>item.mopedId == mopedId);
    if (i<0) return false;
    storage.splice(i, 1);

    return await writeMopedStorage(mopedStorageFilePath, storage);
};


module.exports={
    getAllFromStorage, 
    getOneFromStorage, 
    addToStorage, 
    updateStorage,
    removeFromStorage
};