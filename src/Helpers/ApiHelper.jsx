import { BACKEND_URL } from "../index";

const refresh = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
        return false;
    }
    try {
        console.log('Refreshing token');
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
        localStorage.setItem('access_token', data.new_access_token);
        localStorage.setItem('refresh_token', data.new_refresh_token);
        return data.new_access_token;
    } catch (error) {
        //console.log('Refresh request failed', error.message);
        return error.message;
    }
}

const ApiHelper = {

    get: async (endpoint) => {
        try {
            const response = await ApiHelper.fullApi(endpoint, 'GET');
            const result = await response.json();
            return result;
        } catch (error) {
            //console.log('GET request failed', error.message);
            return error.message;
        }
    },

    post: async (endpoint, data) => {
        try {
            const response = await ApiHelper.fullApi(endpoint, 'POST', data);
            const result = await response.json();
            return result;
        } catch (error) {
            //console.log('POST request failed', error.message);
            return error.message;
        }
    },

    put: async (endpoint, data) => {
        try {
            const response = await ApiHelper.fullApi(endpoint, 'PUT', data);
            const result = await response.json();
            return result;
        } catch (error) {
            //console.log('PUT request failed', error.message);
            return error.message;
        }
    },

    delete: async (endpoint) => {
        try {
            const response = await ApiHelper.fullApi(endpoint, 'DELETE');
            const result = await response.json();
            return result;
        } catch (error) {
            //console.log('DELETE request failed', error.message);
            return error.message;
        }
    },

    fullApi: async (endpoint, method, data, retry = true) => {
        const accessToken = localStorage.getItem('access_token');
        try {
            //console.log(method, endpoint);
            const response = await fetch(`${BACKEND_URL}${endpoint}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                if ( response.status === 401 ) {
                    const newToken = await refresh();
                    if (newToken && retry) {
                        return await ApiHelper.fullApi(endpoint, method, data, false);
                    }
                }
                const errorData = await response.json();
                throw new Error(errorData.error || response.statusText);
            }
            return response;
        } catch (error) {
            console.error('Errore API', error)
            return error;
        }
    }
};

export default ApiHelper;