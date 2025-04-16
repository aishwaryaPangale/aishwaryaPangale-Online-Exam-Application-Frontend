import React, { useState } from 'react';
import axios from 'axios';
import { IoMdCloseCircle } from "react-icons/io";


const AddQuestion = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a CSV file.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post('http://localhost:8081/api/questions/upload-csv', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert("Questions uploaded successfully!");
        } catch (error) {
            alert("Upload failed.");
            console.error(error);
        }
    };

    return (
        <div className="container  text-center shadow-lg p-4 rounded position-absolute start-50 top-50 translate-middle" style={{width:"500px",marginTop:"50px",marginLeft:"100px"}}>
            <h3 className="text-danger mb-4 display-7 text-danger fw-bold">Upload Questions File</h3>
            <input type="file" accept=".csv" onChange={handleFileChange} className="form-control mb-3" />
            <button className="btn btn-outline-danger shadow-sm" onClick={handleUpload}>Upload</button>
        </div>
    );
};
export default AddQuestion;