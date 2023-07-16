const ffmpeg = require('fluent-ffmpeg');

const inputFilePath = './IMG_3072.MOV';
const outputFilePath = './output.mp3';

ffmpeg(inputFilePath)
  .noVideo() // Disable video stream
  .audioCodec('libmp3lame') // Set audio codec to MP3
  .output(outputFilePath)
  .on('end', () => {
    console.log('Audio extraction complete!');
  })
  .on('error', (err) => {
    console.error('Error extracting audio:', err);
  })
  .run();
