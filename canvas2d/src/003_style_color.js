import ctx from "./index.js";
// 1. fillStyle 示例
function useFillStyle() {
  for (let i = 0; i < 255; i++) {
    for (let j = 0; j < 255; j++) {
      ctx.fillStyle = `rgb(${Math.floor(255 - 1 * i)},${Math.floor(
        255 - 1 * j
      )},0)`;
      ctx.fillRect(j * 1, i * 1, 1, 1);
    }
  }
}

// useFillStyle();

// 2. strokeStyle 示例
function useStrokeStyle() {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      ctx.strokeStyle = `rgb(0,${Math.floor(255 - 42.5 * i)},${Math.floor(
        255 - 42.5 * j
      )})`;
      ctx.beginPath();
      ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, Math.PI * 2, true);
      ctx.stroke();
    }
  }
}

// useStrokeStyle();

// 3. globalAlpha 使用
function useGlobalAlpha() {
  // 背景
  ctx.fillStyle = "#FD0";
  ctx.fillRect(0, 0, 75, 75);
  ctx.fillStyle = "#6C0";
  ctx.fillRect(75, 0, 75, 75);
  ctx.fillStyle = "#09F";
  ctx.fillRect(0, 75, 75, 75);
  ctx.fillStyle = "#F30";
  ctx.fillRect(75, 75, 75, 75);
  ctx.fillStyle = "#FFF";

  ctx.globalAlpha = 0.2;
  for (let i = 0; i < 7; i++) {
    ctx.beginPath();
    ctx.arc(75, 75, 10 + 10 * i, 0, Math.PI * 2);
    ctx.fill();
  }
}

// useGlobalAlpha();

// 4. 通过fill来设置rgba 设置半透明度
function useRGBA() {
  // 画背景
  ctx.fillStyle = "rgb(255,221,0)";
  ctx.fillRect(0, 0, 150, 37.5);
  ctx.fillStyle = "rgb(102,204,0)";
  ctx.fillRect(0, 37.5, 150, 37.5);
  ctx.fillStyle = "rgb(0,153,255)";
  ctx.fillRect(0, 75, 150, 37.5);
  ctx.fillStyle = "rgb(255,51,0)";
  ctx.fillRect(0, 112.5, 150, 37.5);

  // 画半透明矩形
  for (var i = 0; i < 10; i++) {
    ctx.fillStyle = "rgba(255,255,255," + (i + 1) / 10 + ")";
    for (var j = 0; j < 4; j++) {
      ctx.fillRect(5 + i * 14, 5 + j * 37.5, 14, 27.5);
    }
  }
}
// useRGBA();

// 5. lineWidth
// 线宽是指给定路径的中心到两边的粗细。换句话说就是在路径的两边各绘制线宽的一半。
// 因为画布的坐标并不和像素直接对应，当需要获得精确的水平或垂直线的时候要特别注意。

function setLineWidth() {
  for (let i = 0; i < 10; i++) {
    ctx.lineWidth = 1 + i;
    ctx.beginPath();
    ctx.moveTo(10 + i * 14, 5);
    ctx.lineTo(10 + i * 14, 200);
    ctx.stroke();
  }
}

// setLineWidth();

// 6. lineCap 线段端点显示的样子

function showLineCap() {
  const lineCapList = ["butt", "round", "square"];
  // 1. 创建辅助线
  ctx.strokeStyle = "#09f";
  ctx.beginPath();
  ctx.moveTo(100, 100);
  ctx.lineTo(200, 100);
  ctx.moveTo(100, 200);
  ctx.lineTo(200, 200);
  ctx.stroke();

  // 2.创建不同lineCap的线段
  for (let i = 0; i < lineCapList.length; i++) {
    ctx.lineWidth = 10;
    ctx.lineCap = lineCapList[i];
    ctx.beginPath();
    ctx.moveTo(120 + i * 20, 100);
    ctx.lineTo(120 + i * 20, 200);
    ctx.stroke();
  }
}

// showLineCap();

// 7. lineJoin 图形中两线段连接处所显示的样子
function showLineJoin() {
  const lineJoinList = ["round", "bevel", "miter"];
  // 1. 创建辅助线
  ctx.lineWidth = 10;
  ctx.lineCap = "butt";
  // 2.创建不同lineCap的线段
  for (let i = 0; i < lineJoinList.length; i++) {
    ctx.lineJoin = lineJoinList[i];
    ctx.beginPath();
    ctx.moveTo(100, 100 + i * 40);
    ctx.lineTo(140, 140 + i * 40);
    ctx.lineTo(180, 100 + i * 40);
    ctx.lineTo(220, 140 + i * 40);
    ctx.lineTo(260, 100 + i * 40);
    ctx.stroke();
  }
}

