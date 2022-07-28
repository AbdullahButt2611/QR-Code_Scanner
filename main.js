const wrappper = document.querySelector(".wrapper");
const form = document.querySelector("form");
const fileInput = form.querySelector("input");

function fetchRquest(formData)
{

    //Sending request to server qr API  with passing formData as body and getting response from it.
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: "POST", body: formData
    }).then(res => res.json()).then(result => {
        wrappper.classList.add("active");
        console.log(result);
    });
}

fileInput.addEventListener("change", e =>{
    let file = e.target.files[0];           // Getting the user selected files
    let formData = new FormData();          //Creating a new FormData  object
    formData.append("file",file);           //Adding user selected file to FormData 
    fetchRquest(formData);
});


form.addEventListener("click", ()=> fileInput.click());
