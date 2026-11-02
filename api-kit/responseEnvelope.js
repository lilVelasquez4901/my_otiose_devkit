'use strict'

function sendSuccess(res,data,statusCode = 200, extra={}){
    return res.status(statusCode).json({success:true, data, ...extra})
}
//When ever a record is created
function sendCreated(res,data){
    return sendSuccess(res,data,201)
}
//If there is an empty body
function sendNoContent(res){
    return res.status(204).send()
}

module.exports = {sendSuccess, sendCreated, sendNoContent}