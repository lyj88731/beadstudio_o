import MardColors from "../data/MardColors";


export default class ColorMatcher {

  match(color: number) {

    let closest = MardColors[0];

    let minDistance = Infinity;


    const r1 = (color >> 16) & 255;
    const g1 = (color >> 8) & 255;
    const b1 = color & 255;



    for (const bead of MardColors) {

      const r2 = (bead.color >> 16) & 255;
      const g2 = (bead.color >> 8) & 255;
      const b2 = bead.color & 255;


      const distance =
        Math.pow(r1 - r2, 2) +
        Math.pow(g1 - g2, 2) +
        Math.pow(b1 - b2, 2);


      if (distance < minDistance) {

        minDistance = distance;

        closest = bead;

      }

    }


    return closest.color;
  }
}