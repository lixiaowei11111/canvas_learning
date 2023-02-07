import ctx from "./index.js";

// useClip();
function init() {
  var $ = {};

  $.Particle = function (opt) {
    this.radius = 7;
    this.x = opt.x;
    this.y = opt.y;
    this.angle = opt.angle;
    this.speed = opt.speed;
    this.accel = opt.accel;
    this.decay = 0.01;
    this.life = 1;
  };

  $.Particle.prototype.step = function (i) {
    this.speed += this.accel;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.angle += $.PI / 64;
    this.accel *= 1.01;
    this.life -= this.decay;

    if (this.life <= 0) {
      $.particles.splice(i, 1);
    }
  };

  $.Particle.prototype.draw = function (i) {
    $.ctx.fillStyle = $.ctx.strokeStyle =
      "hsla(" + ($.tick + this.life * 120) + ", 100%, 60%, " + this.life + ")";
    $.ctx.beginPath();
    if ($.particles[i - 1]) {
      $.ctx.moveTo(this.x, this.y);
      $.ctx.lineTo($.particles[i - 1].x, $.particles[i - 1].y);
    }
    $.ctx.stroke();

    $.ctx.beginPath();
    $.ctx.arc(
      this.x,
      this.y,
      Math.max(0.001, this.life * this.radius),
      0,
      $.TWO_PI
    );
    $.ctx.fill();

    var size = Math.random() * 1.25;
    $.ctx.fillRect(
      ~~(this.x + (Math.random() - 0.5) * 35 * this.life),
      ~~(this.y + (Math.random() - 0.5) * 35 * this.life),
      size,
      size
    );
  };

  $.step = function () {
    $.particles.push(
      new $.Particle({
        x: $.width / 2 + (Math.cos($.tick / 20) * $.min) / 2,
        y: $.height / 2 + (Math.sin($.tick / 20) * $.min) / 2,
        angle: $.globalRotation + $.globalAngle,
        speed: 0,
        accel: 0.01,
      })
    );

    $.particles.forEach(function (elem, index) {
      elem.step(index);
    });

    $.globalRotation += $.PI / 6;
    $.globalAngle += $.PI / 6;
  };

  $.draw = function () {
    $.ctx.clearRect(0, 0, $.width, $.height);

    $.particles.forEach(function (elem, index) {
      elem.draw(index);
    });
  };

  $.init = function () {
    $.ctx = ctx;
    $.width = 300;
    $.height = 300;
    $.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    $.min = $.width * 0.5;
    $.particles = [];
    $.globalAngle = 0;
    $.globalRotation = 0;
    $.tick = 0;
    $.PI = Math.PI;
    $.TWO_PI = $.PI * 2;
    $.ctx.globalCompositeOperation = "lighter";
    $.loop();
  };

  $.loop = function () {
    window.requestAnimationFrame($.loop);
    $.step();
    $.draw();
    $.tick++;
  };

  $.init();
}

// init();

// 裁切
function drawStar(ctx, r) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(r, 0);
  for (var i = 0; i < 9; i++) {
    ctx.rotate(Math.PI / 5); // 先旋转再lineTo
    if (i % 2 == 0) {
      ctx.lineTo((r / 0.525731) * 0.200811, 0);
    } else {
      ctx.lineTo(r, 0);
    }
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function useClip() {
  ctx.fillRect(0, 0, 150, 150);
  ctx.translate(75, 75);

  // Create a circular clipping path
  ctx.beginPath();
  ctx.arc(0, 0, 60, 0, Math.PI * 2, true);
  ctx.clipStyle = "rgba(0,0,0,0.5)";
  ctx.clip();

  // draw background
  var lingrad = ctx.createLinearGradient(0, -75, 0, 75);
  lingrad.addColorStop(0, "#232256");
  lingrad.addColorStop(1, "#bfa");

  ctx.fillStyle = lingrad;
  ctx.fillRect(-75, -75, 150, 150);

  // draw stars
  for (var j = 1; j < 50; j++) {
    ctx.save();
    ctx.fillStyle = "#fff";
    ctx.translate(
      75 - Math.floor(Math.random() * 150),
      75 - Math.floor(Math.random() * 150)
    );
    drawStar(ctx, Math.floor(Math.random() * 4) + 2);
    ctx.restore();
  }
}

// useClip();

function handleDrawStart() {
  const angle = Math.PI / 180;
  ctx.beginPath();
  ctx.lineWidth = 100;
  ctx.translate(100, 100);
  ctx.moveTo(0, 0);

  // ctx.rotate(Math.PI / 2);
  // ctx.translate(200, 200);
  ctx.lineTo(100, 100);

  // ctx.rotate(Math.PI / 5);
  // ctx.lineTo(20, 0);

  // ctx.rotate(Math.PI / 5);
  // ctx.lineTo(4, 0);

  // ctx.rotate(Math.PI / 5);
  // ctx.lineTo(20, 0);

  // ctx.rotate(Math.PI / 5);
  // ctx.lineTo(4, 0);

  // ctx.rotate(Math.PI / 5);
  // ctx.lineTo(20, 0);

  // ctx.rotate(Math.PI / 5);
  // ctx.lineTo(4, 0);

  // ctx.rotate(Math.PI / 5);
  // ctx.lineTo(20, 0);

  // ctx.rotate(Math.PI / 5);
  // ctx.lineTo(4, 0);

  ctx.stroke();
  ctx.closePath();
}

// handleDrawStart();

// 创建一个出ImageData对象
function createImageDataFunc() {
  const imgData = new ImageData(1, 1);
  console.log(imgData);
}

// createImageDataFunc();

// 使用 getImageData() 获取 canvas上的数据

function useGetImageData() {
  ctx.fillStyle = "#bfa";
  ctx.fillRect(0, 0, 200, 200);
  console.log(ctx.getImageData(122, 122, 1, 1), "未超出");
  console.log(ctx.getImageData(800, 800, 1, 1), "超出");
}

// useGetImageData();

function usePutImageData() {
  ctx.save();
  ctx.translate(100, 100);
  ctx.fillStyle = "#bfa";
  ctx.fillRect(0, 0, 50, 120);
  ctx.rotate((Math.PI / 180) * -30);
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, 50, 120);
  ctx.restore();
  const imgData = ctx.getImageData(100 + 50, 100 + 50, 50, 50);
  ctx.putImageData(imgData, 300, 150);
  ctx.strokeStyle = "red";
  ctx.strokeRect(100, 100, 50, 50);
}

// usePutImageData();
