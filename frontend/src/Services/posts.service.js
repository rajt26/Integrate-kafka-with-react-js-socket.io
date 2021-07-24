import http from '../common/http-common'

// call apis
const create = async (data) => {
    let token =  localStorage.getItem('token')
    return http.post('/posts/create',data,{ headers: {"Authorization" : `${token}`,'Content-Type': 'application/json'} })
}

const getPosts = async () => {
    let token =  localStorage.getItem('token')
   return http.get('/posts',{ headers: {"Authorization" : `${token}`} })
}

const deletePosts = async (id) => {
    let token =  localStorage.getItem('token')
   return http.post('/posts/delete',{id},{ headers: {"Authorization" : `${token}`} })
}

const updatePost = async (data) => {
    let token =  localStorage.getItem('token')
    return http.put('/posts/update',data,{ headers: {"Authorization" : `${token}`} })
}
export const PostsService = {
    create,
    getPosts,
    deletePosts,
    updatePost
}
