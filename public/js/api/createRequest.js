/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    const formData = new FormData;
    xhr.responseType = 'json';
    const urlOptions = options.url;
    const arrayFromObj = Object.entries(options.data);

    if(options.method === 'GET') {
        urlOptions += '?'
        arrayFromObj.forEach((key, value) => {
            urlOptions + `${key}=${value}`
        })
    } else {
        arrayFromObj.forEach((key, value) => {
            formData.append(key, value)
        })
    }

    xhr.onload(() => {
        options.callback(null, xhr.response)
    })

    xhr.open(options.method, urlOptions);
    xhr.send(formData)
};
