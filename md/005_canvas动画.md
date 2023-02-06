# 1. Canvas基础动画
## 1. canvas实现动画的基本步骤

1. 清空canvas

   只要接下来的内容没有完全充满 canvas （例如背景图），就要需要清空所有

   ```js
   ctx.clear(0,0,canvas.width,canvas.height)
   ```

2. 保存canvas状态

   如果接下来要改变 canvas 状态的设置（样式，变形之类的）， 又要在每画一帧之时都是原始状态的话，需要先保存一下

   ```javascript
   ctx.save()
   ```

3. 绘制动画图形 ( animated shapes )

   这才是动画帧的重绘

4. 恢复 canvas 状态

   如果已经保存了 canvas 的状态，可以先恢复它，然后重绘下一帧

## 2.定时重绘

+ 在 canvas 上绘制动画的每一帧调用的都是 canvas 提供的或者自定义的方法;但是它只提供了绘制动画的每一帧，要让动画动起来，那么就要定时的重绘了

+ 定时能力就不是 `<canvas>` 的能力范围了，好在 `windows` 对象够兄弟，提供了好些方法

+ 比如说 `setInterval` 、 `setTimeout` 和 `requestAnimationFrame()`

+ 这三个方法： `window.setInterval()` 、`window.setTimeout()` 和 `window.requestAnimationFrame()` 都可以定时的回调第一个方法