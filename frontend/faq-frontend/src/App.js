import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const BASE_URL = "http://localhost:8888/api/chat"

  // Handle file drop
  const onDrop = (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile.size > 100 * 1024 * 1024) {
      alert('File size exceeds 100 MB. Please upload a smaller file.');
      return;
    }
    setFile(uploadedFile);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  //Calling upload Api
  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`${BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    } finally {
      setIsLoading(false);
      setFile(null)
    }
  };

  //Asking the questions normal
  const handleAskQuestion = async () => {
    if (!question) {
      alert('Please enter a question');
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/ask`, {
        params: { question },
      });
      setResponse(res.data);
    } catch (error) {
      console.error('Error asking question:', error);
      alert('Error asking question');
    } finally {
      setIsLoading(false);
    }
  };


  //Asking the questions in stream
  const handleAskQuestionStream = async () => {
    if (!question) {
      alert("Please enter a question");
      return;
    }

    setIsLoading(true);
    setResponse(""); // Clear previous response

    try {
      const url = `${BASE_URL}/ask/stream`;

      const eventSource = new EventSource(`${url}?question=${encodeURIComponent(question)}`);

      // Listen for incoming data
      eventSource.onmessage = (event) => {
        setResponse((prev) => prev + event.data);
      };

      eventSource.onerror = (error) => {
        console.log("Error in stream:", error);
        eventSource.close();
        setIsLoading(false);
        alert("Error receiving streamed response");
      };

      eventSource.onclose = () => {
        setIsLoading(false);
      };

    } catch (error) {
      console.log("Error asking question:", error);
      alert("Error asking question");
      setIsLoading(false);
    }
  };



  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    multiple: false,
  });

  return (
    <div className="container">
      <h1 className="mt-5">Spring AI RAG Application</h1>

      <div className="mt-4">
        <h3>Upload PDF (Drag and Drop) Max Size 100 MB</h3>
        <div
          {...getRootProps()}
          className="file-dropzone"
          style={{
            border: '2px dashed #ccc',
            padding: '30px',
            borderRadius: '8px',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          <input {...getInputProps()} />
          <p>Drag & drop a PDF file here, or click to select one</p>
        </div>
        {file && (
          <div className="mt-2">
            <strong>Selected file: </strong> {file.name}
          </div>
        )}
        <button
          className="btn btn-primary mt-2"
          onClick={handleFileUpload}
          disabled={isLoading || !file}
        >
          {isLoading ? 'Uploading...' : 'Upload'}
        </button>
      </div>


      <div className="mt-4">
        <h3>Ask a Question</h3>
        <textarea
          className="form-control"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Enter your question"
          rows="4"
        />

        <button
          className="btn btn-success mt-2"
          onClick={handleAskQuestion}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Ask'}
        </button>
        {response && (
          <div className="response-container mt-4">
            <h4 className="response-title">Answer:</h4>
            <div className="response-body">
              {response.split('\n').map((line, index) => (
                <p key={index} className="response-line">
                  {line}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
