const AUTH = Object.freeze({
    SALT_ROUNDS:10,
    DEFAULT_JWT_EXPIRES_IN:'7d',
    BEARER_PREFIX:'Bearer'
})
const ROLES = Object.freeze({USER:'user', ADMIN:'admin'})
const ROLE_VALUES = Object.freeze(Object.values(ROLES))