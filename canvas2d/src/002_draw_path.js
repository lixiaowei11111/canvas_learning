import ctx from "./index.js";
console.log(ctx, "2d ctx");

//1. 绘制一个三角形
function drawTriangle() {
  ctx.beginPath();
  ctx.moveTo(100, 100);
  ctx.lineTo(140, 140);
  ctx.lineTo(100, 180);
  ctx.fill();
}

// drawTriangle();

// 2. 绘制一个笑脸
function drawSmile() {
  ctx.beginPath();
  // moveTo 笔开始画的位置
  ctx.arc(200, 200, 100, 0, Math.PI * 2, true); // 半圆
  ctx.moveTo(255, 200); // 移动到绘制的起点的正下方
  ctx.arc(200, 200, 55, 0, Math.PI, false); // 顺时针
  ctx.moveTo(190, 180);
  ctx.arc(180, 180, 10, 0, Math.PI * 2, true); // 左眼
  ctx.moveTo(230, 180);
  ctx.arc(220, 180, 10, 0, Math.PI * 2, true); // 右眼
  ctx.stroke();
}

// drawSmile();

// 3. 绘制一个不带数字的表盘
function drawDial() {
  ctx.beginPath(); // 开始绘制
  ctx.arc(200, 200, 100, 0, Math.PI * 2, true); // 绘制外圆
  ctx.moveTo(290, 200); // 内圆
  ctx.arc(200, 200, 90, 0, Math.PI * 2, true); // 内圆
  ctx.moveTo(200, 200);
  ctx.lineTo(200, 260); // 分针
  ctx.moveTo(200, 200);
  ctx.lineTo(120, 200); // 时针
  console.log(ctx.isPointInPath(200, 200)); //true isPointInPath 接收 x 轴和 y 轴坐标作为参数。
  // 这个方法用于确定指定的点是否在路径上，可以在关闭路径前随时调用
  ctx.stroke();
}

// drawDial();

// 4. 绘制 12个不同角度的圆弧, 4列3行, 每列增加90度
// 下面两个for循环，生成圆弧的行列（x,y）坐标。每一段圆弧的开始都调用beginPath()。代码中，每个圆弧的参数都是可变的，实际编程中，我们并不需要这样做。

// x,y 坐标是可变的。半径（radius）和开始角度（startAngle）都是固定的。结束角度（endAngle）在第一列开始时是 180 度（半圆）然后每列增加 90 度。最后一列形成一个完整的圆。

// clockwise语句作用于第一、三行是顺时针的圆弧，anticlockwise作用于二、四行为逆时针圆弧。if语句让一、二行描边圆弧，下面两行填充路径。

function drawCircle() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      ctx.beginPath();
      const x = 25 + j * 50; // x坐标 三行
      const y = 25 + i * 50; // y坐标
      const radius = 20; // 圆弧半径
      const startAngel = 0; // 开始点
      const endAngle = Math.PI + (Math.PI * j) / 2; // 结束点
      const anticeclockwise = i % 2 === 0 ? false : true; // 顺时针 或者逆时针
      ctx.arc(x, y, radius, startAngel, endAngle, anticeclockwise);
      if (i > 1) {
        ctx.fill(); // 结束绘制
      } else {
        ctx.stroke(); // 结束绘制
      }
    }
  }
}

// drawCircle();

// 5. 贝塞尔曲线绘制
function drawQuadraticCurve() {
  ctx.beginPath(); // 开始绘制
  ctx.moveTo(100, 100); // 开始点
  ctx.quadraticCurveTo(50, 100, 50, 150); // 控制点 x,y; 结束点 x,y
  // console.log(ctx.isPointInPath(100, 100));
  ctx.quadraticCurveTo(50, 200, 100, 200);
  ctx.quadraticCurveTo(100, 220, 70, 225);
  ctx.quadraticCurveTo(100, 220, 120, 200);
  ctx.quadraticCurveTo(160, 200, 160, 150);
  ctx.quadraticCurveTo(160, 100, 100, 100);

  ctx.stroke(); // 绘制线条
}

// drawQuadraticCurve();

// 6. 组合使用
// 封装一个 用于绘制圆角矩形的函数
function roundedRect(ctx, x, y, width, height, radius) {}

function drawGame() {}

// 7. Path2D对象的使用
function usePath2D() {
  const rectangle = new Path2D();
  rectangle.rect(100, 100, 100, 100);

  const circle = new Path2D();
  circle.moveTo(250, 250);
  circle.arc(250, 250, 30, 0, Math.PI * 2, false);

  ctx.stroke(rectangle);
  ctx.fill(circle);
}

// usePath2D();
