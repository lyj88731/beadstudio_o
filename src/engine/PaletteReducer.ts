import MardColors from "../data/MardColors";
import type { BeadColor } from "../data/MardColors";


export default class PaletteReducer {


  private cache =
    new Map<number, BeadColor>();


  reduce(
    colors: number[],
    count:number
  ):BeadColor[] {


    const usage =
      new Map<number, number>();


    for(
      const color
      of colors
    ){

      usage.set(
        color,
        (usage.get(color) ?? 0) + 1
      );

    }



    const sorted =
      [...usage.entries()]
      .sort(
        (a,b)=>b[1]-a[1]
      )
      .map(
        item=>item[0]
      );



    const selected:BeadColor[] = [];



    for(
      const color
      of sorted
    ){


      if(
        selected.length >= count
      )
        break;



      const nearest =
        this.findNearest(
          color
        );



      if(
        !selected.some(
          item =>
          item.color === nearest.color
        )
      ){

        selected.push(
          nearest
        );

      }


    }



    return selected;

  }




  findNearest(
    color:number
  ):BeadColor {


    const cached =
      this.cache.get(
        color
      );


    if(cached)
      return cached;



    let result =
      MardColors[0];


    let distance =
      Infinity;



    const r1 =
      (color >> 16) & 255;


    const g1 =
      (color >> 8) & 255;


    const b1 =
      color & 255;




    for(
      const bead
      of MardColors
    ){


      const r2 =
        (bead.color >> 16) & 255;


      const g2 =
        (bead.color >> 8) & 255;


      const b2 =
        bead.color & 255;



      const dr =
        r1-r2;

      const dg =
        g1-g2;

      const db =
        b1-b2;



      const d =
        dr*dr +
        dg*dg +
        db*db;



      if(
        d < distance
      ){

        distance =
          d;

        result =
          bead;

      }

    }



    this.cache.set(
      color,
      result
    );


    return result;

  }


}