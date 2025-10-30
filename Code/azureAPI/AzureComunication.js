let API_URL = "https://app-storebackend-dev-westeu-01-bmf5hggkhdakhzbx.westeurope-01.azurewebsites.net/";
let Request_URL = "";
let outputElement = document.getElementById("output-textbox");
let lastCachedProducts;

function RequestAllProducts() {

    Request_URL = API_URL + "product";

    fetch(Request_URL)
        .then(response => {
            if (!response.ok) {
                outputElement.innerHTML = response;
            }

            return response.json();
        })
      .then(value => {
            lastCachedProducts = value;
            outputElement.innerHTML = GenerateProductTable(value);
      })
        .catch(error => {
            console.error('Error:', error);
        });
}

function GenerateProductTable(productList){
    let outputValue = `
    <table class="api-output-table">
        <tr>
        <th >Name</th>
        <th>Price ($)</th>
        <th>Stock</th>
        <th>Type</th>
        </tr> `;

    productList.forEach( entry => {
        outputValue += GenerateProductEntry(entry);
    });

    outputValue += `</table>`; 
    return outputValue;
}

function GenerateProductEntry(product){
    
    return `<tr> 
        <td>${product.name}</td> 
        <td>${product.price}</td> 
        <td>${product.currentStock}</td> 
        <td>${product.productType}</td>
    </tr>`;
}

function RequestProduct(id) {

}

function TryAddProduct(product) {

}

function TryDeleteProduct(id) {

}

function RequestAllProductTypes() {

}

function TryAddProductType(name) {

}

function TryDeleteProductType(id) {

}

function RequestAllTransactions() {

}

function RequestAllTransactions() {

}

function RequestTransaction(id) {

}

function TryPurchaseProduct(id, amount) {

}