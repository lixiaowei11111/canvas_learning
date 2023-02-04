import ctx from "./index.js";

// 1. 绘制 填充文本
function handleFillText() {
  ctx.font = "48px serif";
  ctx.fillText("Hello world", 100, 100);
}

// handleFillText();

// 2. 绘制 文本边框
function handleStrokeText() {
  ctx.font = "48px serif";
  ctx.strokeText("Hello world", 100, 100);
}

// handleStrokeText();

// 3. 有样式的文本
function styleText() {
  ctx.font = "20px serif";
  ctx.textAlign = "left";
  ctx.direction = "ltr";
  ctx.textBaseline = "alphabetic";
  ctx.strokeText("Hello world 哈哈", 100, 100);
  console.log(ctx.measureText("hellow world哈哈"));
}

// styleText();

// 4. 绘制图像
function useDrawImage() {
  const img = document.images[0];
  ctx.drawImage(img, 0, 0, 150, 150);
  ctx.drawImage(img, 0, 0, 150, 150, 160, 160, 150, 150);
}

useDrawImage();
