/**
 * Created by Jancy on 2015/4/7 0007.
 */
 function SeeColorRect(n,colors,index){
    createjs.Shape.call(this);
    this.setRectType = function(type){
        this._RectType = type;
        this.setColor(colors[type]);
        // switch (type){
        //     case 1:
        //     this.setColor(color);
        //     break;
        //     case 2:
        //     this.setColor(Rectcolor);
        //     break;
        // }
    }

    this.changeType = function(){
        var type = this.getRectType();
        
        if(type < 9){
            type++;
        }else{
            type = 0;
        }

        this.setRectType(type);
    }

    this.setColor = function (colorString) {
    	if(index % 2 == 0){                                                 //等腰三角形
         this.graphics.beginFill(colorString);
        	 // this.graphics.drawRect(0,0,getSize()/n-2,getSize()/n - 2);  //正方形
             // this.graphics.endFill();
             
             this.graphics.beginStroke("red");
             this.graphics.setStrokeStyle(1);
             this.graphics.moveTo(0,getSize()/n);
             this.graphics.lineTo(getSize()/n,getSize()/n);
             this.graphics.lineTo(getSize()/(2*n),0);
             this.graphics.lineTo(0,getSize()/n);
    	}else{                                                              //倒立三角形

         this.graphics.beginFill(colorString);
         this.graphics.beginStroke("red");
         this.graphics.setStrokeStyle(1);
         this.graphics.moveTo(0,0);
         this.graphics.lineTo(getSize()/n,0);
         this.graphics.lineTo(getSize()/(2*n),getSize()/n);
         this.graphics.lineTo(0,0);
     }



 }
 this.getRectType = function () {
    return this._RectType;
}
this.setRectType(0);
}
SeeColorRect.prototype = new createjs.Shape();