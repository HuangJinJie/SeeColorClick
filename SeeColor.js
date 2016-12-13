/**
 * Created by Jancy on 2015/4/7 0007.
 */

// var gameView = document.getElementById('gameView');
// var cxt= gameView.getContext("2d");
var stage = new createjs.Stage("gameView");
createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick",stage);
var gameView = new createjs.Container();
stage.addChild(gameView);

function startGame(){
    getCanvasSize();
    n = 6;
    addRect();
}

function submit(){
    var input =  document.getElementById("inputnum");
    var num = input.value;

    if(num == undefined || num == null || isNaN(num) || isNull(num)){
        alert('请输入数字');
        input.value = '';
        input.placeholder = '请输入大三角形边上的小三角形个数,上次输入的值为'+n;
    }else{
        n = num;
        input.value = '';
        input.placeholder = '本次输入的值为'+num+',可再次输入数值改变三角形个数';
    }

    gameView.removeAllChildren();
    addRect();
}


function isNull( str ){
    if ( str == "" ) return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
}


function addRect(){
    // var color = '#' + parseInt(Math.random()*1000000);
    // var Rectcolor ='#' + parseInt(Math.random()*1000000);

    var color = '#000000';
    var Rectcolor = '#ffffff';
    var colors = ['#000000','#ffffff','#ff0000','#ff7f00','#ffff00','#00ff00','#00ffff','#0000ff','#8b00ff']; //增填红橙色黄绿青蓝紫的颜色数组
    var x = parseInt(Math.random() * (n - 1));     //x与y的取值，是在一个数学二维坐标系的可行域，即y的取值收x的大小所限制y<=2*x-1
    var y = parseInt(Math.random() * (2*x));
    // for(var indexX = 0; indexX < n; indexX++){
    //     for(var indexY = 0; indexY < n; indexY++){
    //         var r = new SeeColorRect(n, color,Rectcolor);
    //         gameView.addChild(r);
    //         r.x = indexX;
    //         r.y = indexY;
    //         if(r.x == x && r.y == y){
    //             r.setRectType(2);
    //         }
    //         r.x = indexX * (getSize()/n);
    //         r.y = indexY * (getSize()/n);
    //         if(r.getRectType() == 2){
    //             r.addEventListener("click",clickRect);
    //         }
    //     }
    // }

    var type = new Array();                                 //定义一个二维数组type用于记录小三角形的位置坐标，即小三角形在大三角形的第几行第几列
    for(var indexX = (n - 1); indexX >= 0; indexX--){       //等腰三角形与正方形类比 ，可看成每行的个数是一个等差数列的项

    	type[indexX] = new Array();
        for(var indexY = 0; indexY < (2 * indexX + 1); indexY++){

            var r = new SeeColorRect(n, colors,indexY);
            type[indexX][indexY] = r;
            gameView.addChild(r);

            // if(indexX == x && indexY == y){
            //     r.setRectType(2);
            // }

            r.x = indexY * (getSize()/(2*n)) + (n - 1 -indexX) * (getSize()/(2*n));
            r.y = indexX * (getSize()/n);

            // if(r.getRectType() == 2){
            //     r.addEventListener("click",clickRect);
            // }

            r.addEventListener("click",function change(event){     //此处根据event函数的回调参数来判断点击的小三角形位于大三角形坐标的哪一行哪一列

            	var row = parseInt(event.stageY / (getSize()/n));              //得到行数

            	var column = parseInt((event.stageX - (getSize()-(getSize() / n) *(row + 1))/2) / (getSize()/(2*n)));//得到列数,可以根据这时候得到的column判断该小三角形所在的列可能为n-1或者为n，需进一步判断

            	var dx,dy;                           //分别用于记录横纵坐标对于指定单元标准点（单元点位getSize()/(2*n)）的距离差
            	if(column % 2 == 0){                 //如果column为偶数，说明横坐标所在直立等腰三角形的左半部分
            		dx = event.stageX -((getSize()-((row+1)*(getSize()/n)))/2) - column * (getSize()/(2*n));
            		dy = (getSize() / n) *(row + 1) - event.stageY;
            		if(dy >= 2 * dx){                 //若dy > 2 * dx 即斜率k值大于2,表明该坐标处于倒立三角形的位置
            			column = column - 1;
            		}
            		console.log('左');
            		console.log('row='+row+',column='+column); 
            	}else{                               //如果column为奇数，说明横坐标所在直立等腰三角形的右半部分

            		dx = (column +1) * (getSize()/(2*n)) - (event.stageX-((getSize()-(row+1)*(getSize()/n))/2));
            		dy = (getSize() / n) *(row + 1) - event.stageY;
            		if(dy <= 2 * dx){                 //若dy < 2 * dx 即斜率k值小于-2,表明该坐标处于正立三角形的位置
            			column = column - 1;
            		}
            		console.log('右');
                 console.log('row='+row+',column='+column); 
             }

             type[row][column].changeType();

         });
        }

    }


}


function clickRect(){
    if(n < 24){
        ++n;
    }
    gameView.removeAllChildren();
    addRect();
}
function getCanvasSize() {
    var gView = document.getElementById("gameView");
    gView.height = window.innerHeight - 4;
    gView.width = window.innerWidth - 4;
}
function getSize() {
    if (window.innerHeight >= window.innerWidth) {
        return window.innerWidth;
    } else {
        return window.innerHeight;
    }
}
startGame();
