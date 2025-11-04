function TryGetAllTransactions() {
    SendGetRequest("transaction").then(transactions => {
        window.outputElement.innerHTML = GenerateProductTable(transactions);
    })
}

function GenerateTransactionsTable(productList) {
    let outputValue = `
    <table class="api-output-table">
        <tr>
        <th>Product</th>
        <th>Amount</th>
        <th>Price($)</th>
        <th>Date</th>
        </tr> `;

    productList.forEach(entry => {
        outputValue += GenerateProductEntry(entry);
    });

    outputValue += `</table>`;
    return outputValue;
}

function GenerateTransactionEntry(product) {

    return `<tr> 
        <td>${product.productId}</td> 
        <td>${product.amount}</td> 
        <td>${product.price}</td> 
        <td>${product.date}</td>
    </tr>`;
}

function TryPurchaseProduct(id, amount) {

}