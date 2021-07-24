import {UserService} from '../Services/user.service'
import {LOGIN,ERROR} from '../action/type'


const login = (data) => {
   return UserService.login(data).then((user)=>{
       return {
           type:LOGIN,
           payload:user.data.data
       }
   }).catch((err) => {
       console.log('====================================');
       console.log(err);
       console.log('====================================');
        return {
            type:ERROR,
            payload:err
        }
   })
}

export const UserAction = {
login
}
