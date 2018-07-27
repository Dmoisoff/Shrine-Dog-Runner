
class Dog{
  constructor(canvas, width, height, image){
    this._ctx = canvas.getContext('2d');
    this._width = width;
    this._height = height;
    this.xPos = 75;
    this.yPos = 335;
    this.ballRadius = 10;
    this.jump = false;
    this.KeyDownHandler = this.KeyDownHandler.bind(this);
    this.KeyUpHandler = this.KeyUpHandler.bind(this);
    this.arcUp = this.arcUp.bind(this);
    this.arcDown = this.arcDown.bind(this);
    this.pexelDog = image;
    this.index = 0;
    this.subIndex = 0;
    document.addEventListener('keydown', this.KeyDownHandler, false);
    document.addEventListener('keyup', this.KeyUpHandler, false);
    this.inAir = false;
  }

  KeyUpHandler(e){
    if(e.keyCode === 32 || e.keyCode === 38){
      this.jump = false;
      this.inAir = true;
    }
  }

  KeyDownHandler(e){
    if (!this.jump && !this.inAir) {
      if(e.keyCode === 32 || e.keyCode === 38){
        this.jump = true;
    }
    }
  }

  dogPosition(){
    return [this.xPos, this.yPos];
  }



  arcUp(value){
    if(value < 255){
      return(0.05);
    }else if(value < 300){
      return(0.3);
    }else{
      return(0.5);
    }
  }

  arcDown(value){
    if(value < 300){
      return(0.05);
    }else if(value < 325){
      return(0.3);
    }else{
      return(0.5);
    }
  }


  draw(){
    // this._ctx.drawImage(this.pexelDog, this.index*36, 0, 37,24, this.xPos, this.yPos, 80, 55);
    this._ctx.drawImage(this.pexelDog, this.index*36.6, 264,  37.6,23.4, this.xPos, this.yPos, 85, 65);
    if(this.jump && this.yPos > 235 ){
      this.yPos -= this.arcUp(this.yPos);
      if(Math.floor(this.yPos) === 235){
        this.jump = false;
        this.inAir = true;
      }
    }
    if(this.inAir){
      this.yPos += this.arcDown(this.yPos);
      if(this.yPos >= 335){
        this.inAir = false;
      }
    }
    this.subIndex += 1;
    if( this.subIndex === 600 ){
      this.index = (this.index + 1) % 5;
      this.subIndex = 0;
    }
  }
}

module.exports = Dog;