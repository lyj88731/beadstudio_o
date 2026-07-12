import { useEffect } from "react";
import MardColors from "../../data/MardColors";


function BottomPalette() {


  useEffect(() => {


    const container =
      document.getElementById(
        "bottom-palette"
      );


    if (!container)
      return;



    container.innerHTML = "";



    for (const color of MardColors) {


      const button =
        document.createElement(
          "button"
        );



      button.style.width =
        "32px";


      button.style.height =
        "32px";


      button.style.minWidth =
        "32px";


      button.style.border =
        "1px solid #777";


      button.style.cursor =
        "pointer";


      button.style.backgroundColor =
        "#" +
        color.color
          .toString(16)
          .padStart(6, "0");



      button.title =
        color.name;



      button.onclick = () => {


        window.dispatchEvent(

          new CustomEvent(
            "paint-color-change",
            {
              detail: color.color,
            }

          )

        );


      };



      container.appendChild(
        button
      );


    }


  }, []);



  return (

    <div

      id="bottom-palette"

      style={{
        height:"50px",
        display:"flex",
        alignItems:"center",
        gap:"4px",
        overflowX:"auto",
        padding:"5px",
        background:"#333",
      }}

    />

  );

}


export default BottomPalette;