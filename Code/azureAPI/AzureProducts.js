const productMainPath = "product";

function TryGetAllProducts() {
    SendGetRequest(productMainPath).then(products => {
        window.outputElement.innerHTML = GenerateProductTable(products);
        window.lastCachedProducts = products;
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

function GenerateAddProductHTML() {
    productTypeSelect = GenerateSelectHTML(window.lastCachedProductTypes, "productType");
    window.inputForm.innerHTML =
        `<form  onsubmit="HandleProductAddRequest(event)">
            <input type="text" name="name" placeholder="Product name"><br>
            <input type="number" name="initialStock" placeholder="Initial Stock"><br>
            <input type="number"  name="price" placeholder="Price" step=".01" min="0"><br>
            ` + productTypeSelect +
        `<input type="submit" value="Submit">
        </form>`;
}

function HandleProductAddRequest(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    TryAddProduct(GenerateAddProductJSON(data.name, Number(data.initialStock), Number(data.price), Number(data.productType)));
}

function GenerateAddProductJSON(name, stock, price, type) {

    return JSON.stringify({
        name: name,
        initialStock: stock,
        price: price,
        productType: type
    });
}

function TryAddProduct(product) {

    SendPostRequest(productMainPath, product).then(response => {
        if (response.ok) {
            UpdateCachedProducts();
            EmptyInputFormHTML();
        }
    });
}

function GenerateDeleteProductHTML() {
    productSelect = GenerateSelectHTML(window.lastCachedProducts, "id");
    window.inputForm.innerHTML =
        `<form  onsubmit="HandleProductDeleteRequest(event)">
            ` + productSelect +
        `<input type="submit" value="Submit">
        </form>`;
}

function HandleProductDeleteRequest(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    TryDeleteProduct(Number(data.id));
}

function TryDeleteProduct(id) {
    SendDeleteRequest(productMainPath + "/" + id).then(response => {
        if (response.ok) {
            UpdateCachedProducts();
            EmptyInputFormHTML();
        }
    });
}