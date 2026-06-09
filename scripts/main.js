// Global constants & stuff
const qrAPI = "https://quickchart.io/qr?"; // API url string
const hStart = "<div class='col-12 p-3 w-75 bg-secondary-subtle rounded-5'><img src='"; // QR history element start
const hEnd = "' width='150' height='150'></div>"; // QR history element end
const randomUnrelatedBS = "https://i.pinimg.com/736x/78/8e/08/788e083a24b90051db6e0d13a8bde218.jpg" // Thought it would be funny (even tho it's not idk)

const toastNotext = new bootstrap.Toast(document.getElementById("toastNoText")); // Toast object (no text set error)
const toastBadImage = new bootstrap.Toast(document.getElementById("toastBadImageLink")); // Toast object (invalid image link)
const toastGenerated = new bootstrap.Toast(document.getElementById("toastGenerated")); // Toast object (generated confirmation)
const toastDownloadFail = new bootstrap.Toast(document.getElementById("toastDownloadFail")); // Toast object (download failed)


// Utility functions
function isValidImageUrl(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url)
}


function isStringEmpty(str) {
    return str.trim().length <= 0
}


function download(filename, link) {
    $("<a>")
        .attr("href", link)
        .attr("download", filename)
        .appendTo("body")
        .get(0).click();
    $(`body a[download="${filename}"]`).last().remove();
}





// Displaying & managing the QR code history
function qrCodeHistory(newlink) {
    if (localStorage.getItem("qrHistory") === null) { // If not set, creates the new history array
        localStorage.setItem("qrHistory", "[]");
    }

    var linkHistory = JSON.parse(localStorage.getItem("qrHistory"));

    if (typeof newlink === "string" && newlink.length > 0) { // If a new link has been passed in the URL, add it to the list
        linkHistory.unshift(newlink);
        if (linkHistory.length > 5) {
            linkHistory.pop();
        }
        localStorage.setItem("qrHistory", JSON.stringify(linkHistory));
    }

    $("#qrHistoryWindow").html("");
    linkHistory.forEach(function(link) {
        $("#qrHistoryWindow").append(hStart + link + hEnd);
    });
}
qrCodeHistory();


// When the QR code generate button is clicked
async function qrGenerateButtonClick() {
    var qrText = encodeURIComponent( $("#qrTextContent").val().trim() );

    if (isStringEmpty(qrText)) {
        toastNotext.show();
        return;
    } else {
        if (qrText == "for%20some%20reason%20we%20exist") {
            $("#qrOutputImage").attr("src", randomUnrelatedBS);
            return;
        }

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
        qrCodeHistory(qrURL);
        
        toastGenerated.show();
    }
}
$("#qrGenerateButton").on("click", qrGenerateButtonClick);


// When the QR code download button is clicked
function qrDownloadButtonClick() {
    var imgLink = $("#qrOutputImage").attr("src");

    if (!imgLink.startsWith("https://quickchart.io/qr?text=")) {
        toastDownloadFail.show();
        return;
    } else {
        download(`qrcode-${ Date.now() }.${ $("input[name='qrFileFormat']:checked").val() }`, imgLink);
    }
}
$("#qrDownloadButton").on("click", qrDownloadButtonClick);


// Updating the embedded image ratio range output
function qrEmbSizeOutput() {
    $("#qrEmbedImageSizeRatioOutput").text( $("#qrEmbedImageSizeRatio").val() + "%" );
}
qrEmbSizeOutput();
$("#qrEmbedImageSizeRatio").on("input", qrEmbSizeOutput);