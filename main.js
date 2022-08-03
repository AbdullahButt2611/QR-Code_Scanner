const wrappper = document.querySelector(".wrapper");
const form = document.querySelector("form");
const fileInput = form.querySelector("input");
const infoText = form.querySelector("p");
const copyBtn = wrappper.querySelector(".copy");
const closeBtn = wrappper.querySelector(".close");


function fetchRquest(formData, file)
{
    infoText.innerText = "Scanning QR Code..."

    //Sending request to server qr API  with passing formData as body and getting response from it.
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: "POST", body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        console.log(result)
        infoText.innerText = result ? "Upload QR Code to Scan" : "Couldn't Scan QR Code";
        if(!result) return;
        wrappper.querySelector("textarea").value = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        wrappper.classList.add("active");
    }).catch(()=>{
        infoText.innerText = "Couldn't Scan QR Code";
    })
}

fileInput.addEventListener("change", e =>{
    let file = e.target.files[0];           // Getting the user selected files
    if(!file) 
        return;
    
    let formData = new FormData();          //Creating a new FormData  object
    formData.append("file",file);           //Adding user selected file to FormData 
    fetchRquest(formData, file);
});

copyBtn.addEventListener("click", ()=>{
    let text =  wrappper.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
});


form.addEventListener("click", ()=> fileInput.click());
closeBtn.addEventListener("click", ()=> wrappper.classList.remove("active"));
