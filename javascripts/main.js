$(function(){

	var id;
	var categoryArray = [];
	var typeArray     = [];
	var productArray  = [];

	// Promise of categories
	var categoriesJSON = function(){
	        return new Promise(function(resolve, reject){
	            $.ajax("./db/categories.json").done(function(catData){
	                resolve(catData.categories);
	            }).fail(function(catError){
	                reject(Error1);
	            })
	        })
	   	 };

	// Promise of Types	 
	var typeJSON = function(){
	        return new Promise(function(resolve, reject){
	            $.ajax("./db/types.json").done(function(typeData){
	                resolve(typeData.types);
	            }).fail(function(typeError){
	                reject(error2);
	            })
	        })
	   	 };   	 

	// Promise of Products   	 
	var productJSON = function(){
	        return new Promise(function(resolve, reject){
	            $.ajax("./db/products.json").done(function(prodData){
	                resolve(prodData.products);
	            }).fail(function(prodError){
	                reject(error3);
	            })
	        })
	   	 };
	   	 

	//Return category , types , product arrays   	 
	categoriesJSON().then(function(jsonCategory){
        categoryArray = jsonCategory;
       	makeDropdownList(categoryArray);
        return typeJSON();
    })    
    .then(function(jsonType){
    	typeArray = jsonType;
    	return productJSON();
    })	
    .then(function(jsonProduct){
    	productArray = jsonProduct;
    });         

    // Call function to create event for dropdown catergories button to load types and products arrays
    $(".dropdown-menu").on('click', 'li', function(){	
       var catSelectId = $(this).attr('id');
        console.log(catSelectId , $(this).text());
    	makeDOM(catSelectId, categoryArray, typeArray, productArray);  
   	 });


 });

// Function to create dropdown DOM button for catergories select
function makeDropdownList (categoryArray){

	$.each(categoryArray, function(i, item) {
	   $(".dropdown-menu").append(`<li id="${item.id}"><a href="#">${item.name}</a></li>`);

	});

}

// Function to create DOM types and products for selected category 
function makeDOM(catSelectId, categoryArray, typeArray, productArray){
	var showType = "";
	var showProd = "";
    var domString = `<h3>${categoryArray[catSelectId].name}</h3>`;

	for (var t=0; t<typeArray.length; t++){
		showType = "Y";
		if (catSelectId == typeArray[t].category){

			if (showType == "Y"){
				domString += `<h4>${typeArray[t].name} - ${typeArray[t].description}</h4>`;
				showType = "N";
			}
			showProd = "Y";
			for (var p = 0; p<productArray.length; p++){
				if (typeArray[t].id == productArray[p].type){
					if (showProd == "Y"){
						domString += `<h5>Product</h5>`;
						showProd = "N";
					}
					domString += `<p>${productArray[p].name} - ${productArray[p].description}</p>`;
				}			
			}
		}
	}
	$('#product-list').html(domString);


}




