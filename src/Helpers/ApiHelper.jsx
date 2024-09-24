import { BACKEND_URL } from "../index";

const accessToken = sessionStorage.getItem('access_token');
const refreshToken = localStorage.getItem('refresh_token');

const refresh = async () => {
    console.log('Refreshing token');
    try {
        const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || response.statusText);
        }
        const data = await response.json();
        sessionStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.new_refresh_token);
        return data.access_token;
    } catch (error) {
        console.log('Refresh request failed', error.message);
        return error.message;
    }
}

const ApiHelper = {

    get: async (endpoint) => {
        try {
            const response = await fetch(`${BACKEND_URL}${endpoint}`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json",
                    "Authorization":"Bearer "+ accessToken
                }
            });
            if (!response.ok) {
                if ( response.status === 401 ) {
                    const newToken = await refresh();
                    if (newToken) {
                        return fetch(`${BACKEND_URL}${endpoint}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + newToken,
                            }
                        });
                    }
                }
                const errorData = await response.json();
                throw new Error(errorData.error || response.statusText);
            }
            return await response.json();
        } catch (error) {
            console.log('GET request failed', error.message);
            return error.message;
        }
    },

    post: async (endpoint, data) => {
        try {
            const response = await fetch(`${BACKEND_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                if ( response.status === 401 ) {
                    const newToken = await refresh();
                    if (newToken) {
                        return fetch(`${BACKEND_URL}${endpoint}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + newToken,
                            },
                            body: JSON.stringify(data),
                        });
                    }
                }
                const errorData = await response.json();
                throw new Error(errorData.error || response.statusText);
            }
            return await response.json();
        } catch (error) {
            console.log('POST request failed', error.message);
            return error.message;
        }
    },

    put: async (endpoint, data) => {
        try {
            const response = await fetch(`${BACKEND_URL}${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                if ( response.status === 401 ) {
                    const newToken = await refresh();
                    if (newToken) {
                        return fetch(`${BACKEND_URL}${endpoint}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + newToken,
                            },
                            body: JSON.stringify(data),
                        });
                    }
                }
                const errorData = await response.json();
                throw new Error(errorData.error || response.statusText);
            }
            return await response.json();
        } catch (error) {
            console.log('PUT request failed', error.message);
            return error.message;
        }
    },

    delete: async (endpoint) => {
        try {
            const response = await fetch(`${BACKEND_URL}${endpoint}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                if ( response.status === 401 ) {
                    const newToken = await refresh();
                    if (newToken) {
                        return fetch(`${BACKEND_URL}${endpoint}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + newToken,
                            }
                        });
                    }
                }
                const errorData = await response.json();
                throw new Error(errorData.error || response.statusText);
            }
            return await response.json();
        } catch (error) {
            console.log('DELETE request failed', error.message);
            return error.message;
        }
    },

    fullApi: async (endpoint, method, data) => {
        try {
            const response = await fetch(`${BACKEND_URL}${endpoint}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                if ( response.status === 401 ) {
                    const newToken = await refresh();
                    if (newToken) {
                        return fetch(`${BACKEND_URL}${endpoint}`, {
                            method: method,
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + newToken,
                            },
                            body: JSON.stringify(data),
                        });
                    }
                }
                const errorData = await response.json();
                throw new Error(errorData.error || response.statusText);
            }
            return response;
        } catch (error) {
            console.log('Full API request failed', error.message);
            return error.message;
        }
    }
};

export default ApiHelper;