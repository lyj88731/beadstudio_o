export interface PixelData {
  x: number;
  y: number;
  color: number;
}


export default class ImageConverter {

  convert(
  image: HTMLImageElement,
  targetWidth: number,
  targetHeight: number
  ): PixelData[] {






    const canvas =
      document.createElement("canvas");


    canvas.width = targetWidth;
    canvas.height = targetHeight;


    const ctx =
      canvas.getContext("2d");


    if (!ctx) return [];

ctx.imageSmoothingEnabled = false;

    ctx.drawImage(
      image,
      0,
      0,
      targetWidth,
      targetHeight
    );



    const data =
      ctx.getImageData(
        0,
        0,
        targetWidth,
        targetHeight
      ).data;



    const pixels: PixelData[] = [];



    for (
      let y = 0;
      y < targetHeight;
      y++
    ) {

      for (
        let x = 0;
        x < targetWidth;
        x++
      ) {


        const index =
          (y * targetWidth + x) * 4;


        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const a = data[index + 3];


        if (a < 20) continue;



        pixels.push({

          x,
          y,

          color:
            (r << 16) |
            (g << 8) |
            b

        });

      }

    }


    return pixels;
  }
}