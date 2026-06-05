// Global constants & stuff
const qrAPI = "https://quickchart.io/qr?"; // API url string
const toastNotext = new bootstrap.Toast(document.getElementById("toastNoText")); // Toast object (no text set error)
const toastBadImage = new bootstrap.Toast(document.getElementById("toastBadImageLink")); // Toast object (invalid image link)
const toastGenerated = new bootstrap.Toast(document.getElementById("toastGenerated")); // Toast object (generated confirmation)


// Utility functions
function isValidImageUrl(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url)
}


function isStringEmpty(str) {
    return str.trim().length <= 0
}


// When the QR code generate button is clicked
async function qrGenerateButtonClick() {
    var qrText = encodeURIComponent( $("#qrTextContent").val().trim() );

    if (isStringEmpty(qrText)) {
        toastNotext.show();
        return;
    } else {
        var qrURL = qrAPI;

        // QR code essentials
        qrURL += `text=${ qrText }&`; // Text value
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
        var qrEmbedImage = encodeURIComponent( $("#qrEmbedImage").val().trim() );
        if ( !isStringEmpty(qrEmbedImage) ) {
            console.log(isValidImageUrl(qrEmbedImage));
            var isImage = await isValidImageUrl(qrEmbedImage);
            if ( !isImage ) {
                toastBadImage.show();
                return;
            } else {
                qrURL += `centerImageUrl=${ qrEmbedImage }&`;
                qrURL += `centerImageSizeRatio=${ $("#qrEmbedImageSizeRatio").val() / 100 }&`
            }
        }

        // Finalizing everything
        $("#qrOutputImage").attr("src", qrURL);
        
        toastGenerated.show();
    }
}
$("#qrGenerateButton").on("click", qrGenerateButtonClick);

// Updating the embedded image ratio range output
function qrEmbSizeOutput() {
    $("#qrEmbedImageSizeRatioOutput").text( $("#qrEmbedImageSizeRatio").val() + "%" );
}
qrEmbSizeOutput();
$("#qrEmbedImageSizeRatio").on("input", qrEmbSizeOutput);