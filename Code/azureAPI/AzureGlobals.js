window.API_URL = "https://app-storebackend-dev-westeu-01-bmf5hggkhdakhzbx.westeurope-01.azurewebsites.net/";
window.Request_URL = "";
window.outputElement = document.getElementById("output-textbox");

function SendGetRequest(path) {
    window.Request_URL = window.API_URL + path;

    return fetch(window.Request_URL)
        .then(response => {
            if (!response.ok) {
                return [];
            }

            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}