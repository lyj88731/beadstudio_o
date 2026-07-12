import { Container, Graphics } from "pixi.js";


export default class HighlightLayer {


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



  showOutline(
    color:number,
    cells:Map<number,number>
  ){


    this.graphics.clear();



    this.graphics.setStrokeStyle({

      width:3,

      color:0xffff00,

      alpha:1,

    });



    const selected =
      new Set<string>();



    for(
      const [key,value]
      of cells
    ){


      if(value !== color)
        continue;



      const x =
        key % 100000;


      const y =
        Math.floor(
          key / 100000
        );


      selected.add(
        `${x},${y}`
      );

    }



    for(
      const pos
      of selected
    ){


      const [
        x,
        y
      ] =
        pos.split(",")
        .map(Number);



      const top =
        !selected.has(
          `${x},${y-1}`
        );


      const bottom =
        !selected.has(
          `${x},${y+1}`
        );


      const left =
        !selected.has(
          `${x-1},${y}`
        );


      const right =
        !selected.has(
          `${x+1},${y}`
        );



      const px =
        x * this.cellSize;


      const py =
        y * this.cellSize;



      if(top){

        this.graphics.moveTo(
          px,
          py
        );

        this.graphics.lineTo(
          px + this.cellSize,
          py
        );

      }



      if(bottom){

        this.graphics.moveTo(
          px,
          py + this.cellSize
        );

        this.graphics.lineTo(
          px + this.cellSize,
          py + this.cellSize
        );

      }



      if(left){

        this.graphics.moveTo(
          px,
          py
        );

        this.graphics.lineTo(
          px,
          py + this.cellSize
        );

      }



      if(right){

        this.graphics.moveTo(
          px + this.cellSize,
          py
        );

        this.graphics.lineTo(
          px + this.cellSize,
          py + this.cellSize
        );

      }


    }



    this.graphics.stroke();


  }



  clear(){

    this.graphics.clear();

  }


}