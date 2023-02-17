

function Dummy(props) {
    const number = props.number
    console.log("Succesfully changed to ", number)

    return (
      <div className="App" style={{justifyContent: "center"}}>
        this is page {number}
      </div>
    );
  }
  
  export default Dummy;
  