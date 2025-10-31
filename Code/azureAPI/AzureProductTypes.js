function TryGetAllProductTypes() {
    SendGetRequest("productType").then(productTypes => {
        window.outputElement.innerHTML = GenerateProductTypeTable(productTypes);
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


function TryAddProductType(name) {

}

function TryDeleteProductType(id) {

}

