const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 4001;

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, 'input_video.mp4');
    }
  });



  

app.use(cors({
    origin: 'http://localhost:3000'
  }));
  
const upload = multer({ storage });

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Handle file upload
app.post('/upload', upload.single('video'), (req, res) => {
  const videoPath = req.file.path;
  const outputPath = `output/output_video.mp4`;

  // Run Python script to process the video

  console.log("car counting started...")
  exec(`python3 CountCars.py`, (error) => {
    if (error) {
      console.error('Error processing video:', error);
      res.status(500).send('Error processing video');
      return;
    }

    // res.json({ outputVideoLink: `/${outputPath}` });

    const resultFolderPath = path.join(__dirname, 'output');
    if (!fs.existsSync(resultFolderPath)) {
      fs.mkdirSync(resultFolderPath);
    }
    const resultVideoPath = path.join(resultFolderPath, 'output_video.mp4');

    const resultVideoBuffer = fs.readFileSync(resultVideoPath);

    // Send the processed video as a response
    const finalOutputVideo = resultVideoBuffer.toString('base64');
    res.send(finalOutputVideo);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