// showLineJoin();

// 8. 使用虚线 setLineDash lineDashoffset
//setLineDash 方法接受一个数组，来指定线段与间隙的交替；
//lineDashOffset 属性设置起始偏移量。
let offset = 0;
function drawDashLine() {
  ctx.clearRect(0, 0, 400, 400);
  ctx.setLineDash([4, 2]);
  ctx.lineDashOffset = -offset;
  ctx.strokeRect(10, 10, 100, 100);
}

function march() {
  offset++;
  if (offset > 16) {
    offset = 0;
  }
  drawDashLine();
  // setTimeout(march, 20);
  requestAnimationFrame(march);
}
// march();

//9. 渐变(gradient) createLinearGradient createRadialGradient addColorStop
function showLinearGradient() {
  // 1. 创建第一个 gradient对象
  const linearGradient01 = ctx.createLinearGradient(0, 0, 0, 200);
  linearGradient01.addColorStop(0, "#00ABEB");
  linearGradient01.addColorStop(0.5, "#fff");
  linearGradient01.addColorStop(0.5, "#26C000");
  linearGradient01.addColorStop(1, "#FFF");

  // 2. 创建第二个 gradient 对象
  const linearGradient02 = ctx.createLinearGradient(0, 10, 0, 120);
  linearGradient02.addColorStop(0.5, "#000");
  linearGradient02.addColorStop(1, "rgba(0,0,0,0)");
  ctx.strokeStyle = linearGradient02; // 接收渐变对象
  ctx.fillStyle = linearGradient01; // 接收渐变对象

  ctx.fillRect(10, 10, 200, 200);
  ctx.strokeRect(60, 60, 60, 60);
}

// showLinearGradient();

// 10. 创建径向渐变 createGradialGradient(x1,y1,r1,x2,y2,r2); addColorStop(position,color);
function showRadialGradient() {
  // 创建 多个 径向渐变对象
  const radGrad01 = ctx.createRadialGradient(45, 45, 10, 52, 50, 30);
  radGrad01.addColorStop(0, "#A7D30C");
  radGrad01.addColorStop(0.9, "#019F62");
  radGrad01.addColorStop(1, "rgba(1,159,98,0.5)");

  const radGrad02 = ctx.createRadialGradient(105, 105, 20, 112, 120, 50);
  radGrad02.addColorStop(0, "#FF0188");
  radGrad02.addColorStop(0.65, "#FF5F98");
  radGrad02.addColorStop(1, "rgba(255,1,136,0)");

  const radGrad03 = ctx.createRadialGradient(95, 15, 15, 102, 20, 40);
  radGrad03.addColorStop(0, "#00C9FF");
  radGrad03.addColorStop(0.5, "#00B5E2");
  radGrad03.addColorStop(1, "rgba(0,201,255,0.7)");

  const radGrad04 = ctx.createRadialGradient(0, 150, 50, 0, 140, 90);
  radGrad04.addColorStop(0, "#F4F201");
  radGrad04.addColorStop(0.8, "#E4C700");
  radGrad04.addColorStop(1, "rgba(228,199,0,0)");

  ctx.fillStyle = radGrad01;
  ctx.fillRect(0, 0, 150, 150);
  ctx.fillStyle = radGrad02;
  ctx.fillRect(0, 0, 150, 150);
  ctx.fillStyle = radGrad03;
  ctx.fillRect(0, 0, 150, 150);
  ctx.fillStyle = radGrad04;
  ctx.fillRect(0, 0, 150, 150);
}

// showRadialGradient();

//12. 图片填充

function showPattern() {
  // 创建Image对象
  const img = new Image(); // 等价于 const img=document.createElement("img")
  img.src =
    "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors/canvas_createpattern.png";
  img.onload = () => {
    const pattern = ctx.createPattern(img, "repeat");
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, 400, 400);
  };
}

// showPattern();

//  13. 文字阴影

function showShadowText() {
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;
  ctx.shadowBlur = 1;
  ctx.shadowColor = "rgba(0,0,255,0.5)";
  ctx.font = "20px Times New Roman"; // 创建字体
  ctx.fillStyle = "Black";
  ctx.fillText("Live Sample", 100, 200); // 填充字体内容
}

// showShadowText();

// 14. 填充规则

function fillParams() {
  ctx.beginPath();
  ctx.arc(50, 50, 30, 0, Math.PI * 2, true);
  ctx.arc(50, 50, 10, 0, Math.PI * 2, true);
  ctx.fill("evenodd");
}

// fillParams();
