'use strict'

const asyncWrapper = require('../api-kit/asyncWrapper')
const {sendSuccess, sendCreated, sendNoContent} = require('../api-kit/responseEnvelope')
const ApiError = require('../guard-kit/errorClasser')
const Book = require('./resourceSchema')

const WRITABLE_FIELDS = ['name', 'author', 'year']
//These are fields you'll allow users to change, ownerId is one of the few you should NOT allow them to change

// GET /api/v1/
const getAllRecords = asyncWrapper(async(req,res)=>{
    const filter = buildBookFilter(req.query)
    const sort = parseSort(req.query.sort)
    const {page, limit, skip} = parsePagination(req.query)

    const [Book, total] = await Promise.all([
        Book.find(filter).sort(sort).skip(skip).limit(limit),
        Book.countDocuments(filter)
    ])
   sendSuccess(res,book, 200, {meta: buildMeta({page, limit, total})})
})

// POST /api/v1/:id
const createRecord = asyncWrapper(async(req,res)=>{
    //Remember. Book /= book. You use Book for the schema, book for the record. 
    //Only mind it if you name your own resource similiarily
    const book = await Book.create({ 
        ...pickWritableFields(req.body),
        ownerId: req.user._id
        //using the mongodb id --> _id
    })
    sendCreated(res, book)
})

// GET /api/v1/plants/:id
const getOneRecord = asyncWrapper(async(req,res)=>{
    const book = await Book.findById(req.params.id)
    if(!book) throw ApiError.notFound('Book not Found')
    sendSuccess(res, book)
})

// DELETE /api/v1/:id
const deleteRecord = asyncWrapper(async(req,res)=>{
    const book = await Book.findByIdAndDelete(req.params.id)
    if(!book) throw ApiError.notFound('Book not Found')
    sendNoContent(res);
})

// PUT & PATCH /api/v1/:id
const updateRecord = asyncWrapper(async(req,res)=>{
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new:true, runValidators:true
    })
    if(!book) throw ApiError.notFound('Book not Found')
    sendSuccess(res, book)
})

module.exports = {getAllRecords, getOneRecord, updateRecord, deleteRecord, createRecord}