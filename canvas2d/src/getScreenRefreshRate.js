/**
 * Allows to obtain the estimated Hz of the primary monitor in the system.
 *
 * @param {Function} callback The function triggered after obtaining the estimated Hz of the monitor.
 * @param {Boolean} runIndefinitely If set to true, the callback will be triggered indefinitely (for live counter).
 */
function getScreenRefreshRate(callback, runIndefinitely) {
  let requestId = null
  let callbackTriggered = false
  runIndefinitely = runIndefinitely || false

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame =
      window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame
  }

  const DOMHighResTimeStampCollection = []

  /**
   * 注意：DOMHighResTimesStasmp是一个时间戳， 指示requestAnimationFrame开始执行回调函数的时间点，而不是一个时间段
   * FPS 表示的是每秒钟画面更新次数。我们平时所看到的连续画面都是由一幅幅静止画面组成的，每幅画面称为一帧，FPS 是描述“帧”变化速度的物理量。

  *  理论上说，FPS 越高，动画会越流畅，目前大多数设备的屏幕刷新率为 60 次/秒，所以通常来讲 FPS 为 60 frame/s 时动画效果最好，也就是每帧的消耗时间为 (1000/60) 16.67ms。
   * 计算规则如下, 计算requestAnimation中的triggerAnimation函数运行的次数,到达10次以后,用最新的高精度时间减去第一次的时间的到执行10次函数的总时间
   * 1000*10/10*runFuncTimes=fps
   */
  const triggerAnimation = function(DOMHighResTimeStamp) {
    /** 未运行10次以上时，记录时间到该数组 */
    DOMHighResTimeStampCollection.unshift(DOMHighResTimeStamp)

    if (DOMHighResTimeStampCollection.length > 10) {
      const t0 = DOMHighResTimeStampCollection.pop()
      const fps = Math.ceil((1000 * 10) / (DOMHighResTimeStamp - t0))

      if (!callbackTriggered) {
        /** 执行回调 */
        callback.call(undefined, fps, DOMHighResTimeStampCollection)
      }

      if (runIndefinitely) {
        callbackTriggered = false
      } else {
        callbackTriggered = true
      }
    }

    requestId = window.requestAnimationFrame(triggerAnimation)
  }

  window.requestAnimationFrame(triggerAnimation)

  // Stop after half second if it shouldn't run indefinitely
  if (!runIndefinitely) {
    window.setTimeout(function() {
      window.cancelAnimationFrame(requestId)
      requestId = null
    }, 1000)
  }
}

export default getScreenRefreshRate
