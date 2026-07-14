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


    canvas.width =
      targetWidth;


    canvas.height =
      targetHeight;



    const ctx =
      canvas.getContext(
        "2d",
        {
          willReadFrequently:true
        }
      );


    if(!ctx)
      return [];



    ctx.imageSmoothingEnabled = false;



    ctx.clearRect(
      0,
      0,
      targetWidth,
      targetHeight
    );



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



    const pixels:
      PixelData[] =
      new Array(
        targetWidth *
        targetHeight
      );



    let count = 0;



    for(
      let y = 0;
      y < targetHeight;
      y++
    ){


      let index =
        y *
        targetWidth *
        4;



      for(
        let x = 0;
        x < targetWidth;
        x++
      ){


        const r =
          data[index];


        const g =
          data[index + 1];


        const b =
          data[index + 2];


        const a =
          data[index + 3];



        if(a >= 20){


          pixels[count++] = {

            x,

            y,

            color:
              (r << 16) |
              (g << 8) |
              b

          };


        }


        index += 4;


      }

    }



    pixels.length =
      count;



    return pixels;

  }

}