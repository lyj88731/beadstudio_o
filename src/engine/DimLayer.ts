import { Container, Graphics } from "pixi.js";


export default class DimLayer {

  container =
    new Container();


  private graphics =
    new Graphics();


  cellSize = 20;



  constructor(){

    this.container.addChild(
      this.graphics
    );

  }



  showExcept(
    color:number,
    cells:Map<number,number>
  ){

    this.graphics.clear();



    this.graphics.setFillStyle({
      color:0x000000,
      alpha:0.65,
    });



    for(
      const [key,value]
      of cells
    ){


      if(value === color)
        continue;



      const x =
        key % 100000;


      const y =
        Math.floor(
          key / 100000
        );



      this.graphics.rect(

        x * this.cellSize,

        y * this.cellSize,

        this.cellSize,

        this.cellSize

      );

    }



    this.graphics.fill();

  }



  clear(){

    this.graphics.clear();

  }

}