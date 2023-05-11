export const makePostRequest = (url, body, headers) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((res) => {
                if (!res) {
                    reject({
                        error: true,
                        errorMessage: 'An unexpected error occurred',
                        data: null,
                    });
                } else if (res.error) {
                    reject(res);
                } else {
                    resolve(res);
                }
            })
            .catch((err) => {
                reject({
                    error: true,
                    errorMessage: 'Unable to reach server',
                    data: null,
                });
            });
    }).catch((err) => {
        return returnErrorMessage(err.errorMessage);
    });
};

export const makeGetRequest = (url, headers) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                if (!res) {
                    reject({
                        error: true,
                        errorMessage: 'An unexpected error occurred',
                        data: null,
                    });
                } else if (res.error) {
                    reject(res);
                } else {
                    resolve(res);
                }
            })
            .catch((err) => {
                reject({
                    error: true,
                    errorMessage: 'Unable to reach server',
                    data: null,
                });
            });
    }).catch((err) => {
        return returnErrorMessage(err.errorMessage);
    });
};

// export const makePostRequest = async (url, body, headers) => {
//     try{
//         const res = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 ...headers,
//             },
//             body: JSON.stringify(body),
//         })
//         const data = await res.json()
//         if (!data){
//             returnErrorMessage()
//         }
//         else if (data.error){
//             returnErrorMessage()
//         }
//         return data

//     } catch (error){
//         console.error(error)
//         returnErrorMessage()
//         }

// .then((res) => res.json())
// .then((res) => {
//     if (!res) {
//         return {
//             error: true,
//             errorMessage: 'An unexpected error occurred',
//             data: null,
//         }
//     } else if (res.error) {
//         return res
//     }
//     else{
//         return res
//     }
// })
// .catch((err) => {
//     console.error("unhbanled error", err)
// });
// };

const returnErrorMessage = (message) => {
    return {
        error: true,
        errorMessage: message,
        data: null,
    };
};
