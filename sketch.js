// グローバル関数
let kora; // 「こら」という声を発生するためのインスタンスを入れるための変数
let isStandingUp = false; // 立ち上がっているかどうかの判定のための変数

// p5.js/p5.sound用の関数
function preload() {
  soundFormats('mp3');
  kora = loadSound('assets/kora');
}

// p5.js用の関数
function setup() {
  createCanvas(0);
  const video = createCapture(VIDEO);
  // ml5のPoseNetモデルを読み込むための記述
  const poseNet = ml5.poseNet(video, modelLoaded);
  // ml5が人間のポーズを感知したときのリスナー
  poseNet.on('pose', gotPoses);
}

// ml5の機械学習モデルが読み込まれたときに呼ばれるコールバック関数
function modelLoaded() {
  const message = document.querySelector('#message');
  message.innerHTML = '準備OKだよ！';
}

// 人間のポーズを感知したときに発火される関数
function gotPoses(poses) {
  if (poses && poses[0]) {
    const pose = poses[0].pose;
    const noseY = pose.nose.y;
    if (noseY < 50) {
      onStandingUp();
    } else {
      onSitting();
    }
  }
}

// 座っている時に呼ばれる関数
function onSitting() {
  if (isStandingUp) {
    isStandingUp = false;
  }
}

// 立ち上がろうとしている時に呼ばれる関数
function onStandingUp() {
  if (!isStandingUp) {
    isStandingUp = true;
    kora.play();
  }
}