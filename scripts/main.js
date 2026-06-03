const qrapi = "https://quickchart.io/qr?"; // API url string
const toastNotext = new bootstrap.Toast(document.getElementById("toastNoText")); // Toast object (no text set error)
const toastGenerated = new bootstrap.Toast(document.getElementById("toastGenerated")); // Toast object (generated confirmation)

console.log("Test");


// TODO: Do some basic code stuff

// When the QR code generate button is clicked
async function qrcodeGenerateButtonClick() {
    const qrText = $("#qrTextContent").val();

    if (qrText.trim().length <= 0) {
        toastNotext.show();
    } else {
        toastGenerated.show();
    }

    console.log(qrText.trim().length);
}
$("#qrcodeGenerateButton").on("click", qrcodeGenerateButtonClick)