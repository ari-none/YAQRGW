// Global constants & stuff
const qrAPI = "https://quickchart.io/qr?"; // API url string
const toastNotext = new bootstrap.Toast(document.getElementById("toastNoText")); // Toast object (no text set error)
const toastBadImage = new bootstrap.Toast(document.getElementById("toastBadImageLink")); // Toast object (invalid image link)
const toastGenerated = new bootstrap.Toast(document.getElementById("toastGenerated")); // Toast object (generated confirmation)


// Utility functions
async function checkImageURL(url){
     const res = await fetch(url);
     const buff = await res.blob();
    
     return buff.type.startsWith('image/')
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
        if ( $("#qrColorFinderUsesPrimary").is(":checked") ) {
            qrURL += `finderColor=${ $("#qrColorFinder").val().slice(1) }&`;
        }

        // Shape
        qrURL += `dotStyle=${ $("input[name='qrDotShape']:checked").val() }&`;
        qrURL += `finderStyle=${ $("input[name='qrFinderShape']:checked").val() }&`;

        // Embedded image
        // TODO: Image selection

        // Finalizing everything
        $("#qrOutputImage").attr("src", qrURL);
        
        toastGenerated.show();
    }
}
$("#qrGenerateButton").on("click", qrGenerateButtonClick)