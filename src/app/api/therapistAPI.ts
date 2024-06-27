import axios from "axios";

export class TherapistAPI {

    static async getTherapists(token:string,queryParams:string="") {
        const response = await axios.get(`${process.env.THERAPISTS_BASE_URL}/therapists${queryParams? `?${queryParams}` : ""}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data
    }

    static async getTherapist(token:string, username:string) {
        const response = await axios.get(`${process.env.THERAPISTS_BASE_URL}/therapists/profile/${username}`, {
            headers: {
                Authorization: `Bearer ${token}`
            } 
        })
        return response.data
    }
}