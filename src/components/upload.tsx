// export default UploadComponent;
import React, { useState, ChangeEvent, useRef } from "react";
import { createAssembly } from "../services/transloditService";
import "./upload.css"; // Import the CSS file for styling

const UploadComponent: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [assembly, setAssembly] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUploaded, setIsUploaded] = useState<boolean>(false); // Track successful upload

  const fileInputRef = useRef<HTMLInputElement>(null); // Use ref to control the file input

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setIsUploaded(false); // Reset upload state when a new file is selected
    }
  };

  const handleCancel = () => {
    setFile(null);
    setAssembly(null); // Clear the uploaded assembly result
    setError(""); // Reset error messages
    setIsUploaded(false); // Reset the uploaded state
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input element
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const assemblyResult = await createAssembly(file, import.meta.env.VITE_TRANSLOADIT_TEMPLETE_ID); // Replace with your template ID
      setAssembly(assemblyResult);
      setIsUploaded(true); // Mark as uploaded after successful upload
      setError("");
    } catch (err) {
      setError(`Failed to upload file: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>File Upload & Processing</h2>
      <p className="description">
        Upload your file and Transloadit will process it using the template you've configured. Once processed, a
        download link will be provided.
      </p>

      <div className="file-upload-wrapper">
        <div className="file-input-wrapper">
          <input
            type="file"
            onChange={handleFileChange}
            className="file-input"
            ref={fileInputRef} // Attach ref to the file input element
          />
          {file && (
            <span className="cancel-icon" onClick={handleCancel}>
              &times;
            </span>
          )}
        </div>
        <button
          onClick={handleUpload}
          className="upload-btn"
          disabled={isLoading || !file || isUploaded} // Disable after successful upload
        >
          {isLoading ? "Uploading..." : isUploaded ? "Uploaded" : "Upload File"}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
      {assembly && isUploaded && (
        <div className="result-section">
          <h3>File processed successfully!</h3>
          <a href={assembly.uploads[0].url} target="_blank" className="result-link">
            Download Processed File
          </a>
        </div>
      )}
    </div>
  );
};

export default UploadComponent;
