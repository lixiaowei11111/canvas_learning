import ctx from "./index.js";

function solarSystem() {
  const sun = new Image();
  const moon = new Image();
  const earth = new Image();

  function init() {
    sun.src = "https://www.twle.cn/static/i/canvas/canvas_animation_sun.png";
    moon.src = "https://www.twle.cn/static/i/canvas/canvas_animation_moon.png";
    earth.src =
      "https://www.twle.cn/static/i/canvas/canvas_animation_earth.png";
    window.requestAnimationFrame(draw);
  }

  function draw() {
    // 设置组合方式
    ctx.globalCompositeOperation = "destination-over";
    ctx.clearRect(0, 0, 600, 600);

    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.strokeStyle = "rgba(0,153,255,0.4)";
    ctx.save();
    ctx.translate(150, 150);

    // Earth
    var time = new Date();
    ctx.rotate(
      ((2 * Math.PI) / 60) * time.getSeconds() +
        ((2 * Math.PI) / 60000) * time.getMilliseconds()
    );
    ctx.translate(105, 0);
    ctx.fillRect(0, -12, 50, 24); // Shadow
    ctx.drawImage(earth, -12, -12);

    // Moon
    ctx.save();
    ctx.rotate(
      ((2 * Math.PI) / 6) * time.getSeconds() +
        ((2 * Math.PI) / 6000) * time.getMilliseconds()
    );
    ctx.translate(0, 28.5);
    ctx.drawImage(moon, -3.5, -3.5);
    ctx.restore();

    ctx.restore();

    ctx.beginPath();
    ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Earth orbit
    ctx.stroke();

    ctx.drawImage(sun, 0, 0, 300, 300);

    window.requestAnimationFrame(draw);
  }
  return init();
}

solarSystem();
