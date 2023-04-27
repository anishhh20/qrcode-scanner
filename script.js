const wrapper = document.querySelector(".wrapper"),
form = document.querySelector("form"),
fullscreen = document.querySelector(".fullscreen"),
fileInp = form.querySelector("input"),
infoText = form.querySelector("p"),
closeBtn = document.querySelector(".close"),
copyBtn = document.querySelector(".copy");

// const fullPage = document.querySelector('.fullscreen');
fullscreen.style.visibility = "hidden";

function fetchRequest(file, formData) {
    infoText.innerText = "Scanning QR Code⌛...";
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: 'POST', body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        infoText.innerText = result ? "Upload QR Code to Scan⬆" : "Couldn't scan QR Code⚠️";
        if(!result) return;
        document.querySelector("textarea").innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        
        // FullScreenImg(file);
        wrapper.classList.add("active");
        // fullscreen1();
        fullscreen.querySelector("img").src = URL.createObjectURL(file);
    }).catch(() => {
        infoText.innerText = "Couldn't scan QR Code⚠️";
    });
}

fileInp.addEventListener("change", async e => {
    let file = e.target.files[0];
    if(!file) return;
    let formData = new FormData();
    formData.append('file', file);
    fetchRequest(file, formData);
});

copyBtn.addEventListener("click", () => {
    let text = document.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
});

form.addEventListener("click", () => fileInp.click());
closeBtn.addEventListener("click", () => wrapper.classList.remove("active"));
closeBtn.addEventListener("click", () => fullscreen.style.visibility = "hidden");


// function FullScreenImg(file) {
//   fullPage.style.visibility = "visible";
//   fullPage.style.backgroundImage = 'url(' + file.src + ')';
// }

function hide(){
    fullscreen.style.visibility = "hidden";
}

function fullscreen1(){
    fullscreen.style.visibility = "visible";
}
