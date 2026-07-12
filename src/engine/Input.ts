import Camera from "./Camera";


export default class Input {


  private element: HTMLCanvasElement;

  private camera: Camera;

  private update: () => void;

private getTool:
  ()=>string;

  private paint:
    (
      x:number,
      y:number
    ) => void;


  private cols:number;

  private rows:number;



  private dragging = false;

  private painting = false;



  private lastX = 0;
  private lastY = 0;



  private pointers =
    new Map<number, PointerEvent>();


  private lastDistance = 0;



 constructor(
 element:HTMLCanvasElement,
 camera:Camera,
 update:()=>void,
 paint:(x:number,y:number)=>void,
 cols:number,
 rows:number,
 getTool:()=>string
){

this.getTool =
 getTool;
    this.element =
      element;


    this.camera =
      camera;


    this.update =
      update;


    this.paint =
      paint;


    this.cols =
      cols;


    this.rows =
      rows;



    this.bindEvents();

  }




  private bindEvents(){


    this.element.style.touchAction =
      "none";



    // PC 휠 줌

    this.element.addEventListener(
      "wheel",
      this.onWheel,
      {
        passive:false
      }
    );



    // 통합 입력

    this.element.addEventListener(
      "pointerdown",
      this.onPointerDown
    );


    this.element.addEventListener(
      "pointermove",
      this.onPointerMove
    );


    this.element.addEventListener(
      "pointerup",
      this.onPointerUp
    );


    this.element.addEventListener(
      "pointercancel",
      this.onPointerUp
    );



    this.element.addEventListener(
      "contextmenu",
      e=>e.preventDefault()
    );


  }





  private onWheel =
  (e:WheelEvent)=>{


    e.preventDefault();



    this.camera.zoomAt(

      e.deltaY < 0
        ? 1.1
        : 0.9,

      e.clientX,

      e.clientY

    );



    this.update();


  };







  private onPointerDown =
  (e:PointerEvent)=>{


    this.element.setPointerCapture(
      e.pointerId
    );


    this.pointers.set(
      e.pointerId,
      e
    );



    // 두 손가락 시작

    if(this.pointers.size === 2){


      const pts =
        Array.from(
          this.pointers.values()
        );


      this.lastDistance =
        this.distance(
          pts[0],
          pts[1]
        );


      return;

    }





    // 가운데 버튼 이동

    if(e.button === 1){


      this.dragging =
        true;


      this.lastX =
        e.clientX;


      this.lastY =
        e.clientY;


      return;

    }




    // 왼쪽 펜

    if(
 e.button === 0 ||
 e.pointerType === "touch"
){


  if(
    this.getTool() === "move"
  ){

    this.dragging = true;


    this.lastX =
      e.clientX;


    this.lastY =
      e.clientY;


    return;

  }



  this.painting = true;


  this.paintAt(
    e.clientX,
    e.clientY
  );


}


  };







  private onPointerMove =
  (e:PointerEvent)=>{


    if(
      this.pointers.has(
        e.pointerId
      )
    ){

      this.pointers.set(
        e.pointerId,
        e
      );

    }




    // 핀치 줌

    if(
      this.pointers.size === 2
    ){


      const pts =
        Array.from(
          this.pointers.values()
        );



      const distance =
        this.distance(
          pts[0],
          pts[1]
        );



      if(this.lastDistance){


        const scale =
          distance /
          this.lastDistance;



        const centerX =
          (
            pts[0].clientX +
            pts[1].clientX
          )
          /2;



        const centerY =
          (
            pts[0].clientY +
            pts[1].clientY
          )
          /2;



        this.camera.zoomAt(
          scale,
          centerX,
          centerY
        );


        this.update();

      }



      this.lastDistance =
        distance;



      return;

    }






    if(this.dragging){


      const dx =
        e.clientX -
        this.lastX;


      const dy =
        e.clientY -
        this.lastY;



      this.lastX =
        e.clientX;


      this.lastY =
        e.clientY;



      this.camera.move(
        dx,
        dy
      );



      this.update();


      return;

    }






    if(this.painting){


      this.paintAt(
        e.clientX,
        e.clientY
      );


    }


  };







  private onPointerUp =
  (e:PointerEvent)=>{


    this.pointers.delete(
      e.pointerId
    );


    if(
      this.pointers.size < 2
    ){

      this.lastDistance =
        0;

    }



    this.dragging =
      false;


    this.painting =
      false;


  };








  private paintAt(
    clientX:number,
    clientY:number
  ){



    const rect =
      this.element
        .getBoundingClientRect();




    const x =
      Math.floor(
        (
          clientX -
          rect.left -
          this.camera.x
        )
        /
        this.camera.zoom
        /
        20
      );



    const y =
      Math.floor(
        (
          clientY -
          rect.top -
          this.camera.y
        )
        /
        this.camera.zoom
        /
        20
      );





    // 도안 영역 밖 차단

    if(
      x < 0 ||
      y < 0 ||
      x >= this.cols ||
      y >= this.rows
    ){

      return;

    }



    this.paint(
      x,
      y
    );


    this.update();


  }





  private distance(
    a:PointerEvent,
    b:PointerEvent
  ){


    const dx =
      a.clientX -
      b.clientX;


    const dy =
      a.clientY -
      b.clientY;


    return Math.sqrt(
      dx*dx +
      dy*dy
    );


  }


}