/*var instance = M.Tabs.init('.tabs', {});

document.addEventListener('DOMContentLoaded', function() {
    M.AutoInit();
});*/

async function getDataImages(index) {
    try {
        const url = "http://jsonplaceholder.typicode.com/photos/" + index;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('There was a problem with de conextion');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

function generateListImages (start, end, cicle) {
    var imagesDiv = document.getElementById("list-image");
    imagesDiv.innerHTML = '';

    if (cicle) {
        for (let img = start; img <= end; img++) {
            getDataImages(img).then(result => {
                var newIMG = document.createElement("img");
                newIMG.classList.add("api-image");
                newIMG.src = result.url;
                newIMG.alt = result.title;

                imagesDiv.appendChild(newIMG);
            });
        }
    } else {
        getDataImages(start).then(result => {
            var newIMG = document.createElement("img");
            newIMG.classList.add("api-image");
            newIMG.src = result.url;
            newIMG.alt = result.title;
            //newIMG.height = 100;
            //newIMG.width = 100;

            imagesDiv.appendChild(newIMG);
        });
    }
}

const resultButton = document.getElementById("show-images");

resultButton.addEventListener("click", (event) => {
    var startVal = parseInt(document.getElementById("start-val").value);
    var endVal = parseInt(document.getElementById("end-val").value);
    var showOne = document.getElementById("show-one").checked;
    
    if (showOne) {
        generateListImages(1, 1, false);
    } else if (isNaN(startVal) || isNaN(endVal)) {
        alert("Valor de los limites no validos.");
    } else if (startVal > endVal) {
        alert("El limite inferior debe ser menor que el limite superior");
    } else {
        generateListImages(startVal, endVal, true);
    }
});