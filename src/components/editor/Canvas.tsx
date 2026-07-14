import { useEffect, useRef } from "react";

import {
  Application,
  Container,
  Graphics,
  Sprite,
  Texture,
} from "pixi.js";


import createGrid from "../../engine/Grid";
import Camera from "../../engine/Camera";
import Input from "../../engine/Input";

import BeadLayer from "../../engine/BeadLayer";
import HoverLayer from "../../engine/HoverLayer";
import DimLayer from "../../engine/DimLayer";
import HighlightLayer from "../../engine/HighlightLayer";

import ImageConverter from "../../engine/ImageConverter";
import PaletteReducer from "../../engine/PaletteReducer";
import HistoryManager from "../../engine/HistoryManager";

import type {
  HistoryAction
} from "../../engine/HistoryManager";

import MardColors from "../../data/MardColors";

import {
  colorDistance
} from "../../engine/ColorUtils";



type Tool =
  | "pen"
  | "eraser"
  | "picker"
  | "move";



function Canvas(){


  const divRef =
    useRef<HTMLDivElement>(null);



  useEffect(()=>{


    let app:Application;



    (async()=>{


      if(!divRef.current)
        return;



      app =
        new Application();



      await app.init({

        resizeTo:
          divRef.current,

        background:
          "#555555",

        antialias:false,

      });



      divRef.current.innerHTML =
        "";



      divRef.current.appendChild(
        app.canvas
      );



      const world =
        new Container();



      app.stage.addChild(
        world
      );



      const camera =
        new Camera();



      const update =
      ()=>{

        camera.apply(
          world
        );

      };



      // =====================
      // Layer 생성
      // =====================



      const paper =
        new Graphics();



      const imageLayer =
        new Container();



      const beads =
        new BeadLayer();


let grid =
  createGrid(
    100,
    100,
    20,
    true,
    true
  );




const gridCheck =
document.getElementById(
  "show-grid"
);


if(gridCheck){

  gridCheck.onchange =
()=>{

  grid.visible =
    (gridCheck as HTMLInputElement)
    .checked;


  update();

};

}

const grid5 =
  document.getElementById(
    "grid-5"
  ) as HTMLInputElement;


const grid10 =
  document.getElementById(
    "grid-10"
  ) as HTMLInputElement;






const showColorName =
  document.getElementById(
    "show-color-name"
  ) as HTMLInputElement;



if(showColorName){

  showColorName.onchange =
  ()=>{


    beads.showNames =
      showColorName.checked;


    beads.refresh();


    update();

  };

}


const updateGrid =
()=>{


  world.removeChild(
    grid
  );


  grid.destroy({
  children:true
});



  grid =
    createGrid(
      beads.getSize().width,
      beads.getSize().height,
      20,
      grid5.checked,
      grid10.checked
    );


  const gridCheck =
    document.getElementById(
      "show-grid"
    ) as HTMLInputElement;



  if(gridCheck){

    // 5/10 켜면 기본 Grid도 체크
    if(
      grid5.checked ||
      grid10.checked
    ){

      gridCheck.checked = true;

    }


    grid.visible =
      gridCheck.checked;

  }



  world.addChild(
    grid
  );


  world.setChildIndex(
    grid,
    world.children.length - 2
  );


  update();

};




if(grid5){

  grid5.onchange =
    updateGrid;

}


if(grid10){

  grid10.onchange =
    updateGrid;

}







      const dim =
        new DimLayer();



      const highlight =
        new HighlightLayer();



      const hover =
        new HoverLayer();

let showHighlight = true;


      // =====================
      // 고정 Layer 순서
      // =====================


      world.addChild(
        paper
      );


      world.addChild(
        imageLayer
      );


      world.addChild(
        beads.container
      );


      world.addChild(
        grid
      );


      world.addChild(
        dim.container
      );



      

      world.addChild(
        highlight.container
      );


      world.addChild(
        hover.container
      );



      const history =
        new HistoryManager();



      let selectedColor:
        number | null = null;

const applySelectedColor =
(color:number)=>{


  selectedColor =
    color;


  const hex =
    "#" +
    selectedColor
      .toString(16)
      .padStart(6,"0");



  const mard =
    MardColors.find(
      c =>
      c.color === selectedColor
    );



  const name =
    mard
    ? mard.name
    : hex;



  const preview =
    document.getElementById(
      "selected-color-preview"
    );


  if(preview){

    preview.style.background =
      hex;

  }



  const nameElement =
    document.getElementById(
      "selected-color-name"
    );


  if(nameElement){

    nameElement.textContent =
      name;

  }


};
        


      let selectedCells:
        Array<{
          x:number;
          y:number;
        }> = [];



      let currentTool:
        Tool = "pen";



      let currentImage:
        HTMLImageElement | null = null;



      let imageSprite:
        Sprite | null = null;


      let imageRatio = 1;

      let paintTimer:
        number | undefined;



      // 현재 레이어 위치 고정 함수

      const resetLayerOrder =
      ()=>{


        world.setChildIndex(
          paper,
          0
        );


        world.setChildIndex(
          imageLayer,
          1
        );


        world.setChildIndex(
          beads.container,
          2
        );


        world.setChildIndex(
          grid,
          3
        );


        world.setChildIndex(
          dim.container,
          4
        );


        world.setChildIndex(
          highlight.container,
          5
        );


        world.setChildIndex(
          hover.container,
          6
        );


      };



      resetLayerOrder();



      update();
            // =====================
      // Used Colors
      // =====================

let selectedRow:
  HTMLDivElement | null = null;

      
      const updateColorList =
      ()=>{



        const colors =
          beads.getColors();



        const list =
          document.getElementById(
            "color-list"
          );



        if(!list)
          return;



        list.innerHTML =
          "";



        for(
          const [color,count]
          of colors
        ){


          const row =
            document.createElement(
              "div"
            );



          row.style.display =
            "flex";


          row.style.alignItems =
            "center";


          row.style.gap =
            "8px";


          row.style.cursor =
            "pointer";


          row.style.marginBottom =
            "6px";



          const box =
            document.createElement(
              "span"
            );



          box.style.width =
            "18px";


          box.style.height =
            "18px";


          box.style.border =
            "1px solid #777";



          box.style.backgroundColor =
            "#" +
            color
              .toString(16)
              .padStart(6,"0");



          const text =
            document.createElement(
              "span"
            );



          const mard =
            MardColors.find(
              c =>
                c.color === color
            );



          text.textContent =
            mard
              ? `${mard.name} (${count}개)`
              : `#${color.toString(16)} (${count}개)`;



          row.appendChild(
            box
          );


          row.appendChild(
            text
          );



          row.onclick =
()=>{


  // 같은 색 다시 클릭 = 해제

  if(selectedColor === color){

    clearHighlight();

    selectedColor =
      null;


    row.style.background =
      "";


    return;

  }



  // 이전 선택 제거

  if(selectedRow){

    selectedRow.style.background =
      "";

  }



  row.style.background =
    "#444";


  row.style.color =
    "white";


  selectedRow =
    row;



  // =====================
  // 선택색 변경 + UI 갱신
  // =====================

  selectedColor =
    color;



  const hex =
    "#" +
    color
      .toString(16)
      .padStart(6,"0");



  const mard =
    MardColors.find(
      c =>
      c.color === color
    );



  const name =
    mard
    ? mard.name
    : hex;



  const preview =
    document.getElementById(
      "selected-color-preview"
    );


  if(preview){

    preview.style.background =
      hex;

  }



  const nameElement =
    document.getElementById(
      "selected-color-name"
    );


  if(nameElement){

    nameElement.textContent =
      name;

  }




  // =====================
  // 선택 셀 저장
  // =====================

  selectedCells =
    [];



  for(
    const [key,value]
    of beads.getCells()
  ){


    if(value === color){


      selectedCells.push({

        x:
          key % 100000,


        y:
          Math.floor(
            key / 100000
          )

      });


    }

  }




  // =====================
  // 하이라이트
  // =====================


  dim.showExcept(
    color,
    beads.getCells()
  );


  highlight.showOutline(
    color,
    beads.getCells()
  );


  
};



          list.appendChild(
            row
          );


        }


      };




      // =====================
      // 전체 선택 해제
      // =====================


      const clearHighlight =
      ()=>{


        dim.clear();

        highlight.clear();


      };




      // =====================
      // 하단 팔레트
      // =====================


      window.addEventListener(
        "paint-color-change",
        (event)=>{


          const e =
            event as CustomEvent<number>;



          selectedColor =
            e.detail;



          clearHighlight();



        }
      );




      // =====================
      // Toolbar Tool
      // =====================
const updateToolUI =
(tool:string)=>{


  document
    .querySelectorAll(
      ".tool-button"
    )
    .forEach(
      (button)=>{

        button.classList.remove(
          "active"
        );

      }
    );



  const button =
    document.getElementById(
      "tool-" + tool
    );



  if(button){

    button.classList.add(
      "active"
    );

  }


};

      const setTool =
      (
        id:string,
        tool:Tool
      )=>{


        const button =
          document.getElementById(
            id
          );



        if(button){


  button.onclick =
  ()=>{


    currentTool =
      tool;

        console.log(
    "현재 툴:",
    currentTool
  );

    updateToolUI(
      tool
    );



    if(tool !== "pen"){

      clearHighlight();

    }


  };


}


      };



      setTool(
        "tool-pen",
        "pen"
      );



      setTool(
        "tool-eraser",
        "eraser"
      );



      setTool(
        "tool-picker",
        "picker"
      );



      setTool(
        "tool-move",
        "move"
      );
      
      
      // =====================
      // Input
      // =====================

new Input(
  app.canvas,
  camera,
  update,
  (x,y)=>{


    // =====================
    // 지우개
    // =====================

    if(
      currentTool === "eraser"
    ){

      const before =
        beads.getColor(
          x,
          y
        );


      if(
        before !== -1
      ){

        beads.remove(
          x,
          y
        );


        history.push([

          {
            x,
            y,
            before,
            after:0xffffff,
          }

        ]);


        updateColorList();

      }


      return;

    }



// =====================
// 스포이드
// =====================

if(
  currentTool === "picker"
){

  const color =
    beads.getColor(
      x,
      y
    );


  // 빈 공간이면 무시
  if(color === -1)
    return;



  // 선택 색 저장
applySelectedColor(
  color
);



  clearHighlight();



const hex =
  "#" +
  color
    .toString(16)
    .padStart(6,"0");



const mard =
  MardColors.find(
    c =>
    c.color === color
  );



  const colorName =
    mard
    ? mard.name
    : hex;




  // =====================
  // 왼쪽 툴바
  // =====================


  const leftPreview =
    document.getElementById(
      "selected-color-preview"
    );


  if(leftPreview){

    leftPreview.style.background =
      hex;

  }



  const leftName =
    document.getElementById(
      "selected-color-name"
    );


  if(leftName){

    leftName.textContent =
      colorName;

  }




  // =====================
  // 오른쪽 Color Replace
  // =====================


  const replacePreview =
    document.getElementById(
      "replace-color-preview"
    );


  if(replacePreview){

    replacePreview.style.background =
      hex;

  }



  const replaceName =
    document.getElementById(
      "selected-color"
    );


  if(replaceName){

    replaceName.textContent =
      colorName;

  }



  return;

}



    // =====================
    // 펜
    // =====================

    console.log(
      "그리기 상태",
      currentTool,
      selectedColor
    );


    if(
      currentTool !== "pen" ||
      selectedColor === null
    )
      return;



    const before =
      beads.getColor(
        x,
        y
      );


    if(
      before === selectedColor
    )
      return;



    beads.set(
      x,
      y,
      selectedColor
    );


    history.push([

      {
        x,
        y,
        before,
        after:selectedColor,
      }

    ]);


    clearTimeout(
      paintTimer
    );


    paintTimer =
      window.setTimeout(
        ()=>{

          updateColorList();

        },
        200
      );


  },
  1000,
  1000,
  ()=>currentTool
);



      // =====================
      // Undo
      // =====================


      const undo =
      ()=>{



        

        const action =
          history.undo();



        if(!action)
          return;



        for(
          const cell
          of action
        ){


          beads.set(
            cell.x,
            cell.y,
            cell.before
          );


        }



        updateColorList();


        update();


      };

const undoButton =
  document.getElementById(
    "undo"
  );


if(undoButton){

  undoButton.onclick =
  ()=>{

    undo();

  };

}

const highlightCheck =
  document.getElementById(
    "show-highlight"
  );


if(highlightCheck){

  highlightCheck.onchange =
  ()=>{


    showHighlight =
      (highlightCheck as HTMLInputElement)
      .checked;



    highlight.enabled =
      showHighlight;



dim.enabled =
  showHighlight;


if(!showHighlight){

  dim.clear();

}



    if(!showHighlight){

      highlight.clear();

      dim.clear();

    }
    else{

      if(selectedColor !== null){

        highlight.showOutline(
          selectedColor,
          beads.getCells()
        );

      }

    }



    update();


  };

}

const redoButton =
  document.getElementById(
    "redo"
  );


if(redoButton){

  redoButton.onclick =
  ()=>{

    redo();

  };

}



      // =====================
      // Redo
      // =====================


      const redo =
      ()=>{


        const action =
          history.redo();



        if(!action)
          return;



        for(
          const cell
          of action
        ){


          beads.set(
            cell.x,
            cell.y,
            cell.after
          );


        }



        updateColorList();


        update();


      };





      // =====================
      // 단축키
      // =====================


      window.addEventListener(
        "keydown",
        (e)=>{
if(e.key === "Escape"){

  clearHighlight();

  selectedColor = null;

}



          if(
            e.ctrlKey &&
            e.key === "z"
          ){


            e.preventDefault();


            undo();


          }



          if(
            e.ctrlKey &&
            e.shiftKey &&
            e.key === "Z"
          ){


            e.preventDefault();


            redo();


          }


        }
      );


      
            // =====================
      // Preview Convert
      // =====================


      const previewConvert =
      ()=>{


        if(!currentImage)
          return;



        beads.clear();



const patternWidth =
  Number(
    (
      document.getElementById(
        "pattern-width"
      ) as HTMLInputElement
    ).value
  ) || 50;



const patternHeight =
  Number(
    (
      document.getElementById(
        "pattern-height"
      ) as HTMLInputElement
    ).value
  ) || 50;



        const colorCount =
          Number(
            (
              document.getElementById(
                "color-count"
              ) as HTMLInputElement
            ).value
          ) || 50;



        const converter =
          new ImageConverter();


        

        const reducer =
          new PaletteReducer();



const pixels =
  converter.convert(
    currentImage,
    patternWidth,
    patternHeight
  );



        const palette =
          reducer.reduce(
            pixels.map(
              p=>p.color
            ),
            colorCount
          );


// =====================
// 색상 매칭 캐시
// =====================

const colorCache =
  new Map<number, number>();



// =====================
// 픽셀 변환
// =====================

for(
  const pixel
  of pixels
){


  let bestColor =
    colorCache.get(
      pixel.color
    );



  // 처음 보는 색만 계산

  if(
    bestColor === undefined
  ){


    let best =
      palette[0];


    let min =
      Infinity;



    for(
      const c
      of palette
    ){


      const distance =
        colorDistance(
          pixel.color,
          c.color
        );



      if(
        distance < min
      ){

        min =
          distance;


        best =
          c;

      }


    }



    bestColor =
      best.color;



    colorCache.set(
      pixel.color,
      bestColor
    );


  }



  beads.set(
    pixel.x,
    pixel.y,
    bestColor,
 false
  );

beads.refresh();
  updateColorList();

  update();

}





        // =====================
        // Grid 재생성
        // =====================


        const size =
          beads.getSize();



        world.removeChild(
          grid
        );

  grid.destroy({
  children:true
});


grid =
  createGrid(
    beads.getSize().width,
    beads.getSize().height,
    20,
grid5.checked,
grid10.checked
  );


world.addChild(
  grid
);

world.setChildIndex(
  grid,
  world.children.length - 1
);


        // 레이어 순서 강제 고정

        world.setChildIndex(
          paper,
          0
        );


        world.setChildIndex(
          imageLayer,
          1
        );


        world.setChildIndex(
          beads.container,
          2
        );


        world.setChildIndex(
          grid,
          3
        );


        world.setChildIndex(
          dim.container,
          4
        );


        world.setChildIndex(
          highlight.container,
          5
        );


        world.setChildIndex(
          hover.container,
          6
        );



        // 흰 배경 크기 변경


        paper.clear();



        paper.rect(
          0,
          0,
          size.width * 20,
          size.height * 20
        );


        paper.fill(
          0xffffff
        );



        // 원본 이미지 숨김


        if(imageSprite){

          imageSprite.visible =
            false;

        }



        clearHighlight();



        updateColorList();



        update();


      };






      // =====================
      // 이미지 로드
      // =====================


      const loadImage =
      (
        file:File
      )=>{


        const url =
          URL.createObjectURL(
            file
          );



        const img =
          new Image();



        img.onload =
        ()=>{


          currentImage =
            img;

imageRatio =
  img.height / img.width;

          if(imageSprite){

            imageLayer.removeChild(
              imageSprite
            );

          }



          imageSprite =
            new Sprite(
              Texture.from(img)
            );



          const scale =
            Math.min(
              800 / img.width,
              800 / img.height
            );



          imageSprite.width =
            img.width * scale;



          imageSprite.height =
            img.height * scale;



          imageSprite.alpha =
            0.35;



          imageLayer.addChild(
            imageSprite
          );



          imageSprite.visible =
            true;



        };



        img.src =
          url;


      };






      const openButton =
        document.getElementById(
          "open-image"
        );



      if(openButton){


        openButton.onclick =
        ()=>{


          const input =
            document.createElement(
              "input"
            );



          input.type =
            "file";



          input.accept =
            "image/*";



          input.onchange =
          ()=>{


            const file =
              input.files?.[0];



            if(file){

              loadImage(
                file
              );

            }


          };



          input.click();


        };


      }





      // =====================
      // Convert 버튼
      // =====================


      const convertButton =
        document.getElementById(
          "convert-image"
        );



      if(convertButton){


        convertButton.onclick =
        ()=>{


          previewConvert();


        };


      }

      const exportJpg =
  document.getElementById(
    "export-jpg"
  );


if(exportJpg){


  exportJpg.onclick =
  ()=>{


    const extract =
      app.renderer.extract;


    if(!extract)
      return;



const image =
  extract.canvas(
    app.stage
  ) as HTMLCanvasElement;


    const link =
      document.createElement(
        "a"
      );


    link.download =
      "bead-pattern.jpg";



    link.href =
      image.toDataURL(
        "image/jpeg",
        0.95
      );



    link.click();


  };

}





// =====================
// Pattern Size Slider Preview
// =====================


const widthInput =
  document.getElementById(
    "pattern-width"
  ) as HTMLInputElement;



const heightInput =
  document.getElementById(
    "pattern-height"
  ) as HTMLInputElement;



const widthSlider =
  document.getElementById(
    "pattern-width-slider"
  ) as HTMLInputElement;



const heightSlider =
  document.getElementById(
    "pattern-height-slider"
  ) as HTMLInputElement;



const lockRatio =
  document.getElementById(
    "lock-ratio"
  ) as HTMLInputElement;





// Width 변경

if(widthSlider){


  widthSlider.onchange =
  ()=>{


    widthInput.value =
      widthSlider.value;



    if(lockRatio.checked){


      const newHeight =
        Math.round(
          Number(widthSlider.value)
          *
          imageRatio
        );



      heightInput.value =
        String(newHeight);



      heightSlider.value =
        String(newHeight);


    }



    previewConvert();


  };

}




// Height 변경

if(heightSlider){


  heightSlider.onchange =
  ()=>{


    heightInput.value =
      heightSlider.value;



    if(lockRatio.checked){


      const newWidth =
        Math.round(
          Number(heightSlider.value)
          /
          imageRatio
        );



      widthInput.value =
        String(newWidth);



      widthSlider.value =
        String(newWidth);


    }



    previewConvert();


  };

}




// 숫자 직접 입력 - Width

if(widthInput){


  widthInput.onchange =
  ()=>{


    widthSlider.value =
      widthInput.value;



    if(lockRatio.checked){


      const newHeight =
        Math.round(
          Number(widthInput.value)
          *
          imageRatio
        );


      heightInput.value =
        String(newHeight);


      heightSlider.value =
        String(newHeight);


    }



    previewConvert();


  };

}




// 숫자 직접 입력 - Height

if(heightInput){


  heightInput.onchange =
  ()=>{


    heightSlider.value =
      heightInput.value;



    if(lockRatio.checked){


      const newWidth =
        Math.round(
          Number(heightInput.value)
          /
          imageRatio
        );


      widthInput.value =
        String(newWidth);


      widthSlider.value =
        String(newWidth);


    }



    previewConvert();


  };

}


      const colorCount =
        document.getElementById(
          "color-count"
        ) as HTMLInputElement;



      const colorCountValue =
        document.getElementById(
          "color-count-value"
        );



      if(colorCount){


        colorCount.oninput =
        ()=>{


          if(colorCountValue){

            colorCountValue.textContent =
              colorCount.value;

          }


          previewConvert();


        };


      }
      
      // =====================
      // Replace 색상 목록
      // =====================


      const replaceSelect =
        document.getElementById(
          "replace-color"
        ) as HTMLSelectElement;



      if(replaceSelect){


        replaceSelect.innerHTML =
          "";



        for(
          const color
          of MardColors
        ){


          const option =
            document.createElement(
              "option"
            );



          option.value =
            String(
              color.color
            );



          option.textContent =
            color.name;



          replaceSelect.appendChild(
            option
          );


        }


      }





      // =====================
      // 추천 색
      // =====================


      const recommendButton =
        document.getElementById(
          "recommend-color"
        );



      if(recommendButton){


        recommendButton.onclick =
        ()=>{


          if(
            selectedColor === null
          )
            return;



          const list =
            document.getElementById(
              "recommend-list"
            );



          if(!list)
            return;



          list.innerHTML =
            "";



          const result =
            MardColors
            .filter(
              c =>
                c.color !== selectedColor
            )
            .sort(
              (a,b)=>


                colorDistance(
                  selectedColor!,
                  a.color
                )
                -
                colorDistance(
                  selectedColor!,
                  b.color
                )

            )
            .slice(
              0,
              5
            );



          for(
            const c
            of result
          ){


  const row =
  document.createElement(
    "div"
  );


row.className =
  "palette-row";






            const box =
  document.createElement(
    "span"
  );


box.className =
  "palette-color";


box.style.backgroundColor =
  "#" +
  c.color
    .toString(16)
    .padStart(6,"0");


            const text =
              document.createElement(
                "span"
              );


            text.textContent =
              c.name;



            row.appendChild(
              box
            );


            row.appendChild(
              text
            );



            row.onclick =
            ()=>{


              replaceSelect.value =
                String(
                  c.color
                );


              const preview =
                document.getElementById(
                  "replace-preview"
                );


              if(preview){

                preview.style.backgroundColor =
                  "#" +
                  c.color
                    .toString(16)
                    .padStart(6,"0");

              }


            };



            list.appendChild(
              row
            );


          }


        };


      }




// =====================
// Replace 실행
// =====================


const replaceButton =
  document.getElementById(
    "replace-button"
  );



if(replaceButton){


  replaceButton.onclick =
  ()=>{


    if(
      selectedCells.length === 0
    )
      return;



    const newColor =
      Number(
        replaceSelect.value
      );



    const actions:
      HistoryAction[] =
      [];



    for(
      const cell
      of selectedCells
    ){


      const before =
        beads.getColor(
          cell.x,
          cell.y
        );



      if(
        before !== newColor
      ){


        beads.set(
          cell.x,
          cell.y,
          newColor
        );



        actions.push({

          x:
            cell.x,

          y:
            cell.y,

          before,

          after:
            newColor,

        });


      }


    }



    if(
      actions.length > 0
    ){


      history.push(
        actions
      );


    }



    // 색상 목록 갱신

    updateColorList();



    // 교체된 색을 현재 선택색으로 변경

    selectedColor =
      newColor;



    // 기존 하이라이트 제거

    clearHighlight();



    // 새 색 기준으로 다시 하이라이트

    const cells =
      beads.getCells();



    highlight.showOutline(
      newColor,
      cells
    );


    dim.showExcept(
      newColor,
      cells
    );



    update();


  };


}





      // =====================
      // Replace 미리보기
      // =====================


      if(replaceSelect){


        replaceSelect.onchange =
        ()=>{


          const preview =
            document.getElementById(
              "replace-preview"
            );



          const color =
            Number(
              replaceSelect.value
            );



          if(preview){

            preview.style.backgroundColor =
              "#" +
              color
                .toString(16)
                .padStart(6,"0");

          }


        };


      }





      // =====================
      // 종료 처리
      // =====================


    })();



    return ()=>{


      if(app){

        app.destroy(
          true
        );

      }


    };


  },[]);




  return (

    <div
      ref={divRef}
      className="palette-color"
      style={{
        width:"100%",
        height:"100%",
      }}
    />

  );


}


export default Canvas;