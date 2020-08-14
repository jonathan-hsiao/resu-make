
const getBaseApiUrl = () => {
    // const url = process.env.REACT_APP_BASE_API_URL;
    const url = "/api"
    return url;
};

const getServerApiUrl = () => {
    // const url = process.env.REACT_APP_BASE_API_URL;
    const url = "http://localhost:5000/api"
    return url;
};

const callFetchAsync = async (url, method, body, headers = {}) => {
    try {
        const options = {
            headers: new Headers({
                "Content-Type": "application/json",
                ...headers
            }),
            body
        }

        if (body) {
            options.body = JSON.stringify(body);
        }
        
        const response = await fetch(`${getBaseApiUrl()}${url}`, {
            method,
            credentials: "same-origin",
            ...options
        });

        return await response.json();
    } catch (err) {
        return {
            success: false,
            data: err
        }
    }
};

const postAsync = (url, body) => {
    return callFetchAsync(url, "POST", body);
};

const getAsync = (url, body) => {
    return callFetchAsync(url, "GET", body);
};

module.exports = {
    getServerApiUrl,
    postAsync,
    getAsync
};