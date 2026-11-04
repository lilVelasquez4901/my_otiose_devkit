const AUTH = Object.freeze({
    SALT_ROUNDS:10,
    DEFAULT_JWT_EXPIRES_IN:'7d',
    BEARER_PREFIX:'Bearer'
})
const ROLES = Object.freeze({USER:'user', ADMIN:'admin'})
const ROLE_VALUES = Object.freeze(Object.values(ROLES))
const DEFAULT_SORT = Object.freeze({createdAt: -1})
const PAGINATION = Object.freeze({
    DEFAULT_PAGE:1, DEFAULT_LIMIT:20, MAX_LIMIT:100
})

module.exports = {AUTH, ROLES, ROLE_VALUES, RATINGS, DEFAULT_SORT, PAGINATION, SORTABLE_FIELDS}