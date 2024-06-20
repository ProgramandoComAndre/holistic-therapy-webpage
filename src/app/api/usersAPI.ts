import axios from "axios";

export class UsersAPI {

    static async getUsers(token:string,queryParams:string="") {
        const response = await axios.get(`http://127.0.0.1:3001/users${queryParams? `?${queryParams}` : ""}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data
    }

    static async deactivateUser(token:string, username:string) {

    
        const response = await axios.patch(`http://127.0.0.1:3001/users/profile/disable/${username}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(response)

        if(response.status === 200) {
            console.log(response.data)
            return {success: true, message: "User deactivated successfully"}
        }

        
        return {sucess: false, message: response.data.message}
    }
}