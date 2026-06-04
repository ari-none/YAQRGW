// Global constants & stuff
const qrAPI = "https://quickchart.io/qr?"; // API url string
const toastNotext = new bootstrap.Toast(document.getElementById("toastNoText")); // Toast object (no text set error)
const toastGenerated = new bootstrap.Toast(document.getElementById("toastGenerated")); // Toast object (generated confirmation)


// Utility functions
function checkValidImageURL(urlString) { // FIXME: Not returning boolean
    $.ajax({
        type: "HEAD",
        url: urlString,
        success: function(message,text,response){
            return response.getResponseHeader('Content-Type').indexOf("image") != -1;
        } 
    });
}

function isStringEmpty(str) {
    return str.trim().length <= 0
}


// When the QR code generate button is clicked
async function qrGenerateButtonClick() {
    var qrText = $("#qrTextContent").val();

    if (isStringEmpty(qrText)) {
        toastNotext.show();
    } else {
        var qrURL = qrAPI;

        // QR code essentials
        qrURL += `text=${ encodeURIComponent(qrText) }&`; // Text value
        qrURL += `format=${ $("input[name='qrFileFormat']:checked").val() }&` // File format
        qrURL += `size=${ $("input[name='qrSize']:checked").val() }&`

        // Colors
        qrURL += `dark=${ $("#qrColorPrimary").val().slice(1) }&`;
        qrURL += `light=${ $("#qrColorSecondary").val().slice(1) }&`;
        if ($("#qrColorFinderUsesPrimary").is(":checked")) {
            qrURL += `finderColor=${ $("#qrColorFinder").val().slice(1) }&`;
        }

        // Finalizing everything
        $("#qrOutputImage").attr("src", qrURL);
        
        toastGenerated.show();
    }
}
$("#qrGenerateButton").on("click", qrGenerateButtonClick)