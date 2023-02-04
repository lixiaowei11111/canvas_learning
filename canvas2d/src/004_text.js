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

// useDrawImage();

// 5. save() 和 restore的使用 ,save

function useSaveOrRestore() {
  ctx.fillRect(100, 100, 200, 200); // 使用默认设置绘制一个矩形
  ctx.save(); // 保存默认状态

  ctx.fillStyle = "#09F"; // 在原有配置基础上对颜色做改变
  ctx.fillRect(120, 120, 160, 160); // 绘制一个新的矩形

  ctx.save(); // 保存当前状态
  ctx.fillStyle = "#FFF"; //再次改变颜色配置
  ctx.gloablAlpha = "0.5";
  ctx.fillRect(140, 140, 120, 120); // 使用新的配置绘制一个矩形

  ctx.restore(); // 重新加载之前的颜色状态
  ctx.fillRect(160, 160, 80, 80); //使用上一次的配置绘制一个矩形

  ctx.restore(); // 加载默认颜色配置
  ctx.fillRect(180, 180, 40, 40); // 使用加载的配置绘制一个矩形
}

// useSaveOrRestore();

// 6. translate的使用
function useTranslate() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      ctx.save();
      ctx.fillStyle = `rgb(${51 * i},${255 - i * 51},255)`;
      console.log(ctx.fillStyle, "fillStyle");
      ctx.translate(10 + j * 50, 10 + i * 50);
      ctx.fillRect(100, 100, 25, 25);
      ctx.restore();
    }
  }
}

// useTranslate();

// 7. rotate的使用
function useRotate() {
  ctx.save(); // 记录一个初始状态

  ctx.fillStyle = "#0095DD";
  ctx.fillRect(100, 100, 100, 100);
  ctx.rotate((Math.PI / 180) * 25); // 旋转25度

  ctx.fillStyle = "#4D4E53";
  ctx.fillRect(100, 100, 100, 100);
  ctx.restore();

  ctx.fillStyle = "#0095DD";
  ctx.fillRect(220, 100, 100, 100);

  ctx.translate(200, 80); // 更改旋转圆点

  ctx.rotate((Math.PI / 180) * 25);
  ctx.translate(-200, -80);

  ctx.fillStyle = "#4D4E53";
  ctx.fillRect(220, 100, 100, 100);
}

// useRotate();

// 8. scale(x,y) 的使用, x,y为负实数时,会以下x,y为轴对称镜像反转

function useScale() {
  ctx.save();
  ctx.fillRect(10, 10, 10, 10);
  ctx.scale(10, 3);
  ctx.fillRect(10, 10, 10, 10);
  ctx.restore();

  // mirror horizontally
  ctx.scale(-1, 1);
  ctx.font = "48px serif";
  ctx.fillText("MDN", -135, 120);
}

useScale();
