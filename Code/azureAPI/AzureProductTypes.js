const productTypeMainPath = "productType";

function TryGetAllProductTypes() {
    SendGetRequest(productTypeMainPath).then(productTypes => {
        window.outputElement.innerHTML = GenerateProductTypeTable(productTypes);
        window.lastCachedProductTypes = productTypes;
    })
}

function GenerateProductTypeTable(productList) {
    let outputValue = `
    <table class="api-output-table">
        <tr>
        <th>Name</th>
        </tr> `;

    productList.forEach(entry => {
        outputValue += GenerateProductTypeEntry(entry);
    });

    outputValue += `</table>`;
    return outputValue;
}

function GenerateProductTypeEntry(productType) {
    return `<tr> 
        <td>${productType.name}</td> 
    </tr>`;
}

function GenerateAddProductTypeHTML() {
    window.inputForm.innerHTML =
        `<form  onsubmit="HandleProductTypeAddRequest(event)">
            <input type="text" name="name" placeholder="Product type name"><br>
            <input type="submit" value="Submit">
        </form>`;
}

function HandleProductTypeAddRequest(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    TryAddProductType(JSON.stringify({name: data.name}));
}

function TryAddProductType(productType) {
    SendPostRequest(productTypeMainPath, productType).then(response => {
        EmptyInputFormHTML();
        if (response.ok) {
            UpdateCachedProductTypes();
        }
    });
}

function GenerateDeleteProductTypeHTML() {
    productTypeSelect = GenerateSelectHTML(window.lastCachedProductTypes, "id");
    window.inputForm.innerHTML =
        `<form  onsubmit="HandleProductTypeDeleteRequest(event)">
            ` + productTypeSelect +
        `<input type="submit" value="Submit">
        </form>`;
}

function HandleProductTypeDeleteRequest(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    TryDeleteProductType(Number(data.id));
}

function TryDeleteProductType(id) {
    SendDeleteRequest(productTypeMainPath + "/" + id).then(response => {
        EmptyInputFormHTML();
        if (response.ok) {
            UpdateCachedProductTypes();
        }else {
            window.outputElement.innerHTML = response.data;
        }
    });
}

