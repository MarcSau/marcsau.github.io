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
            let outputValue = "";
            console.log("data received")
            value.forEach(element => {
                outputValue += GenerateProductText(element);
                outputValue += "\r\n"
                console.log(element.name)
            });
            outputElement.innerHTML = outputValue;
      })
        .catch(error => {
            console.error('Error:', error);
        });
}

function GenerateHTMLTable(productList){
    
}

function GenerateProductText(product){
    return product.name + " " + product.price + " " + product.currentStock + " " + product.productType;
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