const canvasTag = document.querySelector(".canvas");
const ctx = canvasTag.getContext("2d");
ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
// 1.绘制图形
function drawGraph() {
  ctx.fillStyle = "rgb(200,0,0)";
  ctx.fillRect(10, 10, 55, 50);

  ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
  ctx.fillRect(30, 30, 55, 50);

  // 2.1 填充和描边
  ctx.strokeStyle = "#bfa";
  ctx.fillStyle = "#bfa";
  ctx.fillRect(50, 50, 20, 20);

  // 2.2 fillRect 和 fillStyle

  //先上色,再绘制 √
  ctx.fillStyle = "#bfa";
  ctx.fillRect(40, 40, 20, 20);
  // 先绘制,在上色
  ctx.fillRect(80, 40, 20, 20);
  ctx.fillStyle = "#bfa";

  //2.2.2 stokeRect 和 strokeStyle
  ctx.strokeStyle = "red";
  ctx.strokeRect(50, 50, 20, 20);

  ctx.strokeStyle = "rgba(0,0,255,0.5)";
  ctx.strokeRect(60, 60, 20, 20);

  // 2.2.3 clearRect 透明实心方形
  ctx.fillStyle = "#bfa";
  ctx.fillRect(40, 40, 80, 80);
  ctx.fillStyle = "rgba(0,0,255,0.5)";
  ctx.fillRect(60, 60, 80, 80);
  ctx.clearRect(60, 60, 40, 40);
}
export default ctx;
