'use strict'

const asyncWrapper = require('../api-kit/asyncWrapper')
const {sendSuccess, sendCreated, sendNoContent} = require('../api-kit/responseEnvelope')
const ApiError = require('../guard-kit/errorClasser')
const Example = require('./resourceSchema')

// GET /api/v1/
const getAllRecords = asyncWrapper(async(req,res)=>{
    const example = await Example.find({})
   sendSuccess(res,example, 200,)
})

// POST /api/v1/:id
const createRecord = asyncWrapper(async(req,res)=>{
    //Remember. Example /= example. You use Example for the schema, example for the record. 
    //Only mind it if you name your own resource similiarily
    const example = await Example.create({ 
        ...pickWritableFields(req.body),
        ownerId: req.user._id
        //using the mongodb id --> _id
    })
    sendCreated(res, example)
})

// GET /api/v1/:id
const getOneRecord = asyncWrapper(async(req,res)=>{
    const example = await Example.findById(req.params.id)
    if(!example) throw ApiError.notFound('Example resource not Found')
    sendSuccess(res, example)
})

// DELETE /api/v1/:id
const deleteRecord = asyncWrapper(async(req,res)=>{
    const example = await Example.findByIdAndDelete(req.params.id)
    if(!example) throw ApiError.notFound('Example resource not Found')
    sendNoContent(res);
})

// PUT & PATCH /api/v1/:id
const updateRecord = asyncWrapper(async(req,res)=>{
    const example = await Example.findByIdAndUpdate(req.params.id, req.body, {
        new:true, runValidators:true
    })
    if(!example) throw ApiError.notFound('Example not Found')
    sendSuccess(res, example)
})

module.exports = {getAllRecords, getOneRecord, updateRecord, deleteRecord, createRecord}