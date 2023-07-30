vid=""
status=""
object_name=""
objects=[]

function setup(){
    vid= createCapture(VIDEO)
    vid.hide()
    canvas= createCanvas(480,380)
    canvas.center()
    synth=window.speechSynthesis
}

function draw(){
    image(vid, 0,0,480,380)

    if(status != ""){
        objectDetector.detect(vid,gotResults)
        for(i=0 ; i<objects.length ; i++){
            document.getElementById("status").innerHTML="Status: Detected Objects!"
            document.getElementById("num_objects").innerHTML="Number of objects is "+objects.length

            fill("red")
            percent=floor(objects[i].confidence*100)
            text(objects[i].label + " " + percent + "%" , objects[i].x+15 , objects[i].y+15)
            noFill()
            stroke("blue")
            rect(objects[i].x , objects[i].y, objects[i].width , objects[i].height)
            if(objects[i].label==object_name){
                document.getElementById("status").innerHTML="Status: Object Found!"
                utterThis=new SpeechSynthesisUtterance("Status: Object Found!")
                synth.speak(utterThis)
                vid.stop()
            }
        }
    }
}

function gotResults(error,results){
    if(error){
        console.error(error)
    }else{
        console.log(results)
        objects=results
    }
}

function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded)
    document.getElementById("status").innerHTML="Status: Looking for object..."
    object_name=document.getElementById("obj_name").value
}

function modelLoaded(){
    console.log("Model Loaded!")
    status=true
}