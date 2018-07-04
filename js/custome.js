// time header
var myVar = setInterval(myTimer, 100);

function myTimer() {
	var d = new Date();
	document.getElementById("demo").innerHTML =  Date();
}
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90
setInterval(drawClock, 1000);

function drawClock() {
drawFace(ctx, radius);
drawNumbers(ctx, radius);
drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
var grad;
ctx.beginPath();
ctx.arc(0, 0, radius, 0, 2*Math.PI);
ctx.fillStyle = 'white';
ctx.fill();
grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
grad.addColorStop(0, '#333');
grad.addColorStop(0.5, 'white');
grad.addColorStop(1, '#333');
ctx.strokeStyle = grad;
ctx.lineWidth = radius*0.1;
ctx.stroke();
ctx.beginPath();
ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
ctx.fillStyle = '#333';
ctx.fill();
}

function drawNumbers(ctx, radius) {
var ang;
var num;
ctx.font = radius*0.15 + "px arial";
ctx.textBaseline="middle";
ctx.textAlign="center";
for(num = 1; num < 13; num++){
ang = num * Math.PI / 6;
ctx.rotate(ang);
ctx.translate(0, -radius*0.85);
ctx.rotate(-ang);
ctx.fillText(num.toString(), 0, 0);
ctx.rotate(ang);
ctx.translate(0, radius*0.85);
ctx.rotate(-ang);
}
}

function drawTime(ctx, radius){
var now = new Date();
var hour = now.getHours();
var minute = now.getMinutes();
var second = now.getSeconds();
//hour
hour=hour%12;
hour=(hour*Math.PI/6)+
(minute*Math.PI/(6*60))+
(second*Math.PI/(360*60));
drawHand(ctx, hour, radius*0.5, radius*0.07);
//minute
minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
drawHand(ctx, minute, radius*0.8, radius*0.07);
// second
second=(second*Math.PI/30);
drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
ctx.beginPath();
ctx.lineWidth = width;
ctx.lineCap = "round";
ctx.moveTo(0,0);
ctx.rotate(pos);
ctx.lineTo(0, -length);
ctx.stroke();
ctx.rotate(-pos);
}

// validation contact form
function validation(){
	var firstname = document.getElementById('firstname').value;
	var lastname = document.getElementById('lastname').value;
	var email = document.getElementById('email').value;
	var subject = document.getElementById('subject').value;
	var msg = document.getElementById('msg').value;
	if(firstname==""){
		alert('Please Enter First Name');
		return false;
	}
	else if(lastname==""){
		alert('Please Enter Last Name');
		return false;
	}
	else if(email==""){
		alert('Please Enter Email Name');
		return false;
	}
	else if(subject==""){
		alert('Please Enter Subject Name');
		return false;
	}
	else if(msg==""){
		alert('Please Enter message ');
		return false;
	}
	else{
		return true;
	}
}

// End validation contact form
//  imge maginifire

function magnify(imgID, zoom) {
  var img, glass, w, h, bw;
  img = document.getElementById(imgID);
  /*create magnifier glass:*/
  glass = document.createElement("DIV");
  glass.setAttribute("class", "img-magnifier-glass");
  /*insert magnifier glass:*/
  img.parentElement.insertBefore(glass, img);
  /*set background properties for the magnifier glass:*/
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;
  /*execute a function when someone moves the magnifier glass over the image:*/
  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);
  /*and also for touch screens:*/
  glass.addEventListener("touchmove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);
  function moveMagnifier(e) {
	var pos, x, y;
	/*prevent any other actions that may occur when moving over the image*/
	e.preventDefault();
	/*get the cursor's x and y positions:*/
	pos = getCursorPos(e);
	x = pos.x;
	y = pos.y;
	/*prevent the magnifier glass from being positioned outside the image:*/
	if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
	if (x < w / zoom) {x = w / zoom;}
	if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
	if (y < h / zoom) {y = h / zoom;}
	/*set the position of the magnifier glass:*/
	glass.style.left = (x - w) + "px";
	glass.style.top = (y - h) + "px";
	/*display what the magnifier glass "sees":*/
	glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
  }
  function getCursorPos(e) {
	var a, x = 0, y = 0;
	e = e || window.event;
	/*get the x and y positions of the image:*/
	a = img.getBoundingClientRect();
	/*calculate the cursor's x and y coordinates, relative to the image:*/
	x = e.pageX - a.left;
	y = e.pageY - a.top;
	/*consider any page scrolling:*/
	x = x - window.pageXOffset;
	y = y - window.pageYOffset;
	return {x : x, y : y};
  }
}
magnify("myimage", 3);
