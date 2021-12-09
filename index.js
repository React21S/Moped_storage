'use strict';

const http = require('http');
const path = require('path');

const express = require('express');
const app = express();

// For local hosting
const port= 3000;
const host='localhost';

// For getting statusPage
const {sendErrorPage,sendStatusPage}=require('./FemiJsonStorage/statusPage');


const DataStorage = require(path.join(__dirname, '/FemiJsonStorage', './MopedStorageLayer.js'));

const dataStorage = new DataStorage();
const server = http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));



app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'styles')));

const indexPath = path.join(__dirname, 'index.html');

app.get('/', (req, res)=>res.sendFile(indexPath));

// To get all data in the json file for all Mopeds
app.get('/all', (req,res)=>dataStorage.getAll().then(data=>res.render('allMopeds',{result:data})));


///////////////////////////////////////////////////////////////////////////////////////////////////////
// #### Beginning of code to get a mope  from storage ####
// To get one mope
app.get('/getMoped', (req,res)=>res.render('getMoped',{
    title:'Get Moped from store',
    header:'Get moped from store',
    action:'/getMoped',
}));

// To View result of mope after getting the mope (post)
app.post('/getMoped', (req,res)=>{
    if(!req.body) res.sendStatus(500);
    const mopeId = req.body.mopedId
    dataStorage.getOne(mopeId).then(mope=>res.render('mopedPage',{result:mope})) 
    .catch(error=>sendErrorPage(res,error));
})


///////////////////////////////////////////////////////////////////////////////////////////////////////
// #### Beginning of Form to insert new mope and post to database ###
// To input new mope into database or storage 
app.get('/inputForm', (req, res)=>res.render('formInformation', {
    title:'Insert a moped',
    header:'Add new moped to storage',
    action:'/insert',
    mopedId:{value:'', readonly:''},
    name:{value:'', readonly:''},
    rating:{value:'', readonly:''},
    topspeed:{value:'', readonly:''},
    modelYear:{value:'', readonly:''}
}));


// For posting  new input mope into database or storage 
app.post('/insert', (req,res)=>{
    if(!req.body)res.sendStatus(500);
    dataStorage.insert(req.body).then(status=>sendStatusPage(res,status))
    .catch(error=>sendErrorPage(res,error));
})


////////////////////////////////////////////////////////////////////////////////////////////////////////
// #### For updating mopeds inside database or json file ###
// To update database or storage 
app.get('/updateMopedForm', (req, res)=>res.render('formInformation', {
    title:'Update ',
    header:'Insert mopedId for update',
    action:'/updateMoped',
    mopedId:{value:'', readonly:''},
    name:{value:'', readonly:'readonly'},
    rating:{value:'', readonly:'readonly'},
    topspeed:{value:'', readonly:'readonly'},
    modelYear:{value:'', readonly:'readonly'}

}));

app.post('/updateMoped', (req,res)=>{
    if(!req.body) res.sendStatus(500);
    dataStorage.getOne(req.body.mopedId).then(mope=>res.render('formInformation',{
        title:'Update ',
        header:'Update ',
        action:'/update',
        mopedId:{value:mope.mopedId, readonly:'readonly'},
        name:{value:mope.name, readonly:''},
        rating:{value:mope.rating, readonly:''},
        topspeed:{value:mope.topspeed, readonly:''},
        modelYear:{value:mope.modelYear, readonly:''}
    }))
    .catch(error=>sendErrorPage(res,error))
})


app.post('/update', (req,res)=>{
    if(!req.body)res.sendStatus(500);
    dataStorage.update(req.body).then(status=>sendStatusPage(res,status))
    .catch(error=>sendErrorPage(res,error));
})

///////////////////////////////////////////////////////////////////////////////////////////////////////
// To remove mope from database or storage
app.get('/removeMoped', (req,res)=>res.render('getMoped', {
    title:'Remove',
    header:'Remove a moped from mope storage',
    action:'/remove',
}));

app.post('/remove', (req,res)=>{
    if(!req.body) res.sendStatus(500);
    const mopedId =req.body.mopedId;
    dataStorage.remove(mopedId)
    .then(status=>sendStatusPage(res,status))
    .catch(error=>sendErrorPage(res,error));
});

server.listen(port, host, ()=>console.log(`Server is running on ${host}:${port}`));