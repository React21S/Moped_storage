'use strict';

const CODES = {
    PROGRAM_ERROR:10,
    NOT_FOUND:20,
    INSERT_OK:30,
     NOT_INSERTED:40,
    ALREADY_IN_USE:50,
    REMOVE_OK:60,
    NOT_REMOVED:70,
    UPDATE_OK:80,
    NOT_UPDATED:90
}



const MESSAGES = {
    PROGRAM_ERROR: ()=>({
        message:'Error in the code',
        code:CODE.CODE_ERROR,
        type:'error'
    }),
    NOT_FOUND:mopedId =>({
        message:`No Moped is found with mopedId ${mopedId}`,
        code: CODES.NOT_FOUND,
        type:'error'
    }),
    INSERT_OK: mopedId =>({
        message:` New moped with mopedId${mopedId} was inserted`,
        code: CODES.INSERT_OK,
        type:'info'
    }),

    NOT_INSERTED: ()=>({
        message:'New Moped was not inserted',
        code: CODES.NOT_INSERT,
        type:'error'
    }),

    ALREADY_IN_USE: mopedId =>({
        message:` mopedId ${mopedId} was taken`,
        code: CODES.ALREADY_IN_USE,
        type:'error'
    }),

    REMOVE_OK: mopedId =>({
        message:` Moped ${mopedId} was removed`,
        code: CODES.REMOVE_OK,
        type:'info'
    }),

    NOT_REMOVED:mopedId =>({
        message:`mopedId ${mopedId} was not found. Nothing removed`,
        code: CODES.NOT_REMOVED,
        type:'error'
    }),

    UPDATE_OK: mopedId =>({
        message:` Moped with mopedId ${mopedId} was updated`,
        code: CODES.UPDATE_OK,
        type:'info'
    }),

    NOT_UPDATED: () =>({
        message:'Moped data was not updated',
        code: CODES.NOT_UPDATED,
        type:'error'
    }),
}

module.exports = {CODES, MESSAGES};