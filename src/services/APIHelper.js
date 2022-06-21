import axios from "axios";

const API_URL = "https://depression-final-sber.herokuapp.com";
//const API_URL = "https://depression-sber.herokuapp.com";
//const API_URL = "https://depression-backend.vercel.app";
//const API_URL = "http://localhost:3000";

async function getScene(nextId) {
    const obj = await axios.get(`${API_URL}/nodes/${nextId}`);
    return obj;
}

export default getScene;
export { API_URL };