function TryGetAllProducts() {
    SendGetRequest("product").then(products => {
        window.outputElement.innerHTML = GenerateProductTable(products);
    })
}

function GenerateProductTable(productList) {
    let outputValue = `
    <table class="api-output-table">
        <tr>
        <th >Name</th>
        <th>Price ($)</th>
        <th>Stock</th>
        <th>Type</th>
        </tr> `;

    productList.forEach(entry => {
        outputValue += GenerateProductEntry(entry);
    });

    outputValue += `</table>`;
    return outputValue;
}

function GenerateProductEntry(product) {

    return `<tr> 
        <td>${product.name}</td> 
        <td>${product.price}</td> 
        <td>${product.currentStock}</td> 
        <td>${product.productType}</td>
    </tr>`;
}


function TryAddProduct(product) {

}

function TryDeleteProduct(id) {

}