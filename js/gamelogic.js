/* 
 *
 * Copyright (C) Joffer Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Alok Dethe <det.alex0110@gmail.com>, Oct 2017
 *
 *
 *
 */



//Game Logic

;(function( $, global ){
    
    if(!$){
        throw new Error("Jquery is required!");
    }
    
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    var canvasPlayer = document.getElementById("player");
    var ctxPlayer = canvasPlayer.getContext('2d');
    //ctxPlayer.scale(1,1);
    var canvasLevel = document.getElementById("level");
    var ctxLevel = canvasLevel.getContext('2d');
    var stop = false;
    var backgroundStop = false;
    var tileW = 29, tileH = 29;
    var mapW = 44; //20 x 30  =600 
    var currentSecond = 0, frameCount = 0, framesLastSecond = 0;
    var lastFrameTime = 0;
    
    var mapH = 6; //12 x 30  =360
    // 60 x 18
    // 6 x 44
    // 319 x 174 = actual canvas
    // 
    var levelCnt = 1;
    var levelObj = {

        "level1": [

                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 3, 3, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
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
               

                ],

        "level3": [

                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
               

                ],

        "level4": [

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
                
                //console.log("player x axis ==>"+px+" player y axis ==>"+py);
                this.offset[0] = 80 - px ;
                this.offset[1] = 87 - py ;

                var tile = [ Math.ceil(px/tileW), Math.ceil(py/tileH) ];

                this.startTile[0] = tile[0] - 3;
                this.startTile[1] = 0;

                this.endTile[0] = (tile[0] - 3) + 44;
                this.endTile[1] = 6;

                if( this.endTile[0] >= mapW ){ this.endTile[0] = mapW - 1; };
                if( this.endTile[1] >= mapH ){ this.endTile[1] = mapH - 1; };


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
            'levelGrass': 'img/grass.png',
            'comsit'    : 'img/com-sit-e.png',
            'comleftrun': 'img/com-left-run-e.png',
            'comLeftKnife' : 'img/com-left-knife-e.png',
            'comFire'      : 'img/com-fire-e.png',
            'comLeftFire'  : 'img/com-left-fire-e.png'
            
        }

        this.sounds = {
            'bg': 'GameMusic/bgmusic.mp3',
            'fireShot': 'GameMusic/MGun.mp3'
        }


        
        var assetsLoaded = 0;
        var numImgs = Object.keys(this.imgs).length;    //total number of images
        var numSounds = Object.keys(this.sounds).length;
        this.totalAssest = numImgs;                     //total number of images
        
        //check the ready state of an audio file
        function _checkAudioState( sound ){
            if( this.sounds[sound].status === 'loading' && this.sounds[sound].readyState === 4 ){
                    assetLoaded.call( this, 'sounds', sound );
            }
        }

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
         
            //load images
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

            //load sounds
            for( var sound in this.sounds ){
                if( this.sounds.hasOwnProperty(sound) ){
                        src = this.sounds[sound];

                        //create closure for event binding
                        (function( _this, sound ){

                            _this.sounds[sound] = new Audio();
                            _this.sounds[sound].status = 'loading';
                            _this.sounds[sound].name = sound;
                            _this.sounds[sound].addEventListener( 'canplay', function(){
                                _checkAudioState.call( _this, sound );
                            } );
                            _this.sounds[sound].src = src;
                            _this.sounds[sound].preload = 'auto';
                            _this.sounds[sound].load();

                        })(_this, sound);
                }
            }
        }
        
        return {
            imgs: this.imgs,
            sounds: this.sounds,
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
            if( this.rightBtn === true && keyBKeys.isKnifeAttack === false &&
                 keyBKeys.isStanding === false && keyBKeys.isLeftStanding === false && 
                 keyBKeys.isFireAttack === false ) {
                bg1.x -= bg1.speed;
                bg2.x -= bg2.speed;
                bg3.x -= bg3.speed;
                bg4.x -= bg4.speed;
            }

            if( this.leftBtn === true && keyBKeys.isKnifeAttack === false &&
                 keyBKeys.isStanding === false && keyBKeys.isLeftStanding === false &&
                 keyBKeys.isFireAttack === false ) {
                bg1.x += bg1.speed;
                bg2.x += bg2.speed;
                bg3.x += bg3.speed;
                bg4.x += bg4.speed;
            }
            
            
            ctx.drawImage(assetLoader.imgs.bg1, bg1.x, bg1.y);
            if( this.rightBtn === true  ) {
                
                if( (bg1.x - assetLoader.imgs.bg1.width) < -88 && (bg1.x + assetLoader.imgs.bg1.width) > 300 )  {

                    ctx.drawImage(assetLoader.imgs.bg1, bg1.x - canvas.width, bg1.y);
                }
                else {
                    
                    ctx.drawImage(assetLoader.imgs.bg1, bg1.x + canvas.width, bg1.y); //true

                }


            }
            if( this.leftBtn === true  ) {
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
            if( this.rightBtn === true  ) {
                
                if( (bg2.x - assetLoader.imgs.bg2.width) < -88 && (bg2.x + assetLoader.imgs.bg2.width) > 300 )  {

                    ctx.drawImage(assetLoader.imgs.bg2, bg2.x - canvas.width, bg2.y);
                }
                else {
                    
                    ctx.drawImage(assetLoader.imgs.bg2, bg2.x + canvas.width, bg2.y); //true

                }

            }
            if( this.leftBtn === true  ) {
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
            if( this.leftBtn === true  ) {
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
            if( this.rightBtn === true  ) {
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
            if( this.leftBtn === true  ) {
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
            if( this.rightBtn === true  ) {
                //console.log(" bg1.x right "+bg1.x+" "+(bg1.x + assetLoader.imgs.bg1.width ) );
                //console.log(" bg1.x value drawn "+(bg1.x + canvas.width) ) ;
                //console.log("t f "+( bg1.x + assetLoader.imgs.bg1.width >= assetLoader.imgs.bg1.width ));
                if( bg1.x + assetLoader.imgs.bg1.width <= 0 ){
                    //console.log("*********************************************************************************************************************");
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
        
        //
        var currentFrameTime = Date.now();
        var timeElapsed = currentFrameTime - lastFrameTime; //check the time elaspsed from the last time untill this

        var sec = Math.floor(Date.now()/1000); //time in seconds
        if( sec!=currentSecond ) { //this is just to calculate the frameCount in 1 second of time, it is 60 frames per second

            currentSecond = sec;
            framesLastSecond = frameCount;
            frameCount = 1;
        }
        else {
            frameCount++;
        }
        
        //
        if( !player.processMovement( currentFrameTime ) ){

            //console.log("INISIDE PROCESS MOVEMENT ======================================================> leftBtn "+background.leftBtn+" rightBtn "+background.rightBtn);
            /*if( keysDown[38] && player.tileFrom[1] > 0 && gameMap[ toIndex( player.tileFrom[0], player.tileFrom[1] - 1 ) ] == 1 ) {
                player.tileTo[1] -= 1;
            }
            //Down key
            else if( keysDown[40] && player.tileFrom[1] < (mapH-1) && gameMap[ toIndex( player.tileFrom[0], player.tileFrom[1] + 1 ) ] == 1 ) {
                    player.tileTo[1] += 1;
            }*/
            //Left key
            if(    ( KEY_STATUS['left'] && keyBKeys.isKnifeAttack === false &&
                     keyBKeys.isStanding === false && keyBKeys.isLeftStanding === false &&
                     keyBKeys.isFireAttack === false  )  && player.tileFrom[0] > 0 && levelObj["level1"][ toIndex( player.tileFrom[0] - 1, player.tileFrom[1]  ) ] == 0  ) {

                    player.tileTo[0] -= 1;
                    player.tileTo2[0] -= 1;

            }
            //Right key
            else if(    ( KEY_STATUS['right'] && keyBKeys.isKnifeAttack === false &&
                          keyBKeys.isStanding === false && keyBKeys.isLeftStanding === false &&
                          keyBKeys.isFireAttack === false ) && player.tileFrom[0] < (mapW-1) && levelObj["level1"][ toIndex( player.tileFrom[0] + 1, player.tileFrom[1]  ) ] == 0  ) {

                    player.tileTo[0] += 1;
                    player.tileTo2[0] += 1;

            }

            //check if player has moved, only then set timeMoved to currentFrameTime
            if( player.tileFrom[0] != player.tileTo[0]  ){
                    player.timeMoved = currentFrameTime;
            }

        }

        //constantly update the player position, also calculate the player position 
        viewport.update( player.position[0] , player.position[1]  );


        //culling process
        //this actually draws the view port depending on the player position
        //console.log(" viewport.startTile[0] "+viewport.startTile[0]+" viewport.endTile[0] "+viewport.endTile[0]);
        //console.log(" viewport.startTile[1] "+viewport.startTile[1]+" viewport.endTile[1] "+viewport.endTile[1]);
        

                //the below is the proper way of clearing the screen according to the culling process
                ctxLevel.clearRect(0, 0, viewport.screen[0], viewport.screen[1]); //600 300
                for(var y = viewport.startTile[1]; y <= viewport.endTile[1]; y++) { //0, 6

                        for(var x = viewport.startTile[0]; x <= viewport.endTile[0]; x++) { //0, 44

                            switch( levelObj["level1"][ ((y*mapW)+x) ] ) {
                                case 0: 
                                    
                                    break;
                                case 1:
                                    ctxLevel.fillStyle = '#eeeeee';
                                    ctxLevel.fillRect( viewport.offset[0] + x*tileW, viewport.offset[1] + y*tileH, tileW, tileH );
                                    break;
                                case 3:
                                    //ctx.fillStyle = '#ff0000';
                                    //ctx.fillRect( viewport.offset[0] + x*tileW, viewport.offset[1] + y*tileH, tileW, tileH );
                                    // 7 9 40 40
                                    ctxLevel.drawImage(assetLoader.imgs.levelGrass, 5, 5, 35, 50, viewport.offset[0] + x*tileW, viewport.offset[1] + y*tileH, tileW, tileH);
                                    break;
                                default:
                                    //ctxLevel.fillStyle = "#0000ff";
                                    //ctxLevel.fillRect( viewport.offset[0] + x*tileW, viewport.offset[1] + y*tileH, tileW, tileH );
                            }

                            

                        }




                }
            


         //ctxLevel.fillStyle = '#0000ff';
         //console.log("check player position ==>"+(viewport.offset[1] ) );
        //here the player that is the RED BOX is displayed, we don't want this in our case
         //ctxLevel.fillRect( viewport.offset[0] + player.position[0], viewport.offset[1] + player.position[1], player.dimensions[0], player.dimensions[1] );


        //player update
        player.update();
        player.draw();

        lastFrameTime = currentFrameTime;

        requestAnimFrame( animate );

    }

    
    
    /* 
         *Keep track of keycodes
         */
        var KEY_CODES = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down',
            88: 'fire',
            67: 'jump',
            90: 'knife'
        };
        
        var KEY_STATUS = {};
        for(var code in KEY_CODES) {
            //console.log("check if ongoing");
            if (KEY_CODES.hasOwnProperty(code)) {
                    KEY_STATUS[KEY_CODES[code]] = false;
            }
        }


        /*function checkWhichPressed(){


                if( KEY_STATUS[ "left" ] && keyBKeys.currentKey.length == 0 ){
                    keyBKeys.currentKey = 'left';
                }
                else if( KEY_STATUS[ "up" ] && keyBKeys.currentKey.length == 0 ){
                    keyBKeys.currentKey = 'up';
                }
                else if( KEY_STATUS[ "right" ] && keyBKeys.currentKey.length == 0 ){
                    keyBKeys.currentKey = 'right';
                }
                else if( KEY_STATUS[ "down" ] && keyBKeys.currentKey.length == 0 ){
                    keyBKeys.currentKey = 'down';
                }
                else if( KEY_STATUS[ "jump" ] && keyBKeys.currentKey.length == 0 ){
                    keyBKeys.currentKey = 'jump';
                }
                else if( KEY_STATUS[ "shoot" ] && keyBKeys.currentKey.length == 0 ){
                    keyBKeys.currentKey = 'shoot';
                }
                else if( KEY_STATUS[ "knife" ] && keyBKeys.currentKey.length == 0 ){
                    keyBKeys.currentKey = 'knife';
                }
        }*/

        function checkPressed(){
            var c=0;
            if( !KEY_STATUS[ "left" ]  && !KEY_STATUS[ "up" ]    &&
                !KEY_STATUS[ "right" ] && !KEY_STATUS[ "down" ]  &&
                !KEY_STATUS[ "jump" ]  && !KEY_STATUS[ "fire" ] &&
                !KEY_STATUS[ "knife" ]  ) {
                c=1;
            }
            /*Object.keys(KEY_STATUS).forEach(function(ind, i){
               console.log("check values ==> "+ind+" "+i); 
               if( KEY_CODES[""+keyCode] ){
                    c=1;
                    break;
               }
            });*/
            return c;
        }
        

        document.onkeydown = function(e){
            var keyCode = (e.keyCode) ? e.keyCode : e.charCode;




            if(KEY_CODES[keyCode]){
                e.preventDefault();
                var checkPress = checkPressed();
                KEY_STATUS[KEY_CODES[keyCode]] = true;
                //checkWhichPressed();

                if( keyCode === 37 ) {
                    
                    //player.runSprite.rightRun = false;
                    //player.runSprite.leftRun = true;
                        if( checkPress == 1 ){

                            background.leftBtn=true;
                            background.rightBtn=false;

                            keyBKeys.leftRun = true;
                            keyBKeys.rightRun = false;

                            keyBKeys.isRunning = true;
                            keyBKeys.isStanding = false;
                            keyBKeys.isLeftStanding=false;
                            keyBKeys.isBend = false;
                            keyBKeys.isShooting = false;
                            keyBKeys.isJumping = false;
                            keyBKeys.isKnifeAttack = false;
                            keyBKeys.isFireAttack = false;
                        }
                        
                    
                    

                    console.log( " leftRun "+keyBKeys.leftRun+
                                 " rightRun "+keyBKeys.rightRun+
                                 " isRunning "+keyBKeys.isRunning+
                                 " isStanding "+keyBKeys.isStanding+
                                 " isBend "+keyBKeys.isBend+
                                 " isShooting "+keyBKeys.isShooting+
                                 " isJumping "+keyBKeys.isJumping+
                                 " isKnifeAttack "+keyBKeys.isKnifeAttack+
                                 " checkPressed "+checkPressed()+
                                 " keyBKeys "+keyBKeys.currentKey );

                }
                else if( keyCode === 39 ) {
                    

                    //player.runSprite.rightRun = true;
                    //player.runSprite.leftRun = false;

                    if( checkPress == 1 ){

                        background.leftBtn=false;
                        background.rightBtn=true;

                        keyBKeys.leftRun = false;
                        keyBKeys.rightRun = true;

                        keyBKeys.isRunning = true;
                        keyBKeys.isStanding = false;
                        keyBKeys.isLeftStanding=false;
                        keyBKeys.isBend = false;
                        keyBKeys.isShooting = false;
                        keyBKeys.isJumping = false;
                        keyBKeys.isKnifeAttack = false;
                        keyBKeys.isFireAttack = false;

                    }
                    
                        console.log( " leftRun "+keyBKeys.leftRun+
                                 " rightRun "+keyBKeys.rightRun+
                                 " isRunning "+keyBKeys.isRunning+
                                 " isStanding "+keyBKeys.isStanding+
                                 " isBend "+keyBKeys.isBend+
                                 " isShooting "+keyBKeys.isShooting+
                                 " isJumping "+keyBKeys.isJumping+
                                 " isKnifeAttack "+keyBKeys.isKnifeAttack+
                                 " checkPressed "+checkPressed()+
                                 " keyBKeys "+keyBKeys.currentKey );



                }
                else if( keyCode === 40 ) {
                    background.leftBtn=false;
                    background.rightBtn=false;
                    background.sitBtn=true;

                    if( checkPress == 1 ){
                        keyBKeys.isRunning = false;
                        keyBKeys.isStanding = false;
                        keyBKeys.isLeftStanding=false;
                        keyBKeys.isBend = true;
                        keyBKeys.isShooting = false;
                        keyBKeys.isJumping = false;
                        keyBKeys.isKnifeAttack = false;
                        keyBKeys.isFireAttack = false;

                    }
                    

                }
        
                if( keyCode === 88 ) {
                    //console.log("pressed jump ==>");
                    if( checkPress == 1 ){
                        keyBKeys.isRunning = false;
                        keyBKeys.isStanding = false;
                        keyBKeys.isLeftStanding=false;
                        keyBKeys.isBend = false;
                        keyBKeys.isShooting = false;
                        keyBKeys.isJumping = false;
                        keyBKeys.isKnifeAttack = false;
                        keyBKeys.isFireAttack = true;

                        assetLoader.sounds.fireShot.currentTime = 0;
                        assetLoader.sounds.fireShot.loop = true;
                        assetLoader.sounds.fireShot.play();
                        
                    }
                }

                if( keyCode === 67 ) {
                    //console.log("pressed shot ==>");
                }

                if( keyCode === 90 ) {
                    console.log("knife used ==> "+checkPressed());
                    
                    if( checkPress == 1 ){
                        keyBKeys.isRunning = false;
                        keyBKeys.isStanding = false;
                        keyBKeys.isLeftStanding=false;
                        keyBKeys.isBend = false;
                        keyBKeys.isShooting = false;
                        keyBKeys.isJumping = false;
                        keyBKeys.isKnifeAttack = true;
                        keyBKeys.isFireAttack = false;

                        
                    }
                    
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

               keyBKeys.currentKey=""; //checkPressed

               if( (keyCode === 37 ||
                    keyCode === 39 ) && background.isRunning === true ) {

                    background.isRunning = false;
                    backgroundStop = true;

                    

                        keyBKeys.isRunning = false;

                //while running a player can press Knife attack  in right direction
                        if( keyBKeys.rightRun == true && 
                            keyBKeys.leftRun == false &&
                            keyBKeys.isKnifeAttack == false &&
                            keyBKeys.isFireAttack == false ) {

                                keyBKeys.isStanding = true;
                                keyBKeys.isLeftStanding = false;

                        }
                //while running a player can press Knife attack in left direction 
                        if( keyBKeys.rightRun == false && 
                            keyBKeys.leftRun == true   &&
                            keyBKeys.isKnifeAttack == false &&
                            keyBKeys.isFireAttack == false ){

                                keyBKeys.isStanding = false;
                                keyBKeys.isLeftStanding = true;

                        }

                        keyBKeys.isBend = false;
                        keyBKeys.isShooting = false;
                        keyBKeys.isJumping = false;
                        //keyBKeys.isKnifeAttack = false;
                }

                if( keyCode === 40 ) {
                    background.sitBtn = false;

                    keyBKeys.isRunning = false;
                    keyBKeys.isStanding = true;
                    keyBKeys.isLeftStanding=false;
                    keyBKeys.isBend = false;
                    keyBKeys.isShooting = false;
                    keyBKeys.isJumping = false;
                    keyBKeys.isKnifeAttack = false;
                    keyBKeys.isFireAttack = false;


                }

                if( keyCode === 88 ) {


                    if( keyBKeys.rightRun == true && 
                            keyBKeys.leftRun == false &&
                            keyBKeys.isRunning == false ) {

                                keyBKeys.isStanding = true;
                                keyBKeys.isLeftStanding = false;

                        }
                        if( keyBKeys.rightRun == false && 
                            keyBKeys.leftRun == true   &&
                            keyBKeys.isRunning == false){

                                keyBKeys.isStanding = false;
                                keyBKeys.isLeftStanding = true;

                        }



                    //keyBKeys.isRunning = false;
                        //keyBKeys.isStanding = false;
                        //keyBKeys.isLeftStanding=false;
                        keyBKeys.isBend = false;
                        keyBKeys.isShooting = false;
                        keyBKeys.isJumping = false;
                        keyBKeys.isKnifeAttack = false;
                        keyBKeys.isFireAttack = false;

                        assetLoader.sounds.fireShot.pause();
                }

                if( keyCode === 90 ) {
                    //console.log("knife used ==>");
                        //keyBKeys.isRunning = false;


                        if( keyBKeys.rightRun == true && 
                            keyBKeys.leftRun == false &&
                            keyBKeys.isRunning == false ) {

                                keyBKeys.isStanding = true;
                                keyBKeys.isLeftStanding = false;

                        }
                        if( keyBKeys.rightRun == false && 
                            keyBKeys.leftRun == true   &&
                            keyBKeys.isRunning == false){

                                keyBKeys.isStanding = false;
                                keyBKeys.isLeftStanding = true;

                        }

                        //keyBKeys.isStanding = true;
                        //keyBKeys.isLeftStanding=false;

                        keyBKeys.isBend = false;
                        keyBKeys.isShooting = false;
                        keyBKeys.isJumping = false;
                        keyBKeys.isKnifeAttack = false;
                        keyBKeys.isFireAttack = false;

                }
                

           }
        };

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
            //console.log("check frames per row first ================================> "+self.framesPerRow+" ==> "+self.image.width+" ==> "+self.frameWidth);
        };
        
        this.image.src = path;
    }
    
    /*
     *This function is used to animate the player
     */
    function Animation( spritesheet, frameSpeed, startFrame, endFrame, isLeft, leftFpr ){
        
        var animationSequence = [];  //array holding the order of animation
        var currentFrame = 0;        //current frame to draw
        var counter = 0;             //keep track of frame rate
        var animationSequence2 = [];

        this.leftRun;
        this.rightRun;
        
        for(var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++  ) {
            animationSequence.push(frameNumber);
        }
        
        //
        if( isLeft ) {
            animationSequence = [];
            //console.log("leftFpr "+leftFpr);
            var fpr = leftFpr;
            var nor = ( endFrame + 1 ) / fpr;

            for( var j=nor; j>=1 ; j-- ){
                    for( var i=((fpr*nor)/j); i>=((fpr*nor)/j)-(leftFpr-1); i-- ) {
                        //animationSequence2.push( ((fpr-i)*j)  );

                        animationSequence.push(i-1);
                }
            }
            //console.log("inside left ");
                        //console.log(animationSequence);
        }

        //console.log("check this two arrays below 1");
        //console.log( animationSequence );
        //console.log("check this two arrays below 2"+fpr+" "+nor);
        //console.log( animationSequence2 );

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
            /*console.log("ok running left =============> "+this.leftRun+" "+this.rightRun);
            if( this.leftRun == true && this.rightRun == false ) {
                console.log("ok running left =============> ");
                ctxPlayer.scale(-1,1);
            }*/
            //console.log(" col value "+col+" row value "+row);
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

    var keyBKeys = new keyBoardKeys();
    function keyBoardKeys(){

        this.currentKey = "";
        this.inProcess = false;
        this.isRunning = false;
        this.isStanding = true;
        this.isLeftStanding = false;
        this.isBend = false;
        this.isShooting = false;
        this.isJumping = false;
        this.isKnifeAttack = false;
        this.leftRun=false;
        this.rightRun=false;
        this.isFireAttack = false;

    }

    var player = new Character();

    //Character function
    //29px is standard tile
    function Character(){
        this.tileFrom   = [3,3];
        this.tileFrom2  = [3,4];
        this.tileTo     = [3,3];
        this.tileTo2    = [3,4];
        this.tileMoved  = 0;
        this.dimensions = [29, 58];
        //80 60
        this.position   = [80,87];
        this.playerAct  =  [80,87];
        keyBKeys.isRunning = false;
        keyBKeys.isStanding = true;
        keyBKeys.isLeftStanding = false;
        keyBKeys.isBend = false;
        keyBKeys.isShooting = false;
        keyBKeys.isJumping = false;
        keyBKeys.isKnifeAttack = false;
        keyBKeys.isFireAttack = false;
        this.delayMove = 100;
        this.sx = 5;
        this.sy = 5;
        this.sw = 55;
        this.sh = 60;
        this.dx = 0;
        this.dy = 0;
        this.dw = 55;
        this.dh = 60;

        this.standSprite = new Animation( new SpriteSheet( assetLoader.imgs.comknife, 50, 58 ), 9, 0, 0, false, 0 );
        this.standLeftSprite = new Animation( new SpriteSheet( assetLoader.imgs.comLeftKnife, 50, 58 ), 9, 1, 1, false, 2 );
        this.knifeSprite = new Animation( new SpriteSheet( assetLoader.imgs.comknife, 50, 58 ), 9, 0, 3, false, 0 );
        this.runSprite = new Animation( new SpriteSheet( assetLoader.imgs.comrun, 50, 58 ), 5, 0, 5, false, 0 );
        this.sitSprite = new Animation( new SpriteSheet( assetLoader.imgs.comsit, 47, 58 ), 9, 0, 3, false, 0 );
        this.runLeftSprite = new Animation( new SpriteSheet( assetLoader.imgs.comleftrun, 50, 58 ), 5, 0, 5, true, 3 );
        this.knifeLeftSprite = new Animation( new SpriteSheet( assetLoader.imgs.comLeftKnife, 50, 58 ), 9, 0, 3, true, 2 );
        this.fireRightSprite = new Animation( new SpriteSheet( assetLoader.imgs.comFire, 50, 58 ), 9, 0, 3, false, 0 );
        this.fireLeftSprite = new Animation( new SpriteSheet( assetLoader.imgs.comLeftFire, 50, 58 ), 9, 0, 3, true, 2 );
        //this.delayMove  = 700; 
        // 5 + 64 + 64 + 64 + 5 = 202
        // 5 + 66 + 66 + 5 = 142
    }
    
    //Update character position
    Character.prototype.update = function(){
        
        if(  keyBKeys.isStanding && !keyBKeys.isRunning && !keyBKeys.isBend &&
             !keyBKeys.isShooting && !keyBKeys.isJumping && !keyBKeys.isKnifeAttack &&
             !keyBKeys.isLeftStanding && !keyBKeys.isFireAttack ){
            //console.log("ok inside standing");

            this.standSprite.update();
            //ctx.fillStyle = '#0000ff';
            //ctx.fillRect( 0, 0, 20, 40);
        }

        if(  !keyBKeys.isStanding && !keyBKeys.isRunning && !keyBKeys.isBend &&
             !keyBKeys.isShooting && !keyBKeys.isJumping && !keyBKeys.isKnifeAttack &&
             keyBKeys.isLeftStanding && !keyBKeys.isFireAttack ){
            //console.log("ok inside standing");

            this.standLeftSprite.update();
            //ctx.fillStyle = '#0000ff';
            //ctx.fillRect( 0, 0, 20, 40);
        }


        if(  !keyBKeys.isStanding && !keyBKeys.isRunning && !keyBKeys.isBend &&
             !keyBKeys.isShooting && !keyBKeys.isJumping && keyBKeys.isKnifeAttack &&
             !keyBKeys.isLeftStanding && !keyBKeys.isFireAttack ){

            console.log("inside knife used ====> update "+keyBKeys.leftRun+" "+keyBKeys.rightRun);
            if( keyBKeys.leftRun == false && keyBKeys.rightRun == true ) {
                this.knifeSprite.update();
            }
            
            if( keyBKeys.leftRun == true && keyBKeys.rightRun == false ) {
                this.knifeLeftSprite.update();
            }
        }

        if(  !keyBKeys.isStanding && keyBKeys.isRunning && !keyBKeys.isBend &&
             !keyBKeys.isShooting && !keyBKeys.isJumping && !keyBKeys.isKnifeAttack &&
             !keyBKeys.isLeftStanding && !keyBKeys.isFireAttack ){
            //console.log("inside running used ====> update");
            
            if( KEY_STATUS['left'] ) {
                this.runLeftSprite.update();
            }
            if( KEY_STATUS['right'] ) {
                this.runSprite.update();
            }
        }

        if( !keyBKeys.isStanding && !keyBKeys.isRunning && keyBKeys.isBend &&
             !keyBKeys.isShooting && !keyBKeys.isJumping && !keyBKeys.isKnifeAttack &&
             !keyBKeys.isLeftStanding && !keyBKeys.isFireAttack) {

            this.sitSprite.update();
        }

        if( !keyBKeys.isStanding && !keyBKeys.isRunning && !keyBKeys.isBend &&
             !keyBKeys.isShooting && !keyBKeys.isJumping && !keyBKeys.isKnifeAttack &&
             !keyBKeys.isLeftStanding && keyBKeys.isFireAttack ) {

            
            if( keyBKeys.leftRun == false && keyBKeys.rightRun == true ) {
                this.fireRightSprite.update();
                
            }
            
            if( keyBKeys.leftRun == true && keyBKeys.rightRun == false ) {
                this.fireLeftSprite.update();

            }
        }

    }

    //Draw character position
    Character.prototype.draw = function(){

        if(  keyBKeys.isStanding && !keyBKeys.isRunning && !keyBKeys.isBend &&
             !keyBKeys.isShooting && !keyBKeys.isJumping && !keyBKeys.isKnifeAttack &&
             !keyBKeys.isLeftStanding && !keyBKeys.isFireAttack ){
            //console.log("ok inside standing");

            this.standSprite.draw(player.playerAct[0],player.playerAct[1]);
            //ctx.fillStyle = '#0000ff';
            //ctx.fillRect( 0, 0, 20, 40);
        }

        if(  !keyBKeys.isStanding && !keyBKeys.isRunning && !keyBKeys.isBend &&
             !keyBKeys.isShooting && !keyBKeys.isJumping && !keyBKeys.isKnifeAttack &&
             keyBKeys.isLeftStanding && !keyBKeys.isFireAttack  ){
            //console.log("ok inside standing");

            this.standLeftSprite.draw(player.playerAct[0],player.playerAct[1]);
            //ctx.fillStyle = '#0000ff';
            //ctx.fillRect( 0, 0, 20, 40);
        }

        if(  !keyBKeys.isStanding && !keyBKeys.isRunning && !keyBKeys.isBend &&
             !keyBKeys.isShooting && !keyBKeys.isJumping && keyBKeys.isKnifeAttack &&
             !keyBKeys.isLeftStanding && !keyBKeys.isFireAttack  ){
            //console.log("inside knife used ====> draw ");
            //this.knifeSprite.clearM(0,0);
            if( keyBKeys.leftRun == false && keyBKeys.rightRun == true ) {
                this.knifeSprite.draw(player.playerAct[0],player.playerAct[1]);
            }
            if( keyBKeys.leftRun == true && keyBKeys.rightRun == false ) {
                this.knifeLeftSprite.draw(player.playerAct[0],player.playerAct[1]);
            }
        }

        if(  !keyBKeys.isStanding && keyBKeys.isRunning && !keyBKeys.isBend &&
             !keyBKeys.isShooting && !keyBKeys.isJumping && !keyBKeys.isKnifeAttack &&
             !keyBKeys.isLeftStanding && !keyBKeys.isFireAttack  ){
            //console.log("inside running used ====> draw");
            //this.runSprite.draw(player.playerAct[0],player.playerAct[1]);

            if( KEY_STATUS['left'] ) {
                 this.runLeftSprite.draw(player.playerAct[0],player.playerAct[1]);
            }
            if( KEY_STATUS['right'] ) {
                 this.runSprite.draw(player.playerAct[0],player.playerAct[1]);           
            }

        }

        if( !keyBKeys.isStanding && !keyBKeys.isRunning && keyBKeys.isBend &&
             !keyBKeys.isShooting && !keyBKeys.isJumping && !keyBKeys.isKnifeAttack &&
             !keyBKeys.isLeftStanding && !keyBKeys.isFireAttack  ) {
 
            this.sitSprite.draw(player.playerAct[0],player.playerAct[1]);
        }

        if( !keyBKeys.isStanding && !keyBKeys.isRunning && !keyBKeys.isBend &&
             !keyBKeys.isShooting && !keyBKeys.isJumping && !keyBKeys.isKnifeAttack &&
             !keyBKeys.isLeftStanding && keyBKeys.isFireAttack ) {

            
            if( keyBKeys.leftRun == false && keyBKeys.rightRun == true ) {
                this.fireRightSprite.draw(player.playerAct[0],player.playerAct[1]);
            }
            
            if( keyBKeys.leftRun == true && keyBKeys.rightRun == false ) {
                this.fireLeftSprite.draw(player.playerAct[0],player.playerAct[1]);
            }

        }

    }

    Character.prototype.placeAt = function(x,y) {

        this.tileFrom = [x,y];
        this.tileTo   = [x,y];
        //for x = 2, y = 1
        // 80 + 5
        // 40 + 5

        //positions are always pixel
        this.position = [tileW*x , 
                         tileH*y ];
    }

    Character.prototype.processMovement = function( t ){

        if( this.tileFrom[0] == this.tileTo[0] &&
            this.tileFrom[1] == this.tileTo[1] ){
            return false;
        }

        //console.log(" this.tileFrom 0 "+this.tileFrom[0]+" this.tileTo 0 "+this.tileTo[0]);
        //console.log(" this.tileFrom 1 "+this.tileFrom[1]+" this.tileTo 1 "+this.tileTo[1]);



         if( (t - this.tileMoved) >= this.delayMove ) {

            this.placeAt( this.tileTo[0], this.tileTo[1] ); 
            //console.log("tile was placed here ===> at tileTo 0 "+this.tileTo[0]+" tileTo 1 "+this.tileTo[1]);

            }
            else {
                   
                   this.position[0] = (this.tileFrom[0] * tileW);

                   this.position[1] = (this.tileFrom[1] * tileH);

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
            
                
            return true;
            
            

    }
    
    function toIndex(x,y){

        return ( (y * mapW) + x );

    }
    
    function startGame(){
        //animate();
        background.reset();
        background.draw();
        //level 1 for begining
        gameLevel.currentLevel = levelObj["level"+levelCnt];
        //console.log(gameLevel.currentLevel);
        animate();
        assetLoader.sounds.bg.currentTime = 0;
                        assetLoader.sounds.bg.loop = true;
                        assetLoader.sounds.bg.play();

    }
    //Loading All Images
    assetLoader.downloadAll();
    
}(jQuery, this));