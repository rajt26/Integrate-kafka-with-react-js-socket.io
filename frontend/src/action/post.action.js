import {PostsService} from '../Services/posts.service'
import {CREATEPOST,GETPOST} from '../action/type'


const createPost = (data) => {
   return PostsService.create(data).then((post)=>{
       return {
           type:CREATEPOST,
           post
       }
   })
}
const getPosts = () => {
    return PostsService.getPosts().then((posts)=>{
        return {
            type:GETPOST,
            posts
        }
    })
 }
export const PostAction = {
    createPost,
    getPosts
}