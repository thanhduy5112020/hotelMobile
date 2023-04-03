import ApiManager from "./ApiManager";

export const get_hotels = async data => {
    try {
        const result = await ApiManager("/hotels")
        return result
    } catch (error) {
        return error.response.data
    }
}