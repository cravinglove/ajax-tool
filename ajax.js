// 这个JS文件封装发送AJAX的方式
var ajax = {

};
/*
 * 定义发送get请求的方式
 * @url 本次请求发送的地址
 * @data 附加数据（字符串或者对象）
 * @callback 回调函数
 */

ajax.get = function(url, data, callback){
  var addData = '';
  // 判断data类型是字符串还是对象
  if(typeof data === 'string') {
    addData = data;
  }else{
    // data为对象
    // 转为字符串
    for (var i in data) {
      addData += i + "=" + data[i] + "&";
    }
    addData = addData.slice(0,-1);
  }
  // 第一步 初始化xhr对象
  var xhr = new XMLHttpRequest();
  // 第二步 确定onreadystatechange事件
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4) {
      var result = (new Function("return " + xhr.responseText))();
      callback && callback(result);
    }
  };
  // 第三步 调用open方法
  xhr.open("get",url + "?" + addData);
  // 调用send方法
  xhr.send();
}

/*
 * 定义发送post请求的方式
 * @url 本次请求发送的地址
 * @data 附加数据（字符串或者对象）
 * @callback 回调函数
 */

ajax.post = function(url, data, callback){
  var addData = '';
  // 判断data类型是字符串还是对象
  if(typeof data === 'string') {
    addData = data;
  }else{
    // data为对象
    // 转为字符串
    for (var i in data) {
      addData += i + "=" + data[i] + "&";
    }
    addData = addData.slice(0,-1);
  }
  // 第一步 初始化xhr对象
  var xhr = new XMLHttpRequest();
  // 第二步 确定onreadystatechange事件
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4) {
      var result = (new Function("return " + xhr.responseText))();
      callback && callback(result);
    }
  };
  // 第三步 调用open方法
  xhr.open("post",url);
  xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
  // 调用send方法
  xhr.send(addData);
}

// 仿照jquery的serialize方法，可以传入表单元素，就可以获得序列化后的键值对
ajax.serialize = function(form){
  var result = '';
  // 首先得到表单中的所有控件（form.elements)
  var elements  = form.elements;
  //
  var arr = [];
  for(var i = 0;i< elements.length; i++){
    // 判断该元素是否有name属性
    if(elements[i].name){
      arr.push(elements[i]);
    }
  }
  // 循环判断控件类型
  for(var i = 0;i<arr.length;i++){
    if(arr[i].type === "text"){
      result += arr[i].name + '=' + arr[i].value + '&';
    } else if(arr[i].type === 'radio' && arr[i].checked) {
      result += arr[i].name + '=' + arr[i].value + '&';
    }else if(arr[i].type === "checkbox"){
      result += arr[i].name + '=' + arr[i].value + '&';
    }
  }
  // 清除结尾多余的&
  result = result.slice(0, -1);
  return result;
}
