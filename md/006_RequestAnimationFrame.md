## 1. window.requestAnimationFrame
+ window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行

+ **备注：** 若你想在浏览器下次重绘之前继续更新下一帧动画，那么回调函数自身必须再次调用 `window.requestAnimationFrame()`

+ 为了提高性能和电池寿命，因此在大多数浏览器里，当`requestAnimationFrame()` 运行在后台标签页或者隐藏的iframe里时，`requestAnimationFrame()` 会被暂停调用以提升性能和电池寿命。

+ 回调函数会被传入[`DOMHighResTimeStamp`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMHighResTimeStamp)参数，[`DOMHighResTimeStamp`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMHighResTimeStamp)指示当前被 `requestAnimationFrame()` 排序的回调函数被触发的时间。在同一个帧中的多个回调函数，它们每一个都会接受到一个相同的时间戳，即使在计算上一个回调函数的工作负载期间已经消耗了一些时间。该时间戳是一个十进制数，单位毫秒，最小精度为 1ms(1000μs)。

+ 语法

  ```
  window.requestAnimationFrame(callback);
  ```

  Copy to Clipboard

+ 参数

- `callback`

  下一次重绘之前更新动画帧所调用的函数 (即上面所说的回调函数)。该回调函数会被传入[`DOMHighResTimeStamp`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMHighResTimeStamp)参数，该参数与[`performance.now()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/now)的返回值相同，它表示`requestAnimationFrame()` 开始去执行回调函数的时刻。

### [返回值](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame#返回值)

一个 `long` 整数，请求 ID，是回调列表中唯一的标识。是个非零值，没别的意义。你可以传这个值给 [`window.cancelAnimationFrame()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelAnimationFrame) 以取消回调函数。

```javascript
const element = document.getElementById('some-element-you-want-to-animate');
let start, previousTimeStamp;
let done = false

function step(timestamp) {
  if (start === undefined) {
    start = timestamp;
  }
  const elapsed = timestamp - start;

  if (previousTimeStamp !== timestamp) {
    // 这里使用 `Math.min()` 确保元素刚好停在 200px 的位置。
    const count = Math.min(0.1 * elapsed, 200);
    element.style.transform = 'translateX(' + count + 'px)';
    if (count === 200) done = true;
  }

  if (elapsed < 2000) { // 在两秒后停止动画
    previousTimeStamp = timestamp;
    if (!done) {
      window.requestAnimationFrame(step);
    }
  }
}

window.requestAnimationFrame(step);
```





## 2. window.cancelAnimationFrame

+ 取消一个先前通过调用[`window.requestAnimationFrame()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)方法添加到计划中的动画帧请求。

+ 语法

  ```
  window.mozCancelAnimationFrame(requestID);               // Firefox
  ```

+ 参数

  - `requestID`

    先前调用[`window.requestAnimationFrame()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)方法时返回的 ID.

  ```javascript
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  
  var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
  
  var start = window.mozAnimationStartTime;  // 只有 Firefox 支持 mozAnimationStartTime 属性，其他浏览器可以使用 Date.now() 来替代。
  
  var myReq;
  function step(timestamp) {
    var progress = timestamp - start;
    d.style.left = Math.min(progress/10, 200) + "px";
    if (progress < 2000) {
      myReq = requestAnimationFrame(step);
    }
  }
  myReq = requestAnimationFrame(step);
  
  window.cancelAnimationFrame(myReq);
  ```

## 3.  DOMHighResTimeStamp

+ **`DOMHighResTimeStamp`** 是一个 double 类型，用于存储毫秒级的时间值。这种类型可以用来描述离散的时间点或者一段时间（两个离散时间点之间的时间差）。

  这种基于毫秒精度的时间，应该精确到 5 微秒级别，其数值的小数部分代表了一个毫秒的小数（也就是微秒）。但是，如果浏览器不能提供精确到 5 微秒的时间值 (例如，由于硬件或软件的限制)，浏览器可以在表示一个以毫秒为单位的时间值时，精确到毫秒级别。同时要注意，由浏览器首选项控制的**降低时间精度**，是为了防止时序攻击和记录指纹。

  此外，如果用户代理运行所在的设备或操作系统不具备精确到微秒级别的时钟，那么他们只能精确到毫秒。

+ `DOMHighResTimeStamp` 的值是一个双精度浮点数，它描述了两个时间点之间的经过的毫秒数（可以精确到 5 微秒，如果设备支持）。开始时间可以是由网站或 app 中的脚本定义的一个特定时间 T，也可以是**时间源**。

  #### 时间源

  **时间源**是一个可以被认定为当前文档生命周期的开始节点的标准时间，计算方法如下：

  - 如果脚本的global object是`Window`, 则时间源的确定方式如下：
    - 如果当前 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 是中加载的第一个 `Window`, 则**时间源**是创建浏览器上下文的时间。
    - 如果处于卸载窗口中已加载的先前文档的过程中， 一个确认对话框会显示出来，让用户确认是否离开前一页，则**时间源**是用户确认导航到新页面的这个时间，这一点是被认同的。
    - 如果以上方式都不能确定**时间源**, 那么**时间源**是创建窗口中当前 `Document` 的导航发生的时机。
  - 如果脚本中的全局对象是 [`WorkerGlobalScope`](https://developer.mozilla.org/zh-CN/docs/Web/API/WorkerGlobalScope) (意味着，该脚本以 web worker 的形式运行), 则**时间源**是这个 worker 被创建的时刻。
  - 在所有其他情况下，**时间源**的值是 undefined。

+ 用法说明

  您可以通过调用 [`performance`](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance) 的 [`now()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/now) 方法来获取当前的时间戳的值（自创建上下文以来经过的时间）。此方法在 [`Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window) 和 [`Worker`](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker) 上下文中均可用。
