'use strict';

function sendErrorPage(res, error, title='Error', header='Error'){
    sendStatusPage(res,error, title, header);
}

function sendStatusPage(res, status, title='Status', header='Status'){
    return res.render('statusPage', {title, header, status});
}

module.exports={sendErrorPage,sendStatusPage};