import axios from "axios";

export default class APIService {
    axiosInstance;
    baseUrl = 'https://products.aspose.app';

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: this.baseUrl
        })
    }

    async axiosCall(config) {
        try {
            const { data } = await this.axiosInstance.request(config);
            return data;
        } catch (error) {
            alert(error.message);
        }
    }
    async getImage(query) {
        return this.axiosCall({method: "get", url:`/barcode/embed/${query}`, responseType: 'blob'})
    }
}

export const API = new APIService();