import axios from 'axios'


const ProtectedAxios = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });


// Before making request, do the following
// ProtectedAxios.interceptors.request.use(
//     (config) => {
//         const token = JSON.parse(localStorage.getItem("userData")).accessToken;
//         console.log('intercepted localAccessToken- ', token);
//         if (token) {
//             config.headers["authorization"] = 'Bearer ' + token;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// With response data, do the following
// ProtectedAxios.interceptors.response.use(
//     (res) => {
//         return res;
//     },
//     async (err) => {
//         console.log('in err block of interceptor')
//         const originalConfig = err.config;

//         if (err.response) {
//             console.log('in err response of interceptor')

//             // access token expired
//             if (err.response.status === 403 && !originalConfig._retry) {
//                 console.log('err.response.status === 403')
//                 // handle infinite loop
//                 originalConfig._retry = true;

//                 const myRefreshToken = JSON.parse(localStorage.getItem("userData")).refreshToken;

//                 try {
//                     console.log('in try')
//                     axios.post("/auth/getToken", {
//                         refreshToken: myRefreshToken
//                     })
//                         .then(res => {
//                             if (res.status === 200) {
//                                 console.log('successfully fetched new access token')
//                                 localStorage.setItem("userData",
//                                     JSON.stringify(
//                                         {
//                                             accessToken: res.data.accessToken,
//                                             refreshToken: myRefreshToken
//                                         }
//                                     )
//                                 )

//                             }
//                         })
//                         .catch(err => {
//                             console.log('refresh token expired')
//                             localStorage.removeItem("userData");
//                             window.location.replace('/')

//                         })
//                         .finally(() => {
//                             return ProtectedAxios(originalConfig);
//                         })



//                 } catch (_error) {
//                     return Promise.reject(_error);
//                 }
//             }

//             // refresh token expired
//         }

//         return Promise.reject(err);
//     }
// );


export default ProtectedAxios;