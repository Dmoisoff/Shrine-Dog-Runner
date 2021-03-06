
class Dog{
  constructor(image){
    this.xPos = 75;
    this.yPos = 350;
    this.KeyDownHandler = this.KeyDownHandler.bind(this);
    this.KeyUpHandler = this.KeyUpHandler.bind(this);
    this.arcUp = this.arcUp.bind(this);
    this.arcDown = this.arcDown.bind(this);
    this.pexelDog = image;
    this.index = 0;
    this.subIndex = 0;
    document.addEventListener('keydown', this.KeyDownHandler, false);
    document.addEventListener('keyup', this.KeyUpHandler, false);
    this.jump = false;
    this.inAir = false;
    this.count = 0;
    this.movementRate = 1;
    this.spriteSpeed = 1;
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
      return(2);
    // }else if(value < 300){
    //   return(3);
    }else{
      return(5);
    }
  }

  arcDown(value){
    if(value < 300){
      return(3);
    // }else if(value < 325){
    //   return(3);
    }else{
      return(4);
    }
  }

  sleep(_ctx){
    const animate = [0,37.2,36.7,36.6,36.4];
    const animateCrop = [37.6,37.7,37.6,37,36];
    _ctx.drawImage(this.pexelDog, (this.index * animate[this.index]), 264, animateCrop[this.index],23.4, this.xPos, this.yPos, 95, 65);
    this.subIndex += 1;
    if( this.subIndex >= 20 ){
      this.index = (this.index + 1) % 5;
      this.subIndex = 0;
    }
    this.count += 1;
    if (this.count === 1000 ) {
      this.count = 1;
    }
  }

  draw(_ctx){
    const animate = [0,37.2,36.7,36.6,36.4];
    const animateCrop = [37.6,37.7,37.6,37,36];
    _ctx.drawImage(this.pexelDog, (this.index * animate[this.index]), 264, animateCrop[this.index],23.4, this.xPos, this.yPos, 95, 65);
    if(this.jump && this.yPos > 235 ){
      this.yPos -= this.arcUp(this.yPos);
      if(Math.floor(this.yPos) <= 235){
        this.inAir = true;
        this.jump = false;
      }
    }
    if(this.inAir){
      this.yPos += this.arcDown(this.yPos);
      if(this.yPos >= 348){
        this.inAir = false;
      }
    }
    this.subIndex += this.spriteSpeed;
    if( this.subIndex >= 20 ){
      this.index = (this.index + 1) % 5;
      this.subIndex = 0;
    }
    this.count += 1;
    if (this.count === 1000 ) {
      this.movementRate += 5;
      this.count = 1;
      this.spriteSpeed += .5;
    }
  }
}

module.exports = Dog;
