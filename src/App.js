import { useState } from "react";
import imageCompression from 'browser-image-compression';
import { TextField, Button, Grid } from "@mui/material";

const App = () => {

    const [image, setImage] = useState("");
    
    const [originalImage, setOriginalImage] = useState("");
    const [newImage, setNewImage] = useState("");

    const download = (e) => {
        const element = document.createElement("a");
        element.href = URL.createObjectURL(image);
        element.download = "image.jpg";
        element.click();
    }

    const compressImage = async (e) => {
      const compressedFile = await imageCompression(e.target.files[0], { 
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      })
      setImage(compressedFile)
      
      
      const originalFileReader = new FileReader();
      originalFileReader.onload = (event) => {
        const dataUrl = event.target.result;
        setOriginalImage(dataUrl);
      };

      originalFileReader.readAsDataURL(e.target.files[0]);


      const newFileReader = new FileReader();
      newFileReader.onload = (event) => {
        const dataUrl = event.target.result;
        setNewImage(dataUrl);
      };
      newFileReader.readAsDataURL(new Blob([compressedFile]));

    }

    return (
        <Grid container>
            <Grid item sm={4} style={{ marginLeft: "auto", marginRight: "auto"}}>

                <h1 style={{textAlign: "center"}}>Image Compressor API</h1>
                <h3 style={{textAlign: "center"}}>Upload Image greater than 1 MB and you will see results in KB</h3>
                <TextField
                    id="imageUpload"
                    type="file"
                    onChange={compressImage}
                    fullWidth
                />

                <br></br><br></br>
                <Button 
                    variant="contained"
                    onClick={download} 
                    fullWidth
                >
                  Download
                </Button>

                { image !== "" && 
                  <>
                    <br></br><br></br>
                    <h3 style={{textAlign: "center"}}>Original Image</h3>
                    <img src={originalImage} width="400"/>
                
                    <br></br><br></br>
                    <h3 style={{textAlign: "center"}}>New Compressed Image</h3>
                    <img src={newImage} width="400"/>
                  </>
                }
            </Grid>
            
        </Grid>
    )
}

export default App;
