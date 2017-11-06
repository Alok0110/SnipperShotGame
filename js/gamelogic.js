//Game Logic

;(function( $, global ){
    
    if(!$){
        throw new Error("Jquery is required!");
    }
    
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    var canvasPlayer = document.getElementById("player");
    var ctxPlayer = canvasPlayer.getContext('2d');
    var stop = false;
    var backgroundStop = false;
    var tileW = 29, tileH = 29;
    var mapW = 44; //20 x 30  =600 
    var mapH = 6; //12 x 30  =360
    // 60 x 18
    // 6 x 44
    // 319 x 174 = actual canvas
    // 
    var levelCnt = 1;
    var levelObj = {

        "level1": [

                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3
               
                ],

        "level2": [

                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
               

                ]

    }
    
    
    //Viewport for the game
    var viewport = {
        // 30 and 18
        screen    : [0,0], //dimensions of canvas elements
        startTile : [0,0], //top left tile
        endTile   : [0,0], //bottom right tile
        offset    : [0,0], //offset from the center of the screen, calculated as player moves
                           //here px is player x co-ordinate and py is player y co-ordinate
        update    : function( px, py ) {
                
                console.log("player x axis ==>"+px+" player y axis ==>"+py);
                //this.offset[0] = 
                //this.offset[1] = 
        }

    }

    viewport.screen = [
            document.getElementById('canvas').width,
            document.getElementById('canvas').height
    ];

    var assetLoader = (function(){
        
        this.imgs = {
            
            'bg'        : 'img/plx-1.png',
            'bg1'       : 'img/plx-2.png',
            'bg2'       : 'img/plx-3.png',
            'bg3'       : 'img/plx-4.png',
            'bg4'       : 'img/plx-5.png',
            'leftbtn'   : 'img/left-btn.png',
            'rightbtn'  : 'img/right-btn.png',
            'comknife'  : 'img/com-knife-e.png',
            'comrun'    : 'img/com-run-e.png',
            'levelGrass': 'img/grass.png'
            
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

    var gameLevel = (function(){

        this.currentLevel = [];
        this.levelFinish = false;
        this.levelCount = levelCnt;

        this.drawLevel = function(){

        }

        return {
            drawLevel: this.drawLevel,
            currentLevel: this.currentLevel,
            levelFinish: this.levelFinish,
            levelCount: this.levelCnt
        }

    }());

    //background finish



    /*
     *Request animation
     */
    function animate() {
        if(!backgroundStop){
            
            //console.log("ok ==>");
            background.draw();

        }
        //console.log("continue calling animate");
        

        //constantly update the player position, also calculate the player position 
        viewport.update( player.position[0] , player.position[1]  );


        //culling process
        //this actually draws the view port depending on the player position
        for(var y = 0; y <= 6; y++) {

                for(var x = 0; x <= 44; x++) {

                    switch( levelObj["level1"][ ((y*mapW)+x) ] ) {
                        case 0: 
                            
                            break;
                        case 1:
                            ctx.fillStyle = '#eeeeee';
                            ctx.fillRect( viewport.offset[0] + x*tileW, viewport.offset[1] + y*tileH, tileW, tileH );
                            break;
                        case 3:
                            //ctx.fillStyle = '#ff0000';
                            //ctx.fillRect( viewport.offset[0] + x*tileW, viewport.offset[1] + y*tileH, tileW, tileH );
                            ctx.drawImage(assetLoader.imgs.levelGrass, 7, 9, 40, 40, viewport.offset[0] + x*tileW, viewport.offset[1] + y*tileH, tileW, tileH);
                            break;
                        default:
                            ctx.fillStyle = "#0000ff";
                            ctx.fillRect( viewport.offset[0] + x*tileW, viewport.offset[1] + y*tileH, tileW, tileH );
                    }

                    

                }

        }


        //player update
        player.update();
        player.draw();

        requestAnimFrame( animate );

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
                    backgroundStop = false;
                    //animate();
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
                    backgroundStop = true;
                    
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
            40: 'down',
            88: 'jump',
            67: 'shoot',
            90: 'knife'
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

                        player.isRunning = true;
                        player.isStanding = false;
                        player.isBend = false;
                        player.isShooting = false;
                        player.isJumping = false;
                        player.isKnifeAttack = false;
                }
        
                if( keyCode === 88 ) {
                    console.log("pressed jump ==>");
                }

                if( keyCode === 67 ) {
                    console.log("pressed shot ==>");
                }

                if( keyCode === 90 ) {
                    console.log("knife used ==>");
                        player.isRunning = false;
                        player.isStanding = false;
                        player.isBend = false;
                        player.isShooting = false;
                        player.isJumping = false;
                        player.isKnifeAttack = true;
                }

                if( (keyCode === 37 ||
                    keyCode === 39) && background.isRunning === false ){
                    background.isRunning = true;
                    backgroundStop = false;
                    //animate();
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
                    backgroundStop = true;

                        player.isRunning = false;
                        player.isStanding = true;
                        player.isBend = false;
                        player.isShooting = false;
                        player.isJumping = false;
                        player.isKnifeAttack = false;
                }

                if( keyCode === 90 ) {
                    //console.log("knife used ==>");
                        player.isRunning = false;
                        player.isStanding = true;
                        player.isBend = false;
                        player.isShooting = false;
                        player.isJumping = false;
                        player.isKnifeAttack = false;
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
    

   // This function gives is for dealing with the mainPlayer
    function SpriteSheet( path, frameWidth, frameHeight ){
        this.image = new Image();
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        
        //calculates the number of frames in a row after the images loads
        var self = this;
        
        this.image.onload = function(){
            self.framesPerRow = Math.floor(self.image.width / self.frameWidth);
            console.log("check frames per row first ================================> "+self.framesPerRow+" ==> "+self.image.width+" ==> "+self.frameWidth);
        };
        
        this.image.src = path;
    }
    
    /*
     *This function is used to animate the player
     */
    function Animation( spritesheet, frameSpeed, startFrame, endFrame ){
        
        var animationSequence = [];  //array holding the order of animation
        var currentFrame = 0;        //current frame to draw
        var counter = 0;             //keep track of frame rate
        
        for(var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++  ) {
            animationSequence.push(frameNumber);
        }
        
        
        this.update = function() {
            //console.log("check for counter and frameSpeed "+counter+" frameSpeed "+frameSpeed);
            if( counter == (frameSpeed-1) ){
                currentFrame = (currentFrame + 1) % animationSequence.length;
                //console.log( " currentFrame "+currentFrame+" animationSequence length "+animationSequence.length+" "+( (currentFrame + 1) % animationSequence.length ) );
            }
            counter = (counter + 1) % frameSpeed;
        };
        
        this.clearM = function(x, y){

            //ctxPlayer.clearRect(x,y,spritesheet.frameWidth,spritesheet.frameHeight);
        }

        this.draw = function(x, y) {
            var row = Math.floor( animationSequence[currentFrame] / spritesheet.framesPerRow );
            var col = Math.floor( animationSequence[currentFrame] % spritesheet.framesPerRow );
            //console.log("check row "+row+" check col "+col);
            /*
                spritesheet.image,
                col * spritesheet.frameWidth,
                row * spritesheet.frameHeight,
                spritesheet.frameWidth,
                spritesheet.frameHeight,
                x,
                y,
                spritesheet.frameWidth,
                spritesheet.frameHeight


            */
            ctxPlayer.clearRect(x,y,spritesheet.frameWidth,spritesheet.frameHeight);
            ctxPlayer.drawImage(
                spritesheet.image,
                col * spritesheet.frameWidth,
                row * spritesheet.frameHeight,
                spritesheet.frameWidth,
                spritesheet.frameHeight,
                x,
                y,
                spritesheet.frameWidth,
                spritesheet.frameHeight
            );
            //alert("ok");
        };
    }


    var player = new Character();

    //Character function
    //29px is standard tile
    function Character(){
        this.tileFrom   = [1,1];
        this.tileTo     = [1,1];
        this.tileMoved  = 0;
        this.dimensions = [90,90];
        //80 60
        this.position   = [80,87];
        this.isRunning = false;
        this.isStanding = true;
        this.isBend = false;
        this.isShooting = false;
        this.isJumping = false;
        this.isKnifeAttack = false;
        this.delayMove = 700;
        this.sx = 5;
        this.sy = 5;
        this.sw = 55;
        this.sh = 60;
        this.dx = 0;
        this.dy = 0;
        this.dw = 55;
        this.dh = 60;

        this.standSprite = new Animation( new SpriteSheet( assetLoader.imgs.comknife, 50, 58 ), 9, 0, 0 );
        this.knifeSprite = new Animation( new SpriteSheet( assetLoader.imgs.comknife, 50, 58 ), 9, 0, 3 );
        this.runSprite = new Animation( new SpriteSheet( assetLoader.imgs.comrun, 50, 58 ), 5, 0, 5 );
        //this.delayMove  = 700; 
        // 5 + 64 + 64 + 64 + 5 = 202
        // 5 + 66 + 66 + 5 = 142
    }
    
    //Update character position
    Character.prototype.update = function(){
        
        if(  this.isStanding && !this.isRunning && !this.isBend &&
             !this.isShooting && !this.isJumping && !this.isKnifeAttack ){
            //console.log("ok inside standing");

            this.standSprite.update();
            //ctx.fillStyle = '#0000ff';
            //ctx.fillRect( 0, 0, 20, 40);
        }

        if(  !this.isStanding && !this.isRunning && !this.isBend &&
             !this.isShooting && !this.isJumping && this.isKnifeAttack ){
            //console.log("inside knife used ====> update");

            this.knifeSprite.update();
        }

        if(  !this.isStanding && this.isRunning && !this.isBend &&
             !this.isShooting && !this.isJumping && !this.isKnifeAttack ){
            console.log("inside running used ====> update");
            this.runSprite.update();
        }

    }

    //Draw character position
    Character.prototype.draw = function(){

        if(  this.isStanding && !this.isRunning && !this.isBend &&
             !this.isShooting && !this.isJumping && !this.isKnifeAttack ){
            //console.log("ok inside standing");

            this.standSprite.draw(player.position[0],player.position[1]);
            //ctx.fillStyle = '#0000ff';
            //ctx.fillRect( 0, 0, 20, 40);
        }

        if(  !this.isStanding && !this.isRunning && !this.isBend &&
             !this.isShooting && !this.isJumping && this.isKnifeAttack ){
            //console.log("inside knife used ====> draw ");
            //this.knifeSprite.clearM(0,0);
            this.knifeSprite.draw(player.position[0],player.position[1]);
        }

        if(  !this.isStanding && this.isRunning && !this.isBend &&
             !this.isShooting && !this.isJumping && !this.isKnifeAttack ){
            console.log("inside running used ====> draw");
            this.runSprite.draw(player.position[0],player.position[1]);
        }

    }

    Character.prototype.processMovement = function(){

        if( this.tileFrom[0] == this.tileTo[0] &&
            this.tileFrom[1] == this.tileTo[1] ){
            return false;
        }


/*
         if( (t - this.tileMoved) >= this.delayMove ) {

            this.placeAt( this.tileTo[0], this.tileTo[1] ); 
                                                            

            }
            else {
                   
                   this.position[0] = (this.tileFrom[0] * tileW) + (tileW - this.dimensions[0])/2;

                   this.position[1] = (this.tileFrom[1] * tileH) + (tileH - this.dimensions[1])/2;

                   if( this.tileTo[0] != this.tileFrom[0] ) {

                        //distance moved, its called diff?
                        var diff = (tileW / this.delayMove) * (t - this.timeMoved);

                        // check if the player is moving to left or right, and depending on it add or subtract those values
                        this.position[0] += ( this.tileTo[0] < this.tileFrom[0] ? 0 - diff : diff );

                   }

                   //check if player has moved
                   if( this.tileTo[1] != this.tileFrom[1] ) {

                        //distance moved, its called diff?
                        // here t & timeMoved both are in milliSeconds
                        // (40 / 700) * 0.00001
                        var diff = (tileH / this.delayMove) * (t - this.timeMoved);

                        // check if the player is moving to up or down, and depending on it add or subtract those values
                        this.position[1] += ( this.tileTo[1] < this.tileFrom[1] ? 0 - diff : diff );

                   }

                   //The position here down, is actually calculated in pixels
                   this.position[0] = Math.round( this.position[0] );
                   this.position[1] = Math.round( this.position[1] );
            }
            */
            return true;

    }
    
    
    
    function startGame(){
        //animate();
        background.reset();
        background.draw();
        //level 1 for begining
        gameLevel.currentLevel = levelObj["level"+levelCnt];
        console.log(gameLevel.currentLevel);
        animate();
    }
    //Loading All Images
    assetLoader.downloadAll();
    
}(jQuery, this));