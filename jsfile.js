function validateForm(){
    var amount = document.getElementById("amount").value;
    var product = document.getElementById("product").value;
    var category = document.getElementById("category").value;

    if(amount == ""){
        alert("Fill the amout");
        return false;
    }

    if(product == ""){
        alert("Enter the product");
        return false;
    }

    if(category == ""){
        alert("Enter the category");
        return false;
    }

    return true ;
}

function showData() {
  var productList;
  if (localStorage.getItem("productList") == null) {
    productList = [];
  } else {
    productList = JSON.parse(localStorage.getItem("productList"));
  }

  var html = "";

  productList.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.amount + "</td>";
    html += "<td>" + element.product + "</td>";
    html += "<td>" + element.category + "</td>";
    html += '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger">Delete</button><button onclick="updateData(' + index + ')" class="btn btn-warning m-2">Edit</button></td>';
    html += "</tr>";
  });

  document.querySelector("#crudTable tbody").innerHTML = html;
}


document.onload = showData();

//function to add data

function AddData(){
    if(validateForm() == true){
    var amount = document.getElementById("amount").value;
    var product = document.getElementById("product").value;
    var category = document.getElementById("category").value;

        var productList ;
        if(localStorage.getItem("productList") == null){
            productList = [];
        } else {
            productList = JSON.parse(localStorage.getItem("productList"))
        }

        productList.push({
            amount : amount ,
            product : product,
            category : category
        });

        localStorage.setItem("productList", JSON.stringify(productList));

        showData();

        document.getElementById("amount").value = "";
        document.getElementById("product").value = "";
        document.getElementById("category").value = "";

    }
}

function deleteData(index){
    var productList ;
        if(localStorage.getItem("productList") == null){
            productList = [];
        } else {
            productList = JSON.parse(localStorage.getItem("productList"))
        }

        productList.splice(index, 1 );

        localStorage.setItem("productList", JSON.stringify(productList));
        showData();
}

function updateData(index){
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var productList ;
        if(localStorage.getItem("productList") == null){
            productList = [];
        } else {
            productList = JSON.parse(localStorage.getItem("productList"))
        }

        document.getElementById("amount").value = productList[index].amount;
        document.getElementById("product").value = productList[index].product;
        document.getElementById("category").value = productList[index].category;

        document.querySelector("#Update").onclick = function(){
            if(validateForm() == true){
                productList[index].amount = document.getElementById("amount").value;
                productList[index].product = document.getElementById("product").value;
                productList[index].category = document.getElementById("category").value;

                localStorage.setItem("productList", JSON.stringify(productList));

                showData();

                document.getElementById("amount").value = "";
                document.getElementById("product").value = "";
                document.getElementById("category").value = "";

                document.getElementById("Submit").style.display = "block";
                document.getElementById("Update").style.display = "none";
            }
        }
}
