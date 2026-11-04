'use strict'

const {PAGINATION, SORTABLE_FIELDS, DEFAULT_SORT, RATINGS} = require('./storage')
const ApiError = require('../guard-kit/errorClasser')
function parsePagination(query={}){
    const rawPage = Number.parseInt(query.page, 10)
    const rawLimit = Number.parseInt(query.limit, 10)
    const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage: PAGINATION.DEFAULT_PAGE

    let limit = Number.isInteger(rawLimit) && rawLimit > 0 ? rawLimit: PAGINATION.DEFAULT_LIMIT
    if(limit > PAGINATION.MAX_LIMIT) limit = PAGINATION.MAX_LIMIT
    return {page, limit, skip: (page - 1) * limit}
}

function parseSort(sortParam){
    if (!sortParam || typeof sortParam !== 'string') return {...DEFAULT_SORT}

    const sort = {}

    for(const rawField of sortParam.split(',')){
        const field = rawField.trim()
        if(!field) continue

        const descending = field.startsWith('-')
        const name = descending ? field.slice(1) : field

        if(!SORTABLE_FIELDS.includes(name)){
            throw ApiError.badrequest(`Cannot sort by ${name}. Sortable Fields: ${SORTABLE_FIELDS.join(', ')}`)
        }

        sort[name] = descendin ? -1 : 1
    }
    return Object.keys(sort).length > 0 ? sort : {...DEFAULT_SORT}
}

function buildMeta({page, limit, total}){
    const totalPages = limit > 0 ? Math.ceil(total / limit) : 0

    return{
        page, limit, total, totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
    }
}
function escapeRegex(text){
    return String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function buildPlantFilter(query={}){
    const filter = {}

    if(query.status){
        if(!RATINGS.includes(query.status)){
            throw ApiError.badrequest(`'${query.rating}' is not a supported rating. Valid: ${RATINGS.join(', ')}`)
        }
        filter.status = query.status
    }
    if(query.q){
        const pattern = new RegExp(escapeRegex(String(query.q).trim()), 'i')
        filter.$or = [{name:pattern},{description:pattern}]
    }
    return filter
}
module.exports = {parsePagination, parseSort, buildMeta, buildPlantFilter, escapeRegex}