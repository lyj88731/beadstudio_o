import {
  Container,
  Graphics,
  Text
} from "pixi.js";

import MardColors from "../data/MardColors";


export default class BeadLayer {


  container: Container;

  private graphics: Graphics;

  private textContainer: Container;


  cellSize = 20;


  private cells =
    new Map<number, number>();


  public showNames:boolean = false;



  constructor() {


    this.container =
      new Container();



    this.graphics =
      new Graphics();



    this.textContainer =
      new Container();



    this.container.addChild(
      this.graphics
    );


    this.container.addChild(
      this.textContainer
    );

  }




  getCells(){

    return this.cells;

  }





  set(
    x:number,
    y:number,
    color = 0x000000
  ){


    const key =
      y * 100000 + x;


    this.cells.set(
      key,
      color
    );


    this.redraw();

  }





  erase(
    x:number,
    y:number
  ){


    const key =
      y * 100000 + x;


    this.cells.delete(
      key
    );


    this.redraw();

  }

remove(
  x:number,
  y:number
){

  const key =
    y * 100000 + x;


  this.cells.delete(
    key
  );


  this.redraw();

}






  clear(){


    this.cells.clear();

    this.redraw();

  }





  has(
    x:number,
    y:number
  ){


    const key =
      y * 100000 + x;


    return this.cells.has(key);

  }





  getSize(){


    let maxX = 0;

    let maxY = 0;



    for(
      const key of this.cells.keys()
    ){


      const x =
        key % 100000;


      const y =
        Math.floor(
          key / 100000
        );



      maxX =
        Math.max(
          maxX,
          x
        );


      maxY =
        Math.max(
          maxY,
          y
        );

    }



    return {

      width:maxX + 1,

      height:maxY + 1

    };

  }





  replaceColor(
    from:number,
    to:number
  ){


    for(
      const [key,color]
      of this.cells
    ){


      if(color === from){

        this.cells.set(
          key,
          to
        );

      }

    }


    this.redraw();

  }





  getColors(){


    const colors =
      new Map<number,number>();


    for(
      const color
      of this.cells.values()
    ){


      colors.set(
        color,
        (colors.get(color) ?? 0)+1
      );

    }


    return colors;

  }





  getColor(
    x:number,
    y:number
  ){


    const key =
      y * 100000 + x;


    return (
      this.cells.get(key)
      ?? 0xffffff
    );

  }





  // 외부에서 토글 변경 후 호출
  refresh(){

    this.redraw();

  }





  private redraw(){


    this.graphics.clear();


    this.textContainer.removeChildren();



    for(
      const [key,color]
      of this.cells
    ){


      const x =
        key % 100000;


      const y =
        Math.floor(
          key / 100000
        );



      // 비즈

      this.graphics
        .rect(

          x*this.cellSize + 1,

          y*this.cellSize + 1,

          this.cellSize - 2,

          this.cellSize - 2

        )
        .fill(
          color
        );





      // 색 이름

      if(this.showNames){



        const mard =
          MardColors.find(
            c =>
              c.color === color
          );



        const label =
          mard
            ? mard.id
            : "";



        const brightness =
          (
            (((color >> 16)&255)*299) +
            (((color >> 8)&255)*587) +
            ((color&255)*114)
          )
          /1000;



        const text =
  new Text({

    text:label,


    style:{

      fontSize:8,

      fontWeight:"bold",

      fill:
        brightness > 150
        ? 0x000000
        : 0xffffff

    },


    resolution:4

  });



        text.anchor.set(0.5);



        text.x =
          x*this.cellSize +
          this.cellSize/2;



        text.y =
          y*this.cellSize +
          this.cellSize/2;



        this.textContainer.addChild(
          text
        );

      }


    }


  }


}