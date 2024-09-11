![Logo](https://www.simform.com/wp-content/uploads/2022/12/logo.svg)

# Transloadit File Upload & Processing

This project demonstrates how to use Transloadit for processing file uploads, including resizing images, generating video thumbnails, encoding videos, transcoding audio files, converting documents to PDF, and exporting all processed files to Amazon S3 storage.

## Features

- **Image Resizing/optimize**: Automatically resizes images to a defined width and height.
- **Video Thumbnails**: Generates multiple thumbnails from videos for preview purposes.
- **Video Encoding**: Encodes videos optimized for iPad devices.
- **Audio Transcoding**: Converts audio files into MP3 format.
- **Document Conversion**: Converts any uploaded document into PDF format.
- **Face Detection**: Detect face & cordinates using AI robot.
- **Speech Recognition**: Detect speech recognition when prompt given to transloadit.
- **Transcribe**: Convert text from uploaded audio files.
- **Archived Files**: Generate zip file for uploaded resources.
- **Export to S3**: Automatically uploads the processed files to an Amazon S3 bucket.

## Usage

1. **File Upload**: Users can select a file (image, video, audio, or document) through the web interface.
2. **Processing**: Once uploaded, the file is processed by Transloadit using the pre-configured template. Each file type is processed accordingly (e.g., resized for images, transcoded for audio).
3. **Result**: After processing, the files are automatically uploaded to your S3 bucket, and the user is provided with a download link for the processed files.

### How to Run

1. Select a file using the upload button.
2. Click the "Upload" button to start the file processing.
3. Once processing is complete, download links for each processed file will appear.

### Clone the repository

1. Clone using below command:
   ```bash
   git clone https://github.com/Akshay8122/PWA-Practice
   ```
