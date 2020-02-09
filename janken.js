'use strict';
// constとは値書き換えを禁止した変数を宣言する方法

(() => {

  const HAND_FORMS = [
    0, // パー
    1, // グー
    2  // チョキ
  ];

  // それぞれの手のx座標を指定している。
  const HAND_X = [
    0,   // グー
    280, // チョキ
    541  // パー
  ];

  // それぞれの手のwidth(横幅)を指定している。
  const HAND_WIDTH = [
    280, // グー
    560, // チョキ
    840  // パー
  ];


  const IMAGE_PATH = "img/janken.png";
  const FPS = 5;
  let isPause = false;

  // draw関数が実行されるたびに1増える(インクリメント)
  // currentFrameの値を剰余算演算子(%)を使い出たあまりを使うことで、
  // 表示される手の形を決める。
  let currentFrame = 0;

  /**
   * 実際にアニメーションを開始させる処理
   */
  function main() {
    const canvas = document.getElementById('screen');
    const context = canvas.getContext('2d');
    const imageObj = new Image();
    currentFrame = 0;

    // 画像の読み込みが完了したら、
    // loop関数の無限ループを実行する。
    imageObj.onload = function () {
      function loop() {
        if (!isPause) {
          draw(canvas, context, imageObj, currentFrame++);
        }
        setTimeout(loop, 1000 / FPS);
      }
      loop();
    };
    imageObj.src = IMAGE_PATH;
  }

  
  //  * @param {*} canvas HTMLのcanvas要素
  //  * @param {*} context canvasから取得した値。この値を使うことでcanvasに画像や図形を描画することが出来る
  //  * @param {*} imageObject 画像データ。
  //  * @param {*} frame 現在のフレーム数(コマ数)。フレーム % HAND_FORMS.lengthによって0(グー), 1(チョキ), 2(パー)を決める
  
  function draw(canvas, context, imageObject, frame) {

    // Canvasをまっさらな状態にする。（クリアする）
    context.clearRect(0, 0, canvas.width, canvas.height);

    // 0: グー, 1, チョキ, 2: パー
    const handIndex = frame % HAND_FORMS.length;
    const sx = HAND_X[handIndex];
    const swidth = HAND_WIDTH[handIndex];

    // 画像のx座標(sx)と指定した手の横幅(swidth)を使って、
    // グー・チョキ・パー画像('./images/sprite.png')から特定の手の形を切り取る
    context.drawImage(
      imageObject,
      sx,
      0,
      swidth,
      imageObject.height,
      0,
      0,
      swidth,
      canvas.height
    );
  }

  /**
   * ボタンクリック時の処理の定義をまとめて行う関数
   */
  function setButtonAction() {
    const rock = document.getElementById('rock');
    const scissors = document.getElementById('scissors');
    const paper = document.getElementById('paper');
    const restart = document.getElementById('restart');

    // グー・チョキ・パーのいずれかをクリックした時に呼ばれる。
    function onClick(event) {
      // 自分の手と相手の手の値を取得する。
      const myHandType = parseInt(event.target.value, 10);
      const enemyHandType = parseInt(currentFrame % HAND_FORMS.length, 10);

      // isPauseフラグをtrueにすることでloop関数内で呼び出している
      // draw関数が実行されなくなる。
      isPause = true;

      // 自分の手の値と相手の値をjudge関数に渡して勝敗を確認する。
      judge(myHandType, enemyHandType);
    }

    // グー・チョキ・パーボタンを押したときの処理をonClick関数で共通化
    rock.addEventListener('click', onClick);
    scissors.addEventListener('click', onClick);
    paper.addEventListener('click', onClick);

    // 再開ボタンでブラウザをリロードする

    restart.addEventListener('click', function () {
      window.location.reload();
    });
  }

  // 自分の手の値(0~2のいずれか)と相手の手の値(0~2のいずれか)を使って計算を行い
  // 値に応じて勝ち・負け・引き分けを判断して、アラートに結果を表示する。
  function judge(myHandType, enemyHandType) {
    // 0: 引き分け, 1: 負け, 2: 勝ち
    // じゃんけんの勝敗判定のアルゴリズムはここで見た: https://qiita.com/mpyw/items/3ffaac0f1b4a7713c869
    const result = (myHandType - Math.abs(enemyHandType) + 3) % HAND_FORMS.length;

    if (result === 0) {
      alert('引き分けです!');
    } else if (result === 1) {
      alert('あなたの負けです!');
    } else {
      alert('あなたの勝ちです!');
    }
  }

  // ボタンクリック時の処理の定義を行ってから、アニメーションを開始する
  setButtonAction();
  main();
})();

function newFunction() {
  return '/img/janken.png';
}
