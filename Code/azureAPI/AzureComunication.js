var APIRequest =
{
    type: "GET",
    URL: "",
    JSON: '{"name":"BlueDabiDi","initialStock":20,"price":17.99,"productType":4}'
}

function RequestAllProducts(){

}

function RequestProduct(id){

}

function TryAddProduct(product){

}

function TryDeleteProduct(id){

}

function RequestAllProductTypes(){

}

function TryAddProductType(name){

}

function TryDeleteProductType(id){
    
}

function RequestAllTransactions(){
    
}

function RequestAllTransactions(){
    
}

function RequestTransaction(id){
    
}

function TryPurchaseProduct(id,amount){

}

function SendAPIRequest() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
        }
    };
    xhttp.open(APIRequest.type, APIRequest.URL, true);

    if (APIRequest.JSON == null) 
    {
        xhttp.send();
    }
    else 
    {
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(APIRequest.JSON);
    }
}