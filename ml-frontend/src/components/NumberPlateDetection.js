import React, { useState } from 'react';
import axios from 'axios';
import './NumberPlateDetection.css'

function NumberPlateDetection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [resultVideo, setResultVideo] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("video", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:4000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResultVideo(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleDownload = () => {
    const uint8Array = new Uint8Array(
      atob(resultVideo)
        .split("")
        .map((char) => char.charCodeAt(0))
    );
    const blob = new Blob([uint8Array], { type: "video/mp4" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "result_video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="container">
      <h1 className="heading">Number Plate Detection</h1>

      <div class="upload-box">
        <h3>Browse File to Upload</h3>
        <input type="file" onChange={handleFileChange}/>
        <br />
        <br />
        <button id='submit' onClick={handleUpload}>Detect Number Plates</button>
      </div>

      {resultVideo && (
        <div className="result-section">
          <h4 className="sub-heading">Download  Result Video</h4>

          <button onClick={handleDownload} className="download-btn">
            Download Result
          </button>
        </div>
      )}
    </div>
  );
}

export default NumberPlateDetection;
