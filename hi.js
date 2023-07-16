const fs = require('fs');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = 'C:/Users/Ghostrider/Downloads/ffmpeg-6.0-full_build-shared/ffmpeg-6.0-full_build-shared/bin/ffmpeg'; // Replace with the correct absolute path to the ffmpeg binary

ffmpeg.setFfmpegPath(ffmpegPath);


const videoUrl = 'https://youtu.be/hBqxCILVLxQ?list=TLPQMTEwNjIwMjPcfRs1RTgFCQ'; // Replace with the URL of the YouTube video
const outputFilePath = 'output.mp3'; // Replace with the desired output file path

// Download the video using ytdl
const videoStream = ytdl(videoUrl, { quality: 'lowestaudio' });
// Pipe the video stream to ffmpeg for conversion
const ffmpegProcess = ffmpeg(videoStream)
  .audioBitrate(128)
  .audioCodec('libmp3lame')
  .format('mp3')
  .on('end', () => {
    console.log('Conversion complete');
  })
  .on('error', (err) => {
    console.error('Error during conversion:', err);
  })
  .save(outputFilePath);

// Show progress during the conversion
ffmpegProcess.on('progress', (progress) => {
  console.log('Processing:', progress.targetSize, 'KB converted');
});

// Save the converted MP3 file
const outputStream = fs.createWriteStream(outputFilePath);
ffmpegProcess.pipe(outputStream);
