# Oyinloye_Femi_moped_project
-   This about the mope car which analysis their highest speed and the rate which they have got with their year or registration.
---
## Oyinloye_Femi_mopeds.json
-   These are the data got for the analysis 

```json
[
    {
    "mopedId":5,
    "name":"Skooter 95",
    "rating":"****",
    "topspeed":25,
    "modelYear":2015
    },
    {
    "mopedId":6,
    "name":"Xross 3",
    "rating":"*",
    "topspeed":30,
    "modelYear":1990
    },
    {
    "mopedId":4,
    "name":"Mummy 10",
    "rating":"***",
    "topspeed":10,
    "modelYear":2011
    },
    {
    "mopedId":7,
    "name":"MaxNoise 120",
    "rating":"**",
    "topspeed":5,
    "modelYear":2012
    },
    {
    "mopedId":2,
    "name":"MotoX 2000",
    "rating":"*****",
    "topspeed":20,
    "modelYear":2017
    },
    {
    "mopedId":3,
    "name":"Daddy 1",
    "rating":"**",
    "topspeed":40,
    "modelYear":2005
    },
    {
    "mopedId":1,
    "name":"Grampa 89",
    "rating":"*",
    "topspeed":15,
    "modelYear":2000
    }
    ]
```
---
## Data access layer for the data

### Necessary operation needed to read the file data in dynamic ways

#### MopedStorageLayer.js
```js
  getAll()
    -   if found mopeds
        -   returns an array of all mopeds
    -   else 
        -   return empty array []

  getOne(mopedId)
    -   if found (mopedID)
        -   returns moped object 
    -   else
        -   reject (NOT_FOUND)

  insert (newMope)
    -   if (newMope)
        -   returns INSERT_OK / 
    -   else
        -   reject (NOT_INSERTED / ALREADY_IN_USE)

  update(updated)
    -   if (mope is updated)
        -   returns UPDATE_OK
    -   else 
        -   reject (NOT_UPDATED)

    remove(mopedId)
    -   if (moped was successfully removed)
        -   returns (REMOVE_OK )
    -   else
        -   reject ( NOT_FOUND / NOT_REMOVED)

  getting status codes for the message 
    -   returns status codes
```
---

### JS program for Read and Write 

#### readAndWrite.js
```js
-   readStorageFile(storageFile)
    -  try
        -    returns an array of all mopeds 
    -   catch (err)
        -   return []

-   writeStorageFile(storageFile, data)
    -   try
        -   writeFile
        -   returns true 
    -   catch 
        -   return false
```
----

#### MopeFunctionLayer.js

```js
-   getAllFromStorage()
    -   returns an array of mopeds []

-   getOneFromStorage(mopedId)
    -   returns moped object || null

-   addToStorage(newMope)
    -   returns true  false

-   updateStorage(updateMope)
    -   returns updated / NOT_UPDATED

-   removeFromStorage(mopedId)
    -   returns REMOVED/ NOT_REMOVED
```
---

### Error status code
-   if there is any error generate during the process, the error code written bellow will describe the status of the message and likely error that occurred. 
-   message type
    -   `error`
    -   `info`

#### error code
-   error code below shown the message error 

```js
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
```

```js
const MESSAGES = {
    PROGRAM_ERROR: ()=>({
        message:'Error in the code',
        code:CODE.CODE_ERROR,
        type:'error'
    }),
    NOT_FOUND:mopedId =>({
        message:`No Mope is found with mopedId ${mopedId}`,
        code: CODES.NOT_FOUND,
        type:'error'
    }),
    INSERT_OK: mopedId =>({
        message:` New mope with mopedId${mopedId} was inserted`,
        code: CODES.INSERT_OK,
        type:'info'
    }),

    NOT_INSERTED: ()=>({
        message:'New Mope was not inserted',
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
        message:` Mope with mopedId ${mopedId} was updated`,
        code: CODES.UPDATE_OK,
        type:'info'
    }),

    NOT_UPDATED: () =>({
        message:'Moped data was not updated',
        code: CODES.NOT_UPDATED,
        type:'error'
    }),
}
```




way to write the code programme
1. json file
2. readAndWrite.js
3. is better to create mopedAdaptor for easy access
4. MopeFunctionLayer.js
5. statusCode
6. MopedStorageLayer



