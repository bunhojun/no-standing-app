
let video;
let poseNet;
let kora;
let isStandingUp = false;

function modelLoaded() {
  console.log('Model Loaded!');
}

function setIsStandingUpFalse() {
  if (isStandingUp) {
    isStandingUp = false;
  }
}

function setIsStandingUpTrue() {
  if (!isStandingUp) {
    isStandingUp = true;
    kora.play();
  }
}

function gotPoses(poses) {
  if (poses && poses[0]) {
    const pose = poses[0].pose;
    const noseY = pose.nose.y;
    if (noseY < 50) {
      setIsStandingUpTrue();
    } else {
      setIsStandingUpFalse();
    }
  } else {
    setIsStandingUpTrue();
  }
}

function preload() {
  soundFormats('mp3', 'ogg');
  kora = loadSound('assets/kora');
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}
