import axios from "axios";


const baseURL = "https://restcountries.com/v2/all"

export default class FetchData {


    static async getAllCountries(limit = 24, page = 1) {
        const response = await axios.get(baseURL, {
            params: {
                _limit: limit,
                _page: page
            }
        })
        return response.data
    }

    static async getByNameRegionArea() {
        const response = await axios.get(`${baseURL}?fields=name,region,area,flag`)
        return response.data
    }
}