//function handleFetchErrors(response)
//{
//	// HTTP Error
//	if (!response.ok)
//	{
//		console.log("HTTP ERROR: " + response.status + " " + response.statusText);
//	}
//
//	return response.text();
//}

chrome.runtime.onInstalled.addListener(function ()
{
	console.log("Extension installed");
});

//chrome.runtime.onMessage.addListener(
//  (request, sender, sendResponse) => {
//    if (request.message === "hi")
//      sendResponse({message: "hi to you"});
//  });

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse)
	{
		if (request.site === "bestbuy")
		{
			fetch(request.options.url)
			.then(function (response)
			{
				// HTTP Error
				if (!response.ok)
				{
					console.log("HTTP ERROR: " + response.status + " " + response.statusText);
				}
				
				console.log(response);
				
				return response.text();
			})
			.then(text =>
			{
				console.log("text: " + text);
				
				var parser = new DOMParser();
				var parsedHtml = parser.parseFromString(text, "text/html");
				
	//			console.dir(parsedHtml.getElementsByClassName("sku-item"));
				
				var skuId = parsedHtml.getElementsByClassName("sku-item")[0].dataset.skuId;

				console.log("SKU ID: " + skuId);
				
				sendResponse({data: skuId});
			})
			.catch(error => console.log("FAILED: " + error))
			
			console.log("right before true");
			
			return true;	// async response
		}
	});
