//This will open all links (even links that were dynamically created) that have target="_blank" attribute in a new tab without losing popup focus

$('body').on('click', 'a[target="_blank"]', function(e){
    e.preventDefault();
    chrome.tabs.create({url: $(this).prop('href'), active: false});
    return false;
});
