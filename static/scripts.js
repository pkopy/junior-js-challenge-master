
let arrStock;
const canvas = document.getElementById('chart')
const ctx = canvas.getContext('2d')

function drawLine (start, end, style,line) {
  ctx.beginPath()
  ctx.lineWidth = line || 3
  ctx.strokeStyle = style || 'black'
  ctx.moveTo(...start)
  ctx.lineTo(...end)
  ctx.stroke()
}

function drawTriangle (apex1, apex2, apex3) {
  ctx.beginPath()
  ctx.moveTo(...apex1)
  ctx.lineTo(...apex2)
  ctx.lineTo(...apex3)
  ctx.fill()
}

function drawName (name, x, y){
  ctx.beginPath()
  ctx.font = 20 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  ctx.fillText(name, x, y)
}

drawLine([50, 50], [50, 550], 'black' ,2)
drawTriangle([35, 50], [65, 50], [50, 35])

drawLine([50, 550], [950, 550], 'black',2)
drawTriangle([950, 535], [950, 565], [965, 550])
let a;
let arr = [];
let arrHelp = [];
let xx =0
function loadData(x, col, qty, i) {
drawLine([100, 50+i*30],[150, 50+i*30],col, 6)
drawName(x, 190, 50+i*30)
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    xx++
    a = this.responseText
    arrHelp.push(x)
    if(a != ""){
      drawName('OK', 250, 50+i*30)
    }else{
        drawName('NO DATA', 275, 50+i*30)
    }
    if(xx >= qty){
      document.querySelectorAll('.spinner')[0].className += ' hide'
    }
    drawChart(arr, a, col)
  }
  arr = []
};
  xhttp.open("GET", "/stocks/" + x, true);
  xhttp.send(); 
}

function loadStock(){
  const xhttp = new XMLHttpRequest();
  const col = ["red", "blue", "green", "yellow", "pink"]
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      a = this.responseText
      let x = a.slice(17, -2).split('"');
      let arr2=[]
      for(let i = 0; i < x.length; i++){
        if(i%2 !=0){
          arr2.push(x[i])
        }
      }
      for(let i = 0; i < arr2.length; i++){
       
        loadData(arr2[i], col[i], arr2.length,i)
      } 
      describeChart()
    }
  };
  xhttp.open("GET", "/stocks", true);
  xhttp.send(); 
}
function describeChart(){
  drawName('0', 50, 570)
  for(i = 1; i < 19; i++){
    if(i%2 != 0){
      drawLine([50 + 50*i, 550], [50+50*i, 545], 'black', 2)
      drawName(i, 50+100 * i, 570)
    }else{
      drawLine([50 + 50 * i, 550], [50 + 50 * i, 540], 'black', 2)
      drawName(i, 50 + 100 * i, 570)
    }
    
  }
  for(i = 1; i < 10; i++){
    if(i%2 != 0){
      drawLine([50, 550 - 50 * i], [55, 550 - 50 * i], 'black', 2)
      drawName(i * 50, 20, 550 - 100 * i)
    }else{
      drawLine([50, 550 - 50 * i], [60, 550 - 50 * i], 'black', 2)
      drawName(i * 50, 20, 550 - 100 * i)
    }
    
  }
}

loadStock()
function drawChart(arr3, str, col, line){
  let x = 0;
  let indx = 0;
  while(x < str.length-2){
   let start = str.indexOf('{', indx);
   indx = start;
   let end = str.indexOf('}', indx);
   
    let data = str.slice(start+1, end);
    let comaIndex = data.indexOf(',')
    let value = data.slice(8, comaIndex);
    let colonIndex = data.indexOf(':', comaIndex )
    let timeStamp = data.slice(colonIndex+1)
    arr3.push({value: value, timeStamp: (Date.now() - timeStamp)/3600000})
    indx = end;
    x = end;
  }
  for(let i = 0; i < arr3.length - 1; i++){
    let scale = 2;
    drawLine( [(50 + (9-arr[i].timeStamp)*100), (550- (arr[i].value)*scale) ],[(50 + (9-arr[i+1].timeStamp)*100), (550 - (arr[i+1].value)*scale)],  col, line)
  }
}





