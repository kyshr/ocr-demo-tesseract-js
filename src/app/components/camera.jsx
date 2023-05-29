import React, { useEffect, useRef, useCallback } from "react";
import Webcam from "react-webcam";

const CameraComponent = ({
    image,
    setImage,
    onExtractImage,
    btnDisabled = false,
}) => {
    // Set camera constraints
    const videoConstraints = {
        width: 1920,
        height: 1080,
        facingMode: "user",
    };

    // Create webcam ref
    const webcamRef = useRef(null);

    // Capture image function using useCallback hook
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
    }, [webcamRef]);

    // Tesseract will convert image to text on every captured photo
    useEffect(() => {
        if (image) {
            onExtractImage();
        }
    }, [image]);

    //UI for camera
    return (
        <>
            <div className="flex flex-col items-center justify-center gap-y-4 mb-4 p-4">
                {/* Render react-webcam component passing different properties */}
                <div className="border-2 border-blue-500 rounded-md p-3">
                    <Webcam
                        audio={false}
                        height={720}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={1280}
                        videoConstraints={videoConstraints}
                    />
                </div>

                {/* Capture button */}
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center"
                    onClick={capture}
                    disabled={btnDisabled}>
                    Capture Photo
                </button>

                {/* Display image below after capture */}
                <div id="image" className="">
                    {image && (
                        <img
                            src={image}
                            alt="captured image"
                            className="w-96"
                        />
                    )}
                </div>
            </div>
        </>
    );
};
export default CameraComponent;
