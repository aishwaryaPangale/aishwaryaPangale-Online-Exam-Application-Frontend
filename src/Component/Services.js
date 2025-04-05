import axios from "axios";
let saveUser = "http://localhost:8080/addUser"
class Services{
    addUser(user){
        return axios.post(saveUser,user);
    }
}
export default new Services();