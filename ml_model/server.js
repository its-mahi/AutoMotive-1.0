const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const path = require('path');


const { exec } = require('child_process');
const util = require('util');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const execAsync = util.promisify(exec);

const processVideo = async (inputVideoBuffer) => {
  try {
    if (!inputVideoBuffer) {
      throw new Error('Input video buffer is undefined or null.');
    }

    // Save the uploaded video to the server-side folder (e.g., uploads)
    const uploadFolderPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadFolderPath)) {
      fs.mkdirSync(uploadFolderPath);
    }

    const uploadedVideoPath = path.join(uploadFolderPath, 'uploaded_video.mp4');
    fs.writeFileSync(uploadedVideoPath, inputVideoBuffer);
    
    //?---------------------------------- Python Commands Start ---------------------------------- ?//

    console.log("python script running...");

    //! Command 1
    console.log("python command1 is running...");
    const command1 = "python3 main.py";
    await execAsync(command1);
    console.log("python command1 run successfully...");
    
    
    //! Command 2
    console.log("python command2 is running...");
    const command2 = "python3 add_missing_data.py";
    await execAsync(command2);
    console.log("python command2 run successfully...");
    

    //! Command 3
    console.log("python command3 is running...");
    const command3 = "python3 visualize.py";
    await execAsync(command3);
    console.log("python command3 run successfully...");

    console.log("python script run successfully...");

    //?---------------------------------- Python Commands End ---------------------------------- ?//

    // const processedFolderPath = path.join(__dirname, 'results');
    // if (!fs.existsSync(processedFolderPath)) {
    //   fs.mkdirSync(processedFolderPath);
    // }
    // const processedVideoPath = path.join(processedFolderPath, 'result.mp4');


    const resultFolderPath = path.join(__dirname, 'results');
    if (!fs.existsSync(resultFolderPath)) {
      fs.mkdirSync(resultFolderPath);
    }
    const resultVideoPath = path.join(resultFolderPath, 'result.mp4');

    
    // Read the processed video from the file (out.mp4)
    const resultVideoBuffer = fs.readFileSync(resultVideoPath);

    return resultVideoBuffer;
  } catch (error) {
    console.error('Error processing video:', error);
    throw error;
  }
};

app.post('/upload', upload.single('video'), async (req, res) => {
    try {

        
        console.log("video uploading...")
        
        // Process the uploaded video using your machine learning model
        const resultVideoBuffer = await processVideo(req.file.buffer);
        
        // Save the processed video to the server-side folder
        // const resultFolderPath = path.join(__dirname, 'results');
        // if (!fs.existsSync(resultFolderPath)) {
        //   fs.mkdirSync(resultFolderPath);
        // }

        // const resultVideoPath = path.join(resultFolderPath, 'result.mp4');
        // fs.writeFileSync(resultVideoPath, resultVideoBuffer);

        // res.send(resultVideo);

        console.log("video uploaded successfully")
    
        // Send the processed video as a response
        const finalOutputVideo = resultVideoBuffer.toString('base64');
        res.send(finalOutputVideo);
  
  
    } catch (error) {
      console.error('Error processing video:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});