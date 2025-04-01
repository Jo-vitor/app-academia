import axios from "axios";

const KEY = process.env.API_KEY;

export const api = axios.create({
    baseURL: 'https://exercisedb.p.rapidapi.com/exercises',
    headers: {
        'x-rapidapi-key': KEY,
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
    }
});