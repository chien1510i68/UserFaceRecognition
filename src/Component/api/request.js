import axios from "axios";
axios.interceptors.request.use((req) => {
    const newUrl = "http://localhost:8000/" + req.url
        return{
            ...req,
            url: newUrl,
            headers: {
                ...req.headers,
                'ngrok-skip-browser-warning': '1'
            }
        }
    })

   


// console.log(Cookies.ge);

// Sau khi có response trả về
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default axios;





