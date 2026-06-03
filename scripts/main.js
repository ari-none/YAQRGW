const qrAPI = "https://quickchart.io/qr?"; // API url string
const toastNotext = new bootstrap.Toast(document.getElementById("toastNoText")); // Toast object (no text set error)
const toastGenerated = new bootstrap.Toast(document.getElementById("toastGenerated")); // Toast object (generated confirmation)

// When the QR code generate button is clicked
async function qrGenerateButtonClick() {
    var qrText = $("#qrTextContent").val();

    if (qrText.trim().length <= 0) {
        toastNotext.show();
    } else {
        var qrURL = qrAPI;
        const qrSize = $("input[name='qrSize']:checked").val();

        qrURL += `text=${encodeURIComponent(qrText)}&`; // Text value
        qrURL += `format=${$("input[name='qrFileFormat']:checked").val()}&` // File format
        qrURL += `size=${qrSize}&`

        $("#qrOutputImage").attr("src", qrURL); // TODO: Make it so the image in the output dynamically scales (up to 512px maximum)
        
        toastGenerated.show();
    }
}
$("#qrGenerateButton").on("click", qrGenerateButtonClick)