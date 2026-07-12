function Palette() {

  return (

    <section
      className="palette"
      style={{
        height:"100%",
        display:"flex",
        flexDirection:"column",
        overflow:"hidden",
        width:"320px",
      }}
    >


      <div
        className="palette-header"
      >
        Colors
      </div>



<div
 className="palette-body"
 style={{
   flex:1,
   display:"flex",
   flexDirection:"column",
   padding:"10px",
   overflowY:"auto",
   overflowX:"hidden",
   minHeight:0,
 }}
>



        <h3>
          Pattern Info
        </h3>


        <div
          id="pattern-info"
          style={{
            height:"40px",
          }}
        >
          No pattern
        </div>



        <hr />



        <h3
          style={{
            marginBottom:"5px",
          }}
        >
          Used Colors
        </h3>



<div
 id="color-list"
className="palette-list"
 style={{
   height:"400px",
   flexShrink:0,
   overflowY:"auto",
   border:"1px solid #aaa",
   padding:"10px",
 }}
>
          No data
        </div>



        <hr />



        <h3>
          Color Replace
        </h3>



        <div>


          <div>
            Selected :

            <span id="selected-color">
              None
            </span>
          </div>



          <div
            style={{
              display:"flex",
              gap:"10px",
              alignItems:"center",
              marginTop:"10px",
            }}
          >


            <select
              id="replace-color"
            />



            <div
              id="replace-preview"
              style={{
                width:"40px",
                height:"40px",
                border:"1px solid #777",
              }}
            />


          </div>



          <button
            id="recommend-color"
          >
            비슷한 색 추천
          </button>



          <div
            id="recommend-list"
            style={{
              marginTop:"10px",
              maxHeight:"120px",
              overflowY:"auto",
            }}
          />



          <button
            id="replace-button"
          >
            Replace
          </button>


        </div>



      </div>


    </section>

  );

}


export default Palette;