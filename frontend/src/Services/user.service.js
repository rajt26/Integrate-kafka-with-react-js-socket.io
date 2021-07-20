import http from '../common/http-common'

const register = (data) => {
    return http.post('/user/create',data)
}

const login = (data) => {
    return http.post('/user/login',data)
}

export const UserService = {
register,
login
}
