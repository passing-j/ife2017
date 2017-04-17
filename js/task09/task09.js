// 声明DOM数组
var childLists = [];
// 用于遍历时参数转移
var index = 0;
// 获取选择器
function $(id) {
  return document.querySelector(id);
}
// 广度优先遍历
function BFS(node) {
  if ((node) && (node.tagName == "DIV")) {
    // 当前节点推入数组
    childLists.push(node);
    // 遍历下一个兄弟元素节点
    BFS(node.nextElementSibling);
    // 参数转移给刚遍历完成的节点
    node = childLists[index++];
    // 遍历当前节点的第一个子元素节点
    BFS(node.firstElementChild);
  }
}
// 声明点击改变颜色的函数
function changeColor() {
  // 为每一个元素节点设置监听事件
  for (let i = 0; i < childLists.length; i++) {
    childLists[i].addEventListener('click', function(event) {
      // 点击任意元素节点，所有元素节点的颜色重置
      for (let j = 0; j < childLists.length; j++) {
        childLists[j].setAttribute('class', '');
      }
      // 被点击的元素节点改变颜色
      childLists[i].setAttribute('class', 'changeColor');
      // 阻止被点击的元素节点向上冒泡
      event.stopPropagation();
    });
  }
}
// 声明删除函数
$("#dele").onclick = function() {
  // 遍历DOM数组
  for (let i = 0; i < childLists.length; i++) {
    // 如果某元素节点有背景色，就移除该元素节点及其子节点
    if (childLists[i].getAttribute('class') == 'changeColor') {
      childLists[i].parentNode.removeChild(childLists[i]);
      // 提前跳出循环
      i = childLists.length;
    }
  }
}
// 声明添加节点的函数
$("#add-node").onclick = function() {
  // 获取文本框中的值
  var nodeVal = $("#child-node").value;
  var div = document.createElement('div');
  div.innerText = nodeVal;
  // 遍历寻找有背景色的节点
  for (let i = 0; i < childLists.length; i++) {
    if (childLists[i].getAttribute('class') == 'changeColor') {
      // 把新元素节点作为子节点，添加到有背景色的元素节点的最后
      childLists[i].appendChild(div);
      // 提前结束循环
      i = childLists.length;
    }
  }
  // 重新渲染页面，让新增元素具有之前元素的属性方法
  init();
}
// 声明页面初次加载时运行的函数
function init() {
  BFS($("#root"));
  changeColor();
}
init();
