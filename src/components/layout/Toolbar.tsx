function Toolbar() {


  return (

    <aside className="toolbar">


      {/* TOOL BUTTONS */}

      <div className="tool-grid">


        <button
          id="open-image"
          className="tool-button"
          title="이미지 열기"
        >
          📂
        </button>


        <button
          id="tool-pen"
          className="tool-button"
          title="펜"
        >
          🖊️
        </button>


        <button
          id="tool-eraser"
          className="tool-button"
          title="지우개"
        >
          🧽
        </button>


        <button
          id="tool-picker"
          className="tool-button"
          title="스포이드"
        >
          🎨
        </button>


        <button
          id="tool-zoom"
          className="tool-button"
          title="확대"
        >
          🔍
        </button>


        <button
          id="tool-move"
          className="tool-button"
          title="이동"
        >
          ✋
        </button>


<button
 id="undo"
 className="history-button"
>
          ↶
        </button>


<button
 id="redo"
 className="history-button"
>
          ↷
        </button>


      </div>





      {/* IMAGE PANEL */}


      <section className="tool-panel">


        <h3>
          IMAGE
        </h3>



        <div className="size-row">

          <label>
            Width
          </label>


          <input
            id="pattern-width"
            type="number"
            min="1"
            max="500"
            defaultValue="50"
          />

        </div>



        <input
          id="pattern-width-slider"
          className="slider"
          type="range"
          min="1"
          max="500"
          defaultValue="50"
        />




        <div className="size-row">

          <label>
            Height
          </label>


          <input
            id="pattern-height"
            type="number"
            min="1"
            max="500"
            defaultValue="50"
          />

        </div>



        <input
          id="pattern-height-slider"
          className="slider"
          type="range"
          min="1"
          max="500"
          defaultValue="50"
        />






        <div className="option-box">


          <label className="check-row">

            <input
              id="lock-ratio"
              type="checkbox"
              defaultChecked
            />

            <span>
              Lock Ratio
            </span>

          </label>




          <label className="check-row">

            <input
              id="grid-5"
              type="checkbox"
              defaultChecked
            />

            <span>
              Grid 5
            </span>

          </label>





          <label className="check-row">

            <input
              id="grid-10"
              type="checkbox"
              defaultChecked
            />

            <span>
              Grid 10
            </span>

          </label>

<label className="check-row">

  <input
    id="show-color-name"
    type="checkbox"
  />

  <span>
    Color Name
  </span>

</label>




        </div>



      </section>






      {/* COLOR PANEL */}



      <section className="tool-panel">


        <h3>
          COLORS
        </h3>



        <input
          id="color-count"
          className="slider"
          type="range"
          min="1"
          max="221"
          defaultValue="50"
        />


        <div
          id="color-count-value"
          className="slider-value"
        >
          50
        </div>





        <button
          id="convert-image"
          className="convert-button"
        >
          Convert
        </button>


<button
  id="export-jpg"
  className="convert-button"
>
  Export JPG
</button>




      </section>




    </aside>

  );

}


export default Toolbar;