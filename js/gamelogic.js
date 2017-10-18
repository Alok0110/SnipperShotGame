//Game Logic

;(function( $, global ){
    
    if(!$){
        throw new Error("Jquery is required!");
    }
    
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    
    var assetLoader = (function(){
        
        this.imgs = {
            
            'bg'  : 'img/plx-1.png',
            'bg1' : 'img/plx-2.png',
            'bg2' : 'img/plx-3.png',
            'bg3' : 'img/plx-4.png',
            'bg4' : 'img/plx-5.png'
            
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
            console.log("Reached here in Download All function !");
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
    var background = (function(){
        
        var sky = {};
        
        this.draw = function() {
            ctx.drawImage(assetLoader.imgs.bg, 0, 0);
            
            ctx.drawImage(assetLoader.imgs.bg1, 0, 0);
            ctx.drawImage(assetLoader.imgs.bg2, 0, 0);
            ctx.drawImage(assetLoader.imgs.bg3, 0, 0);
            ctx.drawImage(assetLoader.imgs.bg4, 0, 0);
            
        }
        
        this.reset = function(){
            
        }
        
        return {
            draw: this.draw,
            reset: this.reset
        }
        
    }());
    
    function animate() {
        background.draw();
    }
    
    //Finished then start game
    assetLoader.finished = function(){
        startGame();
    }
    
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
        animate();
    }
    //Loading All Images
    assetLoader.downloadAll();
    
}(jQuery, this));