const textColor=document.getElementById('Text-color-dropdown');
console.log(textColor);

const BackgroundColor=document.getElementById('Background-color-dropdown');
console.log(BackgroundColor);

const canvas=document.getElementById('myCanvas');
console.log(canvas.height);
console.log(canvas.width);
console.log(canvas);

const clearBtn=document.getElementById('clear-btn');
const saveBtn=document.getElementById('save-download-btn');
const retriveBtn=document.getElementById('retrive-btn');
const fontSizeDropdown=document.getElementById('Font-size-drop');
console.log(fontSizeDropdown)
let isDrawing=false;
let lastX = 0;
let lastY = 0;

//HTMLCanvasElement.getContext() method gets that element's context—the thing onto which the drawing will be rendered.
const ctx = canvas.getContext("2d");

textColor.addEventListener('change',(e)=>{
    ctx.strokeStyle=e.target.value;
    //ctx.fillStyle=e.target.value;
});

/*mousedown->A mouse button is pressed over an element*/
canvas.addEventListener('mousedown',(e)=>{
    isDrawing=true;
    lastX=e.offsetX;/*provides the X coordinate of the      mouse pointer relative to the target element where the event occurred. */
    lastY=e.offsetY;
    console.log(lastX,lastY)
})

/*mouseMove->The mouse pointer moves over an element */
canvas.addEventListener('mousemove',(e)=>{
    if(isDrawing){
        //console.log("IT")
        ctx.beginPath();
        ctx.moveTo(lastX,lastY);/*starting point*/
        ctx.lineTo(e.offsetX,e.offsetY);
        ctx.stroke();
        lastX=e.offsetX;
        lastY=e.offsetY;
        console.log(ctx.lineWidth);
        //console.log(lastX,lastY)
    }
})

canvas.addEventListener('mouseup',(e)=>{
    isDrawing=false;
})

canvas.addEventListener('mouseout', (e) => {
    isDrawing = false;
});

BackgroundColor.addEventListener('change',(e)=>{
    ctx.fillStyle=e.target.value;
    console.log(canvas.height);
    ctx.fillRect(0,0,canvas.width,canvas.height);
})

fontSizeDropdown.addEventListener('change',(e)=>{
    ctx.lineWidth=e.target.value;
})

clearBtn.addEventListener('click',(event)=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
})

saveBtn.addEventListener('click',(e)=>{
   localStorage.setItem('canvasContents',canvas.toDataURL());
    const link = document.createElement('a');
    link.download = 'canvas-image.png';
    link.href = canvas.toDataURL();
    link.click();
});

retriveBtn.addEventListener('click',(e)=>{
    let saveContent=localStorage.getItem('canvasContents');
    if(saveContent){
        let img=new Image();
        img.src=saveContent;
       // ctx.drawImage(img,0,0);
       img.onload = function() {
            ctx.drawImage(img, 0, 0);
        }
    }
})