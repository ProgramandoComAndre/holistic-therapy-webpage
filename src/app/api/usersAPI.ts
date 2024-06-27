import axios from "axios";

export class UsersAPI {

    static async getUsers(token:string,queryParams:any) {
        const response = await axios.get(`${process.env.AUTH_BASE_URL}/users?${new URLSearchParams(queryParams).toString()}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data
    }

    static async createUser(token:string, request:any) {
        const response = await axios.post(`${process.env.AUTH_BASE_URL}/users`, request, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    }

    static async getRoles() {
        const response = await axios.get(`${process.env.AUTH_BASE_URL}/users/roles`);
        console.log(response)
        return response.data
    }

    static async deactivateUser(token:string, username:string) {

    
        const response = await axios.patch(`${process.env.AUTH_BASE_URL}/users/profile/disable/${username}`, {}, {
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