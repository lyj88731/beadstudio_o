import Toolbar from "../components/layout/Toolbar";
import Palette from "../components/layout/Palette";
import Statusbar from "../components/layout/Statusbar";
import Topbar from "../components/layout/Topbar";
import Canvas from "../components/editor/Canvas";
import BottomPalette from "../components/editor/BottomPalette";


function Editor() {


  return (

    <div
      className="app"
      style={{
        height:"100vh",
        display:"flex",
        flexDirection:"column",
        overflow:"hidden",
      }}
    >


      <Topbar />



      <main
        className="editor"
        style={{
          flex:1,
          display:"flex",
          overflow:"hidden",
        }}
      >



        <Toolbar />



        <section
          className="canvas-area"
          style={{
            flex:1,
            display:"flex",
            flexDirection:"column",
            minWidth:0,
          }}
        >


          <section
            className="canvas"
            style={{
              flex:1,
              minHeight:0,
            }}
          >

            <Canvas />

          </section>



          <BottomPalette />


        </section>



        <Palette />


      </main>



      <Statusbar />


    </div>

  );

}


export default Editor;