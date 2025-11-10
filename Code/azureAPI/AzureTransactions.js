const transactionMainPath = "transaction";

function TryGetAllTransactions() {
    SendGetRequest(transactionMainPath).then(transactions => {
        window.outputElement.innerHTML = GenerateTransactionsTable(transactions);
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
        outputValue += GenerateTransactionEntry(entry);
    });

    outputValue += `</table>`;
    return outputValue;
}

function GenerateTransactionEntry(product) {
    let productName = lastCachedProducts.find((element) => element.id == product.productId);
    return `<tr> 
        <td>${productName.name}</td> 
        <td>${product.amount}</td> 
        <td>${product.price}</td> 
        <td>${product.date}</td>
    </tr>`;
}

function GeneratePurchaseProductTransactionHTML() {
    productSelect = GenerateSelectHTML(window.lastCachedProducts, "productId");
    window.inputForm.innerHTML =
        `<form  onsubmit="HandlePurchaseProductTransactionRequest(event)">` + 
        productSelect +
        `   <input type="number" name="amount" placeholder="Amount" required><br>
            <input type="number" name="price" placeholder="Price" step=".01" min="0" required><br>
            <input type="date" name="date" value="2025-01-01" min="2025-01-01"  max="2035-12-31" required><br>
            <input type="submit" value="Submit">
        </form>`;
}

function HandlePurchaseProductTransactionRequest(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    TryPurchaseProduct(GeneratePurchaseTransactionJSON(data));
}

function GeneratePurchaseTransactionJSON(data) {
    return JSON.stringify({
        productId: Number(data.productId),
        amount: Number(data.amount),
        price: Number(data.price),
        date: data.date
    });
}

function TryPurchaseProduct(data) {
    EmptyInputFormHTML();
    SendPostRequest(transactionMainPath,data).then(response => {
        if(response.ok){ 
            UpdateCachedProducts();
            window.outputElement.innerHTML = "";
        }else{
            window.outputElement.innerHTML = response.data;
        }
    });
}