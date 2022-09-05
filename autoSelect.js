// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @match      http://*/*
// @match      https://*/*
// @author       You
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wiley.com
// @grant        none
// ==/UserScript==


const createSheet= (text)=>{
    const div = document.createElement('div');
    div.id = 'ownSheet';
    div.style.height ="500px";
    div.style.width ="300px";
    div.style.borderStyle = "solid";
    div.style.borderColor = "black";
    div.style.userSelect = "none";
    div.style.position = "fixed";
    div.style.top = "0px";
    div.style.right = "0px";
    const input = document.createElement('input');
    input.id = 'ownSheetInput';
    input.style.position = "absolute";
    input.style.bottom = "0px";
    input.value = text;
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.id = 'ownSheetCheck';
    check.style.position = "absolute";
    check.style.bottom = "0px";
    check.style.right = "0px";

    check.checked = true;
    div.appendChild(input);
    div.appendChild(check);
    //添加到body当中
    document.body.appendChild(div);
    return div;
};
let sheetDiv= createSheet("");
//监听粘贴
document.getElementById("ownSheetInput").addEventListener('paste',function(e){
    //获取粘贴的内容
    let clipText = e.clipboardData.getData('text/plain');
    //移除ownSheet
    const allDiv = sheetDiv.getElementsByTagName('div');
    console.log(allDiv);
    while(allDiv.length>0){
        sheetDiv.removeChild(allDiv[0]);
    }
    //创建新的ownSheet
    clickBoard = clipText;
    const text = clickBoard.trim().split('\n');
    text.forEach((item)=>{
    const div = document.createElement('div');
    div.innerText = item;
    sheetDiv.appendChild(div);
    });
    
});



let oldColor = null;
let newColor = 'red';
var tempClickBoard = "";
var clickBoard ="asd";
addEventListener('mouseover', function(event) {
    var target = event.target;

    if(target.tagName != 'BODY') {
    tempClickBoard = target.innerText;
    oldColor = target.style.backgroundColor;
    target.style.backgroundColor = newColor;
    }
});



addEventListener('mouseout', function(event) {
    let target = event.target;
    if(target.tagName!='BODY') {
        target.style.backgroundColor = oldColor;
    }
});


sheetDiv.addEventListener('click', function(event) {
    let target = event.target;
    console.log(target);
    console.dir(target);
    if(target.tagName!='BODY') {
        clickBoard = target.innerText;
    }
    if(target.id =='ownSheet') {
        // navigator.clipboard.writeText(clickBoard);
        document.getElementById('ownSheetInput').value = clickBoard;
    }
});


//给所有的input添加一个点击事件
addEventListener('click', function(event) {
    if(event.target.tagName == 'INPUT'&&event.target.id!='ownSheetInput') {
        // console.log(clickBoard);
        event.target.value = clickBoard;
        // console.log(event.target.value);
        event.stopPropagation();
    }

}
);

   
addEventListener('keydown', function(event) {
    const ifCheck = document.getElementById('ownSheetCheck').checked;
    const keyCode = event.key;
    if(keyCode == 'c'&&ifCheck) {
        clickBoard = tempClickBoard;
        const text = clickBoard.trim().split('\n');
        text.forEach((item)=>{
        const div = document.createElement('div');
        div.innerText = item;
        sheetDiv.appendChild(div);
        });
    }
}
);
