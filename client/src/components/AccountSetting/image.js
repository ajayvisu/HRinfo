import React,{useState} from "react";


const App_image = () =>{

    const [selectedImage, setSelectedImage] = useState(null);
    console.log('s',selectedImage);

    return (
      <div>
        <h1>Upload and Display Image usign React Hook's</h1>
        {selectedImage && (
          <div>
          <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
          <br />
          {/* <button onClick={()=>setSelectedImage(null)}>Remove</button> */}
          </div>
        )}
        <br />
       
        <br /> 
        <input
          type="file"
          name="myImage"
          onChange={(event) => {
            console.log("iiiii",event.target.files[0]);
            setSelectedImage(event.target.files[0]);
          }}
        />
      </div>
    );
}

export default App_image;