import CameraComponent from "../../components/camera";
import React, { useState, useRef } from "react";
import Tesseract from "tesseract.js";

const Home = () => {
    //Image captured state
    const [image, setImage] = useState(null);

    //Button disabled state
    const [btnDisabled, setBtnDisabled] = useState(false);

    const [ocrResult, setOcrResult] = useState("");

    //Function to extract text from capture image
    const handleExtract = async () => {
        //Disable button to avoid errors
        setBtnDisabled(true);

        //Recognize image using Tesseract.recognize using Promise
        Tesseract.recognize(image, "eng", {
            logger: (m) => console.log(m),
        }).then(({ data: { text } }) => {
            console.log("OCR Result", text);
            //After successful conversion assign result to ocrResult state
            setOcrResult(text);
            //Enable button after successful conversion
            setBtnDisabled(false);
        });
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Render camera component */}
            <CameraComponent
                image={image}
                setImage={setImage}
                onExtractImage={handleExtract}
                btnDisabled={btnDisabled}
            />
            {/* This will display the extracted text */}
            <div className="bg-blue-100">
                <h1 className="text-center text-4xl font-bold p-4">Result</h1>
                {ocrResult && (
                    <p className="text-center text-2xl">{ocrResult}</p>
                )}
            </div>
        </div>
    );
};

export default Home;
