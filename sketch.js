/**
 * @typedef {import("./p5/types").Graphics} Graphics
 * @typedef{Object}Cubo
 * @property{number}x - 立方体在 X 轴的坐标
 * @property{number}y - 立方体在 Y 轴的坐标
 * @property{number}z - 立方体在 Z 轴的坐标
 * @property{number}size - 立方体的边长
 * @property{string}color - 立方体的颜色（字符串）
 * @property{function}rotationFunction - 用于旋转立方体的函数引用（rotateX 或 rotateY）
 */

// 存放所有立方体对象的数组
/** @type{Cubo[]} */
let cubi = [];

// 希望创建的立方体数量
let copie = 50;

// 用于绘制纹理的离屏画布
/** @type{Graphics} */
let g;

function setup() {
  // 创建一个全屏的 WebGL 画布/在全屏画布上，启用 WebGL（3D）渲染
  createCanvas(windowWidth, windowHeight, "webgl");

  // 在内存中创建一个 100x100 的 2D 图形画布，用于绘制问号纹理
  g = createGraphics(100, 100);

  // 定义立方体分布的范围（距离中心的最大值）
  let disdanza = 1000;

  // 循环 copy 次，每次造一个新的 cubo 对象
  for (let i = 0; i < copie; i++) {
    let cubo = {
      // 随机生成立方体在三维空间中的坐标
      x: random(-disdanza, disdanza),
      y: random(-disdanza, disdanza),
      z: random(-disdanza, disdanza),

      // 每个立方体的固定大小
      size: 200,

      // 随机选择立方体的颜色，可以是 "blue", "pink", "black"
      color: random(["blue", "pink", "black"]),

      // 随机选择一个旋转函数：绕 X 轴旋转或绕 Y 轴旋转
      rotationFunction: random([rotateX, rotateY]),
    };
    // 把这个生成的 cubo 对象“推”进 cubi 数组中
    cubi.push(cubo);
  }
}

function draw() {
  // 设置场景背景色为灰色
  background("grey");
  // 启用鼠标交互控制，可拖拽视角
  orbitControl();
  // 全局绕 Y 轴慢速旋转，增添动态效果
  rotateY(frameCount * 0.001);

  noStroke();

  // 在离屏画布上绘制背景色（纹理底色）
  g.background("gold");

  // 设置绘制问号的文字样式：字号、自对齐和颜色
  g.textSize(g.height);
  g.textAlign(CENTER, CENTER);
  g.fill("white");
  g.text("?", g.width / 2, g.height / 2);

  // 应用离屏画布作为 3D 对象的纹理
  texture(g);

  // 遍历所有立方体，逐个绘制
  for (let cubo of cubi) {
    push();
    // 将每个立方体移动到它的三维坐标位置
    translate(cubo.x, cubo.y, cubo.z);
    // 根据帧数计算旋转速度
    let velocita = frameCount * 0.01;
    // 调用立方体对象中保存的旋转函数，实现绕 X 轴或 Y 轴旋转
    cubo.rotationFunction(velocita);
    // 额外绕 Z 轴旋转，增加复杂性
    rotateZ(velocita);
    // 给立方体添加黄色描边，以突出边缘
    stroke("yellow");
    strokeWeight(10);
    // 绘制立方体，使用之前设置的纹理和描边
    box(cubo.size);
    pop();
  }
}

function windowResized() {
  // 浏览器窗口大小改变时，调整画布尺寸以保持全屏
  resizeCanvas(windowWidth, windowHeight);
}

// for (let i = 0; i < copie; i++) {
//   let x = random(-1000, 1000);
//   let y = random(-1000, 1000);
//   let z = random(-1000, 1000);

//   push();
//   translate(x, y, z);
//   box(100);
//   pop();

//   //X轴
//   stroke("blue");
//   strokeWeight(10);
//   line(0, 0, width, 0);
//   //Y轴
//   stroke("red");
//   strokeWeight(10);
//   line(0, 0, 0, height);
//   //Z轴
//   stroke("green");
//   strokeWeight(10);
//   line(0, 0, 0, 0, 0, -1000);

//   stroke("black");

//   push();
//   translate(0, 0);
//   box(100);
//   pop();

//   push();
//   translate(width, 0);
//   box(100);
//   pop();

//   push();
//   translate(0, height);
//   box(100);
//   pop();
// }
