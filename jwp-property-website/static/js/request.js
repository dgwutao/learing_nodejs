import {} from "../lib/axios.js"

export const axios$ = axios.create({
                timeout: 1000,
                header: { 
                    'Content-Type': 'application/json' 
                },
                withCredentials: false
            });
            
axios$.interceptors.request.use(function (config) {
                
                return config;
            }, function (error) {
        
                return Promise.reject(error);
            });

axios$.interceptors.response.use(function (response) {

                return response.data;
            }, function (error) {

                return Promise.reject(error);
            });


export function test(){
    console.log("from test of requestjs")
    const map = {
        test:''
    }
}

