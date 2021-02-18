const webcamElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const snapSoundElement = document.getElementById('snapSound');
const takeImage = document.getElementById('takeImage');
const startCamera = document.getElementById('startCamera');
const stopCamera = document.getElementById('stopCamera');
const saveImage = document.getElementById('saveImage');
const inputId = document.getElementById('inputId');



const webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);

stopCamera.style.display = 'none'
saveImage.disabled = true
takeImage.disabled = true


// démrrer la caméra
function start() {
    webcam.start()
        .then(result => {
            console.log("webcam started");
        })
        .catch(err => {
            console.log(err);
        });
    stopCamera.style.display = 'block'
    startCamera.style.display = 'none'
    takeImage.disabled = false
}

// arrêter la caméra
function end() {
    takeImage.disabled = true
    saveImage.disabled = true
    stopCamera.style.display = 'none'
    startCamera.style.display = 'block'
    takeImage.textContent = 'Prendre une photo'
    let img = document.getElementById('canvaImage')
    var context = canvasElement.getContext('2d');
    context.clearRect(0, 0, canvasElement.width, canvasElement.height);
    console.log(img)
    document.querySelectorAll('.p').forEach(element => {
        element.remove()
    })
    index = 1
    inputId.value = ""
    webcam.stop()
}


let base64 = ''
// prendre une photo
function take() {
    if (index < 7) {
        base64 = webcam.snap()
        let img = document.createElement('img')
        img.setAttribute('src', base64)
        img.setAttribute('id', 'canvasImage')
        canvasElement.appendChild(img)
        saveImage.disabled = false
        takeImage.textContent = 'Modifier la photo'
    }
}

// convertir en blob
function dataURItoBlob() {
    var binary = atob(base64.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
}

let index = 1
// sauvgarder la photo
function downloadImage() {
    if (inputId.value !== "") {
        if (index < 7) {
            let fileName = inputId.value + '_' + index + '.jpeg'
            let a = document.createElement('a');
            a.setAttribute('download', fileName);
            a.setAttribute('href', base64);
            a.click();

            let img = document.createElement('img')
            img.setAttribute('src', base64)
            img.setAttribute('class', 'base64, w-100')
            let p = document.getElementById("p" + index)
            console.log(p)
            p.appendChild(img)
            index += 1
            takeImage.textContent = 'Prendre une photo'
            saveImage.disabled = true


            // const formData = new FormData()
            // let blob = dataURItoBlob()
            // formData.set("avatar", blob, fileName);
            // const request = new XMLHttpRequest();
            // request.open("post", "/");
            // request.send(formData);
        }
    }
}