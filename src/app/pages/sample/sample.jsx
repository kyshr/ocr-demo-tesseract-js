import { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";

const Sample = () => {
    const [ocr, setOcr] = useState("");
    const [imageData, setImageData] = useState(null);
    const worker = createWorker({
        logger: (m) => {
            console.log(m);
        },
    });
    const convertImageToText = async () => {
        if (!imageData) return;
        await worker?.load();
        await worker?.loadLanguage("eng");
        await worker?.initialize("eng");
        const {
            data: { text },
        } = await worker?.recognize(imageData);
        setOcr(text);
    };

    useEffect(() => {
        convertImageToText();
    }, [imageData]);

    useEffect(() => {
        console.log(ocr);
    }, [ocr]);

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const imageDataUri = reader.result;
            console.log("Img Data URI", { imageDataUri });
            setImageData(imageDataUri);
        };
        reader.readAsDataURL(file);
    }
    return (
        <div className="App">
            <div>
                <p>Choose an Image</p>
                <input
                    type="file"
                    name=""
                    id=""
                    onChange={handleImageChange}
                    accept="image/*"
                />
            </div>
            <div className="display-flex">
                <img src={imageData} alt="" srcSet="" />
                <p>{ocr}</p>
            </div>
        </div>
    );
};

export default Sample;
