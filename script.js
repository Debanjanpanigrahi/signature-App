const textColor = document.getElementById('Text-color-dropdown');
console.log(textColor);

const BackgroundColor = document.getElementById('Background-color-dropdown');
console.log(BackgroundColor);

const canvas = document.getElementById('myCanvas');
if (canvas) {
    console.log(canvas.height);
    console.log(canvas.width);
    console.log(canvas);
} else {
    console.error("Canvas element not found");
}

const clearBtn = document.getElementById('clear-btn');
const saveBtn = document.getElementById('save-download-btn');
const retriveBtn = document.getElementById('retrive-btn');
const fontSizeDropdown = document.getElementById('Font-size-drop');
console.log(fontSizeDropdown);

let isDrawing = false;
let lastX = 0;
let lastY = 0;

if (canvas) {
    // HTMLCanvasElement.getContext() method gets that element's context—the thing onto which the drawing will be rendered.
    const ctx = canvas.getContext("2d");

    if (textColor) {
        textColor.addEventListener('change', (e) => {
            ctx.strokeStyle = e.target.value;
        });
    }

    /*mousedown->A mouse button is pressed over an element*/
    canvas.addEventListener('mousedown', (e) => {
        const rect = canvas.getBoundingClientRect();
        isDrawing = true;
        lastX = e.clientX - rect.left; /* Adjust for canvas position */
        lastY = e.clientY - rect.top; /* Adjust for canvas position */
        console.log(lastX, lastY);
    });

    /*mouseMove->The mouse pointer moves over an element */
    canvas.addEventListener('mousemove', (e) => {
        if (isDrawing) {
            const rect = canvas.getBoundingClientRect();
            ctx.beginPath();
            ctx.moveTo(lastX, lastY); /* starting point */
            ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top); /* Adjust for canvas position */
            ctx.stroke();
            lastX = e.clientX - rect.left; /* Update for next segment */
            lastY = e.clientY - rect.top; /* Update for next segment */
            console.log(ctx.lineWidth);
        }
    });

    canvas.addEventListener('mouseup', (e) => {
        isDrawing = false;
    });

    canvas.addEventListener('mouseout', (e) => {
        isDrawing = false;
    });

    if (BackgroundColor) {
        BackgroundColor.addEventListener('change', (e) => {
            ctx.fillStyle = e.target.value;
            console.log(canvas.height);
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        });
    }

    if (fontSizeDropdown) {
        fontSizeDropdown.addEventListener('change', (e) => {
            ctx.lineWidth = e.target.value;
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', (event) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', (e) => {
            localStorage.setItem('canvasContents', canvas.toDataURL());
            const link = document.createElement('a');
            link.download = 'canvas-image.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    }

    if (retriveBtn) {
        retriveBtn.addEventListener('click', (e) => {
            let saveContent = localStorage.getItem('canvasContents');
            if (saveContent) {
                let img = new Image();
                img.src = saveContent;
                img.onload = function () {
                    ctx.drawImage(img, 0, 0);
                };
            }
        });
    }
} else {
    console.error("Canvas element not found, unable to set up drawing.");
}
