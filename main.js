vid=""
status=""
object_name=""

function setup(){
    vid= createCapture(VIDEO)
    vid.hide()
    canvas= createCanvas(480,380)
    canvas.center()
}

function draw(){
    image(vid, 0,0,480,380)
}

function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded)
    document.getElementById("status").innerHTML="Status: Detecting objects..."
    object_name=document.getElementById("obj_name").value
}

function modelLoaded(){
    console.log("Model Loaded!")
    status=true
}