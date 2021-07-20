import http from '../common/http-common'
const create = async (data) => {
    let token =  localStorage.getItem('token')
    return http.post('/posts/create',data,{ headers: {"Authorization" : `${token}`,'Content-Type': 'application/json'} })
}

const getPosts = async () => {
    let token =  localStorage.getItem('token')
   return http.get('/posts',{ headers: {"Authorization" : `${token}`} })
}

export const PostsService = {
    create,
    getPosts
}
