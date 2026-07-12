import MardColors from "../data/MardColors";
import type { BeadColor } from "../data/MardColors";


export default class PaletteReducer {


  reduce(
    colors: number[],
    count: number
  ): BeadColor[] {


    const usage =
      new Map<number, number>();


    for (const color of colors) {

      usage.set(
        color,
        (usage.get(color) ?? 0) + 1
      );

    }


    const sorted =
      [...usage.entries()]
        .sort(
          (a, b) => b[1] - a[1]
        )
        .map(
          item => item[0]
        );



    const selected: BeadColor[] = [];



    for (const color of sorted) {

      if (selected.length >= count)
        break;


      const nearest =
        this.findNearest(color);


      if (
        !selected.some(
          item =>
            item.color === nearest.color
        )
      ) {

        selected.push(nearest);

      }

    }



    return selected;

  }



  findNearest(
    color:number
  ):BeadColor {


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



    for (const bead of MardColors) {


      const r2 =
        (bead.color >> 16) & 255;

      const g2 =
        (bead.color >> 8) & 255;

      const b2 =
        bead.color & 255;



      const d =
        Math.pow(r1-r2,2) +
        Math.pow(g1-g2,2) +
        Math.pow(b1-b2,2);



      if (d < distance) {

        distance = d;
        result = bead;

      }

    }


    return result;

  }

}