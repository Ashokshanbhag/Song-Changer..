song = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score_leftWrist = 0;

function preload(){

    song  = loadSound("music.mp3");
    song2  = loadSound("music2.mp3");

}

function setup(){

    canvas = createCanvas(500, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);

}
function draw(){

    image(video, 0, 0, 500, 500);
    fill("#fc0303");
    stroke("000000");
    playing = song.isPlaying();

    if(playing == false){
        if(score_leftWrist > 0.2){

            circle(leftWristX, leftWristY, 20);
            song2.stop();
            song.play();
            song.setVolume(1);
            song.rate(1);
            document.getElementById("song_name").innerHTML  = "Song: Harry Potter Remix";

        }
    }
    
}

function modelLoaded(){

    console.log("The Model Has been loaded");

}

function gotPoses(results){

    if(results.length > 0){

        console.log(results);
        score_leftWrist = results[0].pose.keypoints[9].score;
        console.log(score_leftWrist);

        leftWristX = results[0].pose.leftWrist.x - 100;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left wrist x = " + leftWristX);
        console.log("left wrist y = " + leftWristY);
        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right wrist x = " + rightWristX);
        console.log("right wrist y = " + rightWristY);

    }
}