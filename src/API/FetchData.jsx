import axios from "axios";


const baseURL = "https://restcountries.com/v3.1/all"

export default class FetchData {


    static async getAllCountries() {
        const response = await axios.get(baseURL, {
        })
        return response.data
    }

    static async getByNameRegionArea() {
        const response = await axios.get(`${baseURL}?fields=name,region,capital,area,flags,currencies,population,timezones,languages`)
        return response.data
    }
}