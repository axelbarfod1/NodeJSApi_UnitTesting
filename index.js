var Cliente = require('node-rest-client').Client;

var cli = new Cliente();
var baseUrl = "https://api.mercadolibre.com/";
var resource = "sites/";
var site = "MLU/";
var args = {
    headers: {"Content-Type": "application/json"},
    data: {
        "msg": {
            "id": "MLU445030900"
        }
    }
};

function getCategories() {
    cli.get(baseUrl + resource + site + "search?category=MLU1574&official_store_id=all", function (data, response) {
        console.log("·············· DATA ················");
        console.log("Largo de results: " + data.results.length);

        if (response.statusCode !== 200) {
            console.log("Response: " + response.statusCode);
        } else {

            for (var i = 0; i < data.results.length; i++) {
                console.log("Item " + i);
                console.log("Data del item id" + JSON.stringify(data.results[i]));

                getItems(data.results[i].id);
                postJSON();
            }

        }
    });
}


function getItems(itemId) {
    cli.get(baseUrl + "items/" + itemId, function (data, response) {
        console.log("Retreiving Item: " + itemId);
        if (response.statusCode !== 200) {
            console.log("Response: " + response.statusCode);
        } else {
            console.log("Item ID: " + itemId + " titulo del item "
                + data.title + " cantidad disponible " + data.available_quantity);
        }
    });
    console.log("Saliendo de getItems()");
}

function postJSON() {
    cli.post("http://localhost:8080/workshop/abarfod/", args, function (data, response) {
        if (response.statusCode === 200) {
            console.log(data);
        } else {
            console.log(response.statusCode + " " + response.statusMessage);
        }
    });
}

getCategories();
//postJSON();