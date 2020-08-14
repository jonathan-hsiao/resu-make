
const getBaseApiUrl = async () => {
    try {
        const response = await fetch("/getBaseApiUrl", {
            method: "GET",
            credentials: "same-origin",
        });
        return await response.json();
    } catch (err) {
        return {
            success: false,
            data: err
        }
    }
};

const getServerApiUrl = async () => {
    try {
        const response = await fetch("/getServerApiUrl", {
            method: "GET",
            credentials: "same-origin",
        });
        return await response.json();
    } catch (err) {
        return {
            success: false,
            data: err
        }
    }
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

        const { data: apiUrl } = await getBaseApiUrl();
        
        const response = await fetch(`${apiUrl}${url}`, {
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