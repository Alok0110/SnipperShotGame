//Game Logic

;(function( $, global ){
    
    if(!$){
        throw new Error("Jquery is required!");
    }
    
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    var stop = false;
    var level1 = [

                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0,
                0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0,
                0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0,
                0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0,
                0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0,
                0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0,
                0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0,
                0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0,
                0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
                0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
                0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0,
                0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
                0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
                0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
                0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
                0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0,
                0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0,
                0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0


                ];

    var assetLoader = (function(){
        
        this.imgs = {
            
            'bg'        : 'img/plx-1.png',
            'bg1'       : 'img/plx-2.png',
            'bg2'       : 'img/plx-3.png',
            'bg3'       : 'img/plx-4.png',
            'bg4'       : 'img/plx-5.png',
            'leftbtn'  : 'img/left-btn.png',
            'rightbtn' : 'img/right-btn.png'
            
        }
        
        var assetsLoaded = 0;
        var numImgs = Object.keys(this.imgs).length;    //total number of images
        this.totalAssest = numImgs;                     //total number of images
        
        function assetLoaded( keyVal, name ) {
            
            if(this[keyVal][name].status !== 'loading'){
                return;
            }
            
            this[keyVal][name].status = 'loaded';
            assetsLoaded++; 
            
            if( assetsLoaded === this.totalAssest && typeof this.finished === 'function' ){
                this.finished();
            }
        }
        
        this.downloadAll = function(){
            
            var _this = this;
            var src;
         
            for(var img in this.imgs) {
                if(this.imgs.hasOwnProperty(img)){
                    src = this.imgs[img];
                    
                    (function(_this,img){
                        _this.imgs[img] = new Image();
                        _this.imgs[img].status = 'loading';
                        _this.imgs[img].name = img;
                        _this.imgs[img].onload = function() { assetLoaded.call(_this, 'imgs', img) };
                        _this.imgs[img].src = src;    
                    })(_this,img);
                    
                }
            }
            //console.log("Reached here in Download All function !");
        }
        
        return {
            imgs: this.imgs,
            totalAssest: this.totalAssest,
            downloadAll: this.downloadAll
        };
        
    }());
    
     /*
     *Background,
     */
    
    //Finished then start game
    assetLoader.finished = function(){
        startGame();
    }


    var requestAnimFrame = (function(){ 
        return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                window.oRequestAnimationFrame      ||
                window.msRequestAnimationFrame     ||
                function(callback, element){
                  window.setTimeout(callback, 1000 / 60);
                };
      })();


      // Begining of the background function ==>
      var background = (function(){
        
        var bg3 = {},bg1 ={}, bg2={}, bg4={};
        this.leftBtn = false;
        this.rightBtn = false;
        this.isRunning = false;
        
        this.draw = function() {
            ctx.drawImage(assetLoader.imgs.bg, 0, 0, 384, 216, 0, 0, 600, 360);
            //ctx.drawImage(assetLoader.imgs.bg1, 0, 0, 384, 216, 0, 0, 300, 150);
            //ctx.drawImage(assetLoader.imgs.bg2, 0, 0, 384, 216, 0, 0, 300, 150);
            //ctx.drawImage(assetLoader.imgs.bg3, 0, 0, 384, 216, 0, 0, 300, 150);
            //ctx.drawImage(assetLoader.imgs.bg4, 0, 0, 384, 216, 0, 0, 300, 150);

            //pan background
            if( this.rightBtn === true ) {
                bg1.x -= bg1.speed;
                bg2.x -= bg2.speed;
                bg3.x -= bg3.speed;
                bg4.x -= bg4.speed;
            }

            if( this.leftBtn === true ) {
                bg1.x += bg1.speed;
                bg2.x += bg2.speed;
                bg3.x += bg3.speed;
                bg4.x += bg4.speed;
            }
            
        
            ctx.drawImage(assetLoader.imgs.bg1, bg1.x, bg1.y);
            if( this.rightBtn === true ) {
                
                if( (bg1.x - assetLoader.imgs.bg1.width) < -88 && (bg1.x + assetLoader.imgs.bg1.width) > 300 )  {

                    ctx.drawImage(assetLoader.imgs.bg1, bg1.x - canvas.width, bg1.y);
                }
                else {
                    
                    ctx.drawImage(assetLoader.imgs.bg1, bg1.x + canvas.width, bg1.y); //true

                }


            }
            if( this.leftBtn === true ) {
                if( (bg1.x + assetLoader.imgs.bg1.width) < 300  ) {
                    //console.log("inside 1");
                    ctx.drawImage(assetLoader.imgs.bg1, bg1.x + canvas.width, bg1.y);
                }
                else {
                    //console.log("inside 2");
                    ctx.drawImage(assetLoader.imgs.bg1, bg1.x - canvas.width, bg1.y);
                }
            }


            ctx.drawImage(assetLoader.imgs.bg2, bg2.x, bg2.y);
            if( this.rightBtn === true ) {
                
                if( (bg2.x - assetLoader.imgs.bg2.width) < -88 && (bg2.x + assetLoader.imgs.bg2.width) > 300 )  {

                    ctx.drawImage(assetLoader.imgs.bg2, bg2.x - canvas.width, bg2.y);
                }
                else {
                    
                    ctx.drawImage(assetLoader.imgs.bg2, bg2.x + canvas.width, bg2.y); //true

                }

            }
            if( this.leftBtn === true ) {
                if( (bg2.x + assetLoader.imgs.bg2.width) < 300  ) {
                    //console.log("inside 1");
                    ctx.drawImage(assetLoader.imgs.bg2, bg2.x + canvas.width, bg2.y);
                }
                else {
                    //console.log("inside 2");
                    ctx.drawImage(assetLoader.imgs.bg2, bg2.x - canvas.width, bg2.y);
                }

            }
            
            ctx.drawImage(assetLoader.imgs.bg3, bg3.x, bg3.y);

            if( this.rightBtn === true ) {
                if( (bg3.x - assetLoader.imgs.bg3.width) < -88 && (bg3.x + assetLoader.imgs.bg3.width) > 300 )  {

                    ctx.drawImage(assetLoader.imgs.bg3, bg3.x - canvas.width, bg3.y);
                }
                else {
                    
                    ctx.drawImage(assetLoader.imgs.bg3, bg3.x + canvas.width, bg3.y); //true

                }

            }
            if( this.leftBtn === true ) {
                if( (bg3.x + assetLoader.imgs.bg3.width) < 300  ) {
                    //console.log("inside 1");
                    ctx.drawImage(assetLoader.imgs.bg3, bg3.x + canvas.width, bg3.y);
                }
                else {
                    //console.log("inside 2");
                    ctx.drawImage(assetLoader.imgs.bg3, bg3.x - canvas.width, bg3.y);
                }

            }

            ctx.drawImage(assetLoader.imgs.bg4, bg4.x, bg4.y);
            if( this.rightBtn === true ) {
                //console.log("inside right ===> ");
                //ctx.drawImage(assetLoader.imgs.bg4, bg4.x + canvas.width, bg4.y);
                //console.log(" canvas.width + "+(bg4.x + canvas.width) );
                //console.log(" canvas limit + "+(bg4.x + assetLoader.imgs.bg4.width) );
                //console.log(" canvas.width - "+(bg4.x - canvas.width) );
                //console.log(" canvas limit - "+(bg4.x - assetLoader.imgs.bg4.width) );
                //console.log("=========================================================");
                /*if( (bg4.x + canvas.width) < -1 ) {
                    ctx.drawImage(assetLoader.imgs.bg4, bg4.x + canvas.width, bg4.y);
                } else {
                    ctx.drawImage(assetLoader.imgs.bg4, bg4.x - canvas.width, bg4.y);
                }*/

                //( here it is important that both conditions are kept in mind, and both conditions are met )
                //( note that here bg4.x +/- assetLoader.imgs.width is used because actual image pixel should be changed )
                if( (bg4.x - assetLoader.imgs.bg4.width) < -88 && (bg4.x + assetLoader.imgs.bg4.width) > 300 )  {

                    ctx.drawImage(assetLoader.imgs.bg4, bg4.x - canvas.width, bg4.y);
                }
                else {
                    
                    ctx.drawImage(assetLoader.imgs.bg4, bg4.x + canvas.width, bg4.y); //true

                }

            }
            if( this.leftBtn === true ) {
                //console.log("inside left ===> ");
                
                //console.log(" canvas.width + "+(bg4.x + canvas.width) );
                //console.log(" canvas limit + "+(bg4.x + assetLoader.imgs.bg4.width) );
                //console.log(" canvas.width - "+(bg4.x - canvas.width) );
                //console.log(" canvas limit - "+(bg4.x - assetLoader.imgs.bg4.width) );
                //console.log("=========================================================");
                /*if( (bg4.x + canvas.width) < 0 ) {
                    ctx.drawImage(assetLoader.imgs.bg4, bg4.x - canvas.width, bg4.y);
                }
                else {
                    ctx.drawImage(assetLoader.imgs.bg4, bg4.x + canvas.width, bg4.y);
                }*/

                if( (bg4.x + assetLoader.imgs.bg4.width) < 300  ) {
                    //console.log("inside 1");
                    ctx.drawImage(assetLoader.imgs.bg4, bg4.x + canvas.width, bg4.y);
                }
                else {
                    //console.log("inside 2");
                    ctx.drawImage(assetLoader.imgs.bg4, bg4.x - canvas.width, bg4.y);
                }
            }
            //console.log("sky.x "+sky.x+" sky.x + canvas.width "+(sky.x+canvas.width));
            
            ctx.drawImage(assetLoader.imgs.leftbtn, 0, 0, 78, 77, 270, 120, 28, 27);
            ctx.drawImage(assetLoader.imgs.rightbtn, 0, 0, 78, 77, 0, 120, 28, 27);

            //if image scrolled off the screen then do below
            //console.log("constantly checking value of bg1 "+(canvas.width)+" "+canvas.height);
            if( this.rightBtn === true ) {
                //console.log(" bg1.x right "+bg1.x+" "+(bg1.x + assetLoader.imgs.bg1.width ) );
                //console.log(" bg1.x value drawn "+(bg1.x + canvas.width) ) ;
                //console.log("t f "+( bg1.x + assetLoader.imgs.bg1.width >= assetLoader.imgs.bg1.width ));
                if( bg1.x + assetLoader.imgs.bg1.width <= 0 ){
                    console.log("*********************************************************************************************************************");
                    bg1.x=0;
                }
                if( bg2.x + assetLoader.imgs.bg2.width <= 0 ){
                    bg2.x=0;
                }
                if( bg3.x + assetLoader.imgs.bg3.width <= 0 ){
                    bg3.x=0;
                }
                if( bg4.x + assetLoader.imgs.bg4.width <= 0 ){
                    bg4.x=0;
                }

            }
            
            if( this.leftBtn === true ) {

             
                //console.log(" bg1.x left "+bg1.x+" "+(bg1.x - assetLoader.imgs.bg1.width ) );
                //console.log(" bg1.x value drawn "+(bg1.x - canvas.width) ) ;
                if( (bg1.x - assetLoader.imgs.bg1.width) >= -300 ){
                    //console.log("*********************************************************************************************************************");
                    bg1.x=0;
                }
                if( bg2.x - assetLoader.imgs.bg2.width >= -300){
                    //console.log("ok ====> ************************* ");
                    bg2.x=0;
                }
                if( bg3.x - assetLoader.imgs.bg3.width >= -300 ){
                    //console.log("ok ====> ************************* ");
                    bg3.x=0;
                }
                if( bg4.x - assetLoader.imgs.bg4.width >= -88 ){
                    //console.log("ok ====> ************************* ");
                    bg4.x=0;
                }

                
            }
            
        }
        
        /*
         *this is very important as this not only resets but also 
         *asigns the original values to the object
         */
        this.reset = function(){

            bg1.x = 0;
            bg1.y = 0;
            bg1.speed = 0.1;

            bg2.x = 0;
            bg2.y = 0;
            bg2.speed = 0.2;

            bg3.x = 0;
            bg3.y = 0;
            bg3.speed = 0.3;

            bg4.x = 0;
            bg4.y = 0;
            bg4.speed = 0.4;
            
        }
        
        return {
            draw: this.draw,
            reset: this.reset,
            left: this.leftBtn,
            right: this.rightBtn,
            isRunning: this.isRunning
        }
        
    }());


    //background finish

    /*
     *Request animation
     */
    function animate() {
        if(!stop){
            requestAnimFrame( animate );
            //console.log("ok ==>");
            background.draw();

        }
    }

    //console.log("this is outer function");
    var testI = function(){

        var elem = document.getElementById('canvas'),
        elemLeft = elem.offsetLeft,
        elemTop = elem.offsetTop,
        context = elem.getContext('2d'),
        elements = [];

        var continueFunctionCall = false;


        

        // Add event listener for `click` events.
        elem.addEventListener('mousedown', function(event) {
            var x = event.pageX - elemLeft,
                y = event.pageY - elemTop;
            
            // Collision detection between clicked offset and element.
            elements.forEach(function(element) {
                //console.log(" y "+element.top+" x "+element.left+" width "+element.width);
                //console.log(" y "+y+" x "+x);
                //y > element.top && y < element.top + element.height 
                   // && x > element.left && x < element.left + element.width
                if (y > element.top && y < element.top + element.height 
                    && x > element.left && x < element.left + element.width) {
                    //alert('clicked an element');
                if( x > 7 && x  < 62 )
                {
                    background.leftBtn=true;
                    background.rightBtn=false;
                }else if( x > 544 && x  < 599 )
                {
                    background.leftBtn=false;
                    background.rightBtn=true;

                }
                //console.log("value when pressed down ==>"+x+" "+(x + element.width)+" left "+background.left+" right "+background.right);
                    background.isRunning = true;
                    stop = false;
                    animate();
                }
            });

        }, false);

        elem.addEventListener('mouseup', function(event) {
            var x = event.pageX - elemLeft,
                y = event.pageY - elemTop;
            
            // Collision detection between clicked offset and element.
            elements.forEach(function(element) {
                //console.log(" y "+element.top+" x "+element.left+" width "+element.width);
                //console.log(" y "+y+" x "+x);
                //y > element.top && y < element.top + element.height 
                   // && x > element.left && x < element.left + element.width
                if (y > element.top && y < element.top + element.height 
                    && x > element.left && x < element.left + element.width) {
                    //alert('clicked an element');
                    background.isRunning = false;
                    stop = true;
                    
                }
            });

        }, false);

        /* 
         *Keep track of keycodes
         */
        var KEY_CODES = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };
        
        var KEY_STATUS = {};
        for(var code in KEY_CODES) {
            //console.log("check if ongoing");
            if (KEY_CODES.hasOwnProperty(code)) {
                    KEY_STATUS[KEY_CODES[code]] = false;
            }
        }
        document.onkeydown = function(e){
            var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
            if(KEY_CODES[keyCode]){
                e.preventDefault();
                KEY_STATUS[KEY_CODES[keyCode]] = true;
                
                if( keyCode === 37 ) {
                    background.leftBtn=true;
                    background.rightBtn=false;
                }
                else if( keyCode === 39 ) {
                    background.leftBtn=false;
                    background.rightBtn=true;
                }

                if( (keyCode === 37 ||
                    keyCode === 39) && background.isRunning === false ){
                    background.isRunning = true;
                    stop = false;
                    animate();
                }
                
            }
        };
        document.onkeyup = function(e){
           var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
           if(KEY_CODES[keyCode]){
               e.preventDefault();
               KEY_STATUS[KEY_CODES[keyCode]] = false;
               if( (keyCode === 37 ||
                   keyCode === 39) && background.isRunning === true ) {
                    background.isRunning = false;
                    stop = true;
                }
                

           }
        };

        // Add element.
        elements.push({
            width: 55,
            height: 55,
            top: 293,
            left: 7
        });

        elements.push({
            width: 55,
            height: 55,
            top: 293,
            left: 544
        });


    }

    testI();
    
    //Character function
    function Character(){
        
    }
    
    //Update character position
    Character.prototype.update = function(){
        
    }
    
    //Update character walk
    Character.prototype.walk = function(){
        
    }
    
    function startGame(){
        //animate();
        background.reset();
        background.draw();
    }
    //Loading All Images
    assetLoader.downloadAll();
    
}(jQuery, this));