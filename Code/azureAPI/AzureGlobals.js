window.API_URL = "https://app-storebackend-dev-westeu-01-bmf5hggkhdakhzbx.westeurope-01.azurewebsites.net/";
window.outputElement = document.getElementById("output-textbox");
window.inputForm = document.getElementById("input-form");
window.requestFlag = false;
window.lastCachedProducts;
window.lastCachedProductTypes;

RequestInitialValues();

function RequestInitialValues() {
    UpdateCachedProducts();
    UpdateCachedProductTypes();
}

function SendGetRequest(path) {
    let request_URL = window.API_URL + path;
    return fetch(request_URL)
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

function SendPostRequest(path, body) {
    let request_URL = window.API_URL + path;

    return fetch(request_URL, {
        method: "POST",
        body: body,
        headers: { "Content-Type": "application/json" },
    })
    .then(async response => 
    {
        let data = null;
        try {
            data = await response.json();
        } catch (e) {
            console.warn("No JSON body found:", e);
        }

        return { ok: response.ok, status: response.status, data };
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function SendDeleteRequest(path) {
    let request_URL = window.API_URL + path;

    return fetch(request_URL, {
        method: "DELETE"
    })
    .then(async response => {
        let data = null;
        try {
            data = await response.json();
        } catch (e) {
            console.warn("No JSON body found:", e);
        }

        return { ok: response.ok, status: response.status, data };
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function EmptyInputFormHTML(){
    window.inputForm.innerHTML = "";
}

function GenerateSelectHTML(values, name) {
    let output = `<select name="${name}" required>`;

    values.forEach(element => {
        output += `<option value="${element.id}">${element.name}</option>`
    });

    output += `</select><br>`;
    return output;
}

function UpdateCachedProducts() {
    SendGetRequest("productType").then(productTypes => {
        window.lastCachedProductTypes = productTypes;
    })
}

function UpdateCachedProductTypes() {
    SendGetRequest("product").then(products => {
        window.lastCachedProducts = products;
    })
}