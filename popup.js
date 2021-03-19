//Manifest Permissions
//"activeTab",
//"<all_urls>",
//"declarativeContent",
//"tabs",
//"storage",
//"*://*.bestbuy.com/*"


// Global
//var background = chrome.extension.getBackgroundPage();
//var skuId = "";


function convertToBestBuySKU(item)
{	
	bbURL = "https://www.bestbuy.com/site/searchpage.jsp?_dyncharset=UTF-8&qp=format_facet%3DFormat~Physical&st=" + encodeURIComponent(item);
	
	chrome.runtime.sendMessage({site: "bestbuy", options: {url: bbURL}}, function (response)
	{
		var skuId = response.data;
		console.log("Response: " + skuId);
		
		chrome.tabs.create
		({
			url: "https://tradein.bestbuy.com/client/#/catalog/products/appraisal?sku=" + skuId,
			active: false
		});
	});
	
//	chrome.runtime.sendMessage({message: "hi"}, (response) => {
//  console.log(response.message);
//});

}

function processForm()
{
//	var itemName = document.getElementById("itemName");
//	var itemUPC = document.getElementById("itemUPC");
//
//	if (itemName === "" && itemUPC === "")
//	{
//		alert("Please enter the item's name or UPC");
//	}
//	function validateForm() {
//	  var x = document.forms["myForm"]["fname"].value;
//	  if (x == "") {
//		alert("Name must be filled out");
//		return false;
//	  }
//	}
		
	
	console.log("Form submitted!");
	var item = document.getElementById("item").value;
	console.log("Item is:", item);
	
	// Checked Sites
	var sitesArray = [];
	var checkedBoxes = document.querySelectorAll("input[type=checkbox]:checked");	// NodeList

	for (var i = 0; i < checkedBoxes.length; i++)
	{
	  sitesArray.push(checkedBoxes[i].value);
	}
	
	console.log("Sites checked:", sitesArray);
	
	// Navigate to site(s)
	for (var i = 0; i < sitesArray.length; i++)
	{
		siteName = sitesArray[i];
		
		if (siteName === "amazon")
		{
			chrome.tabs.create
			({
			   	url: "https://www.amazon.com/gp/tradein/search?ie=UTF8&keyword=" + encodeURIComponent(item) + "&view=search",
			   	active: false	// Tab opened in background
			});
		}
		else if (siteName === "bestbuy")
		{
			convertToBestBuySKU(item);
		}
		else if (siteName === "ebay")
		{
			chrome.tabs.create
			({
				url: "https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw=" + encodeURIComponent(item) + "&_sacat=0",
			   	active: false
			});
		}
		else if (siteName === "gamestop")
		{
			chrome.tabs.create
			({
		   		url: "https://www.gamestop.com/trade/?q=" + encodeURIComponent(item) + "&lang=default",
			   	active: false
			});
		}
		else if (siteName === "poshmark")
		{
			chrome.tabs.create
			({
			   	url: "https://poshmark.com/search?query=" + encodeURIComponent(item) + "&type=listings",
			   	active: false
			});
		}
		else console.log("No site selected");
	}
}

document.addEventListener("DOMContentLoaded", function ()
{
	console.log("Popup loaded!");
	// When form is submitted, do processForm()
//	const form = document.forms["form"];
//	form.addEventListener("submit", processForm);
	document.getElementById("form").onsubmit = function (event)
	{
		event.preventDefault();
		console.log("Submit prevented!");
		processForm();
	}
});
