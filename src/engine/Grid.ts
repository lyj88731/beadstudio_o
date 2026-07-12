import { Graphics } from "pixi.js";


export default function createGrid(
  cols = 100,
  rows = 100,
  cellSize = 20,
  strong5 = true,
  strong10 = true
){

  const grid =
    new Graphics();


  const width =
    cols * cellSize;

  const height =
    rows * cellSize;



const drawLine = (
  x1:number,
  y1:number,
  x2:number,
  y2:number,
  strong5Line:boolean,
  strong10Line:boolean
)=>{


  const line =
    new Graphics();


line.setStrokeStyle({
  width:
    strong10Line ? 3 :
    strong5Line ? 2 :
    1,

  color:
    strong10Line ? 0x555555 :
    strong5Line ? 0x888888 :
    0xcfcfcf,

  alpha:1
});


  line.moveTo(
    x1,
    y1
  );


  line.lineTo(
    x2,
    y2
  );


  line.stroke();


  grid.addChild(
    line
  );

};



  // 세로

  for(
    let x = 0;
    x <= cols;
    x++
  ){

    drawLine(
  x * cellSize,
  0,
  x * cellSize,
  height,

  strong5 &&
  x % 5 === 0,

  strong10 &&
  x % 10 === 0
);

  }



  // 가로

  for(
    let y = 0;
    y <= rows;
    y++
  ){

    drawLine(
  0,
  y * cellSize,
  width,
  y * cellSize,

  strong5 &&
  y % 5 === 0,

  strong10 &&
  y % 10 === 0
);

  }

console.log(
  cols,
  rows,
  width,
  height
);



  return grid;

}