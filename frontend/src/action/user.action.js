import {UserService} from '../Services/user.service'
import {LOGIN,ERROR} from '../action/type'


const login = (data) => {
   return UserService.login(data).then((user)=>{
       return {
           type:LOGIN,
           payload:user.data.data
       }
   }).catch((err) => {
        return {
            type:ERROR,
            payload:err.response.data
        }
   })
}

export const UserAction = {
login
}
