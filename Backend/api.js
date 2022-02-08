import axios from 'axios';

const cors = "https://cors-anywhere.herokuapp.com/";
const api = "j6GG3K6qwgIU81svYCeKSX9RaPnYeWFI9o9jr2gbhXC8jgqR-jjh1BCI12qhLu0-qZltvNSe0L1opsLOdiPUshxeWfN9UGlmWzM4J24quo02q80-YT0M8u0P_ehVYHYx"

const instance = axios.create({
    baseURL: `${cors}https://api.yelp.com/v3/`,
    headers: {
        Authorization: `Bearer ${api}`,
    }
})

const getBusiness = () => {
    return instance.get("/businesses/search", {
        params: {
            location: "Houston",
        }
    })
}

export { getBusiness };
