'use strict'

const express = require('express')
const resourceController = require('../db-kit/repository')
//This line below will be your verifier, you should only use this on requests that have permanent effects.
//Such as creation of a record or deletion, not on Get requests that do nothing after.
const {authValidator} = require('../guard-kit/validator')

const router = express.Router()

router
    .route('/') //Change this to be the path they need to do the request, it makes for easier shorthands
        .get(resourceController.getAllRecords)
        .post(authValidator, resourceController.createRecord)

router
    .route('/:id') //Such as this being the path to get the specific record needed for the request
        .get(resourceController.getOneRecord)
        .put(authValidator, resourceController.updateRecord)
        .patch(authValidator, resourceController.updateRecord)
        .delete(authValidator, resourceController.deleteRecord)

module.exports = router