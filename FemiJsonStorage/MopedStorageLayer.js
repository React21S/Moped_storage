'use strict';

const {CODES, MESSAGES}=require("./statusCodes");

const {
    getAllFromStorage, 
    getOneFromStorage, 
    addToStorage, 
    updateStorage,
    removeFromStorage
} = require("./MopeFunctionLayer");
 

module.exports = class MopedDataStorage {

    // For getting code error 
    get CODES(){
        return CODES;
    }

    // For getting All mopeds 
    getAll(){
        return getAllFromStorage();
    }

    // For getting one mope
    getOne(mopedId){
        return new Promise(async (accept, reject)=>{
            let result = await getOneFromStorage(mopedId);
            if(result){
                accept(result)
            }
            else{
                reject(MESSAGES.NOT_FOUND(mopedId));
            }
        });
    }

    // For inserting new mope
    insert(moped){
        return new Promise(async (accept, reject)=>{
            if(moped){
                if(!moped.mopedId){
                    reject(MESSAGES.NOT_INSERTED());
                }
                else if(await getOneFromStorage(moped.mopedId)){
                    reject(MESSAGES.ALREADY_IN_USE(moped.mopedId));
                }
                else if (await addToStorage(moped)){
                    accept(MESSAGES.INSERT_OK(moped.mopedId))
                }
                else {
                    reject(MESSAGES.NOT_INSERTED());
                }
            }
            else{
                reject(MESSAGES.NOT_INSERTED());
            }
        });
    };


    // For getting update of mopeds
    update(Moped){
        return new Promise(async (accept, reject)=>{
            if(Moped){
                if(await updateStorage(Moped)){
                    accept(MESSAGES.UPDATE_OK(Moped.mopedId))
                }
                else {
                    reject(MESSAGES.NOT_UPDATED());
                }
            }
            else{
                reject(MESSAGES.NOT_UPDATED());
            }
        });
    }


    // For removing mope
    remove(mopedId){
        return new Promise(async(accept, reject)=>{
            if(!mopedId){
                reject(MESSAGES.NOT_FOUND('---empty..'));
            }
            else if(await removeFromStorage(mopedId)){
                accept(MESSAGES.REMOVE_OK(mopedId));
            }
            else{
                reject(MESSAGES.NOT_REMOVED(mopedId))
            }
        });
    }

}