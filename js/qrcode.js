$(document).ready(function () {
    chrome.tabs.getSelected(null, function (tab) {
        $('#qrcode').qrcode({
            width: 150,
            height: 150,
            text: tab.url
        });
    });
})