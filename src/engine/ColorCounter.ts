import MardColors from "../data/MardColors";


export interface ColorCount {
  name: string;
  color: number;
  count: number;
}


export default class ColorCounter {

  count(colors: number[]): ColorCount[] {

    const map =
      new Map<number, number>();


    for (const color of colors) {

      map.set(
        color,
        (map.get(color) ?? 0) + 1
      );

    }


    const result: ColorCount[] = [];


    for (const [color, count] of map) {

      const info =
        MardColors.find(
          item => item.color === color
        );


      result.push({

        name:
          info?.name ?? "Unknown",

        color,

        count,

      });

    }


    return result.sort(
      (a, b) =>
        b.count - a.count
    );

  }

}