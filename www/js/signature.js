let errorMessage = document.getElementById('error');

let canvas   = document.getElementById('signature-pad');
let savedBtn = document.getElementById('save-png');
let clearBtn = document.getElementById('clear');

let signaturePad = new SignaturePad(canvas);

let req = new XMLHttpRequest();
let url = "http://192.168.1.15:3000/api/configuration/signature";
let method = "POST";

function displayMessageSign(type, message) {
    errorMessage.innerHTML = `
        <div class="alert alert-${type} fade show my-0" role="alert" style="margin-bottom: -45px !important; margin-top: 20px !important;">
            <strong style="font-size: 12px !important;"> ${message} </strong>
        </div>
    `;

    setTimeout(() => {
        errorMessage.innerHTML = "";
    }, 4000);
}

savedBtn.addEventListener('click', function () {
    if (signaturePad.isEmpty()) {
        return displayMessageSign('danger', "Aucune signature détectée");
    }

    let signDataImage = signaturePad.toDataURL('image/png');

    let formData = new FormData();
    formData.append('signature', signDataImage);
    req.open(method, url);
    req.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token')); 
    req.responseType = "json";
    req.send(formData);

    req.onload = () => {
        if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status === 200) {
                let reponse = req.response;
                if (reponse != null) {
                    if (reponse.success) {
                        localStorage.removeItem('signImage');
                        localStorage.setItem('signImage', reponse.signImage);
                        displayMessageSign('success', reponse.message);
                        signaturePad.clear();
                    } else {
                        displayMessageSign('danger', reponse.message);
                    }
                }
            } else {
                let reponse = req.response;
                if (reponse != null) {
                    if (!reponse.success) {
                        displayMessageSign('danger', reponse.message);
                    }
                }
            }
        }
    }
});

clearBtn.addEventListener('click', function () {
    signaturePad.clear();
});