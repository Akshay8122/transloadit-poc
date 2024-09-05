// import React, { useState, ChangeEvent, useRef } from "react";
// import { createAssembly, pollAssembly } from "../services/transloditService";
// import "./upload.css"; // Import the CSS file for styling

// const UploadComponent: React.FC = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [assembly, setAssembly] = useState<any>(null);
//   const [error, setError] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [isUploaded, setIsUploaded] = useState<boolean>(false); // Track successful upload

//   const fileInputRef = useRef<HTMLInputElement>(null); // Use ref to control the file input

//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setFile(event.target.files[0]);
//       setIsUploaded(false); // Reset upload state when a new file is selected
//     }
//   };

//   const handleCancel = () => {
//     setFile(null);
//     setAssembly(null); // Clear the uploaded assembly result
//     setError(""); // Reset error messages
//     setIsUploaded(false); // Reset the uploaded state
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""; // Clear the file input element
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setError("Please select a file to upload.");
//       return;
//     }

//     setIsLoading(true);
//     setError("");

//     try {
//       // Step 1: Create the assembly
//       const assemblyResult = await createAssembly(file, import.meta.env.VITE_TRANSLOADIT_TEMPLETE_ID); // Replace with your template ID

//       // Step 2: Poll the assembly until it completes
//       const finalAssemblyResult = await pollAssembly(assemblyResult.assembly_url);

//       // Step 3: Use the final results
//       setAssembly(finalAssemblyResult);
//       setIsUploaded(true); // Mark as uploaded after successful upload
//       setError("");
//     } catch (err) {
//       setError(`Failed to upload file: ${err}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="upload-container">
//       <h2>File Upload & Processing</h2>
//       <p className="description">
//         Upload your file and Transloadit will process it using the template you've configured. Once processed, a
//         download link will be provided.
//       </p>

//       <div className="file-upload-wrapper">
//         <div className="file-input-wrapper">
//           <input
//             type="file"
//             onChange={handleFileChange}
//             className="file-input"
//             ref={fileInputRef} // Attach ref to the file input element
//           />
//           {file && (
//             <span className="cancel-icon" onClick={handleCancel}>
//               &times;
//             </span>
//           )}
//         </div>
//         <button
//           onClick={handleUpload}
//           className="upload-btn"
//           disabled={isLoading || !file || isUploaded} // Disable after successful upload
//         >
//           {isLoading ? "Uploading..." : isUploaded ? "Uploaded" : "Upload File"}
//         </button>
//       </div>

//       {error && <p className="error-message">{error}</p>}

//       {/* Display the results if assembly is completed and there are results */}
//       {assembly && isUploaded && (
//         <div className="result-section">
//           <h3>File processed successfully!</h3>

//           {/* Show links to processed files */}
//           {assembly.results.image_thumbed && assembly.results.image_thumbed[0] && (
//             <div>
//               <h4>Resized Image:</h4>
//               <a href={assembly.results.image_thumbed[0].ssl_url} target="_blank" className="result-link">
//                 Download Resized Image
//               </a>
//             </div>
//           )}

//           {assembly.results.document_converted && assembly.results.document_converted[0] && (
//             <div>
//               <h4>Converted Document:</h4>
//               <a href={assembly.results.document_converted[0].ssl_url} target="_blank" className="result-link">
//                 Download Converted PDF
//               </a>
//             </div>
//           )}

//           {/* Display face detection results */}
//           {assembly.results.faces_detected && assembly.results.faces_detected[0] && (
//             <div className="face-detection-results">
//               <h4>Face Detection Result:</h4>
//               <p>
//                 <strong>Detected Face Coordinates:</strong>
//               </p>
//               <pre>{JSON.stringify(assembly.results.faces_detected[0].meta.faces, null, 2)}</pre>
//               <a href={assembly.results.faces_detected[0].ssl_url} target="_blank" className="result-link">
//                 View Face-Detected Image
//               </a>
//             </div>
//           )}

//           {assembly.results[":original"] && assembly.results[":original"][0] && (
//             <div>
//               <h4>Original Image:</h4>
//               <a href={assembly.results[":original"][0].ssl_url} target="_blank" className="result-link">
//                 Download Original File
//               </a>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadComponent;

import React, { useState, ChangeEvent, useRef } from "react";
import { createAssembly, pollAssembly } from "../services/transloditService";
import "./upload.css"; // Ensure this file contains the CSS for styling

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
      // Step 1: Create the assembly
      const assemblyResult = await createAssembly(file, import.meta.env.VITE_TRANSLOADIT_TEMPLETE_ID); // Replace with your template ID

      // Step 2: Poll the assembly until it completes
      const finalAssemblyResult = await pollAssembly(assemblyResult.assembly_url);

      // Step 3: Use the final results
      setAssembly(finalAssemblyResult);
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
      <h2 className="title">File Upload & Processing</h2>
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
          className={`upload-btn ${isLoading || !file || isUploaded ? "disabled" : ""}`} // Disable after successful upload
          disabled={isLoading || !file || isUploaded}
        >
          {isLoading ? <div className="loading-spinner"></div> : isUploaded ? "Uploaded" : "Upload File"}
        </button>
      </div>

      {/* Error message */}
      {error && <p className="error-message">{error}</p>}

      {/* Success message and results */}
      {assembly && isUploaded && (
        <div className="result-section">
          <h3 className="success-message">File processed successfully!</h3>

          {assembly.results.image_thumbed && assembly.results.image_thumbed[0] && (
            <div className="result-item">
              <h4>Resized Image:</h4>
              <a href={assembly.results.image_thumbed[0].ssl_url} target="_blank" className="result-link">
                Download Resized Image
              </a>
            </div>
          )}

          {assembly.results.document_converted && assembly.results.document_converted[0] && (
            <div className="result-item">
              <h4>Converted Document:</h4>
              <a href={assembly.results.document_converted[0].ssl_url} target="_blank" className="result-link">
                Download Converted PDF
              </a>
            </div>
          )}

          {assembly.results.faces_detected && assembly.results.faces_detected[0] && (
            <div className="result-item">
              <h4>Face Detection Result:</h4>
              <p>
                <strong>Detected Face Coordinates:</strong>
              </p>
              <pre>{JSON.stringify(assembly.results.faces_detected[0].meta.faces, null, 2)}</pre>
              <a href={assembly.results.faces_detected[0].ssl_url} target="_blank" className="result-link">
                View Face-Detected Image
              </a>
            </div>
          )}

          {assembly.results[":original"] && assembly.results[":original"][0] && (
            <div className="result-item">
              <h4>Original Image:</h4>
              <a href={assembly.results[":original"][0].ssl_url} target="_blank" className="result-link">
                Download Original File
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadComponent;
