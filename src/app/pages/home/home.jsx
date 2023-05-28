import CameraComponent from "../../components/camera";
import React, { useState, useRef } from "react";
import Tesseract from "tesseract.js";

const Home = () => {
    //Image captured state
    const [image, setImage] = useState(null);

    //Button disabled state
    const [btnDisabled, setBtnDisabled] = useState(false);

    const [ocrResult, setOcrResult] = useState("");

    //Tesseract worker ref
    const workerRef = useRef(null);

    const handleExtract = async () => {
        setBtnDisabled(true);
        Tesseract.recognize(image, "eng", {
            logger: (m) => console.log(m),
        }).then(({ data: { text } }) => {
            console.log("OCR Result", text);
            setOcrResult(text);
            setBtnDisabled(false);
        });
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            <CameraComponent
                image={image}
                setImage={setImage}
                onExtractImage={handleExtract}
                btnDisabled={btnDisabled}
            />
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
