import React, { useState } from 'react';
import axios from 'axios';
import { IoMdCloseCircle } from "react-icons/io";


const AddQuestion = () => {
    const [form, setForm] = useState({
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctAnswer: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        await axios.post('http://localhost:8081/api/questions/add', form);
        alert("Question added successfully!");
        setForm({ question: '', optionA: '', optionB: '', optionC: '', optionD: '', correctAnswer: '' });
    };

    return (
        <div className="container mt-4 shadow p-4 bg-transparent position-absolute start-50 top-50 translate-middle" style={{width:"800px" ,marginTop:"20px",marginLeft:"100px"}}>

            <IoMdCloseCircle
                size={28}
                className="position-absolute"
                style={{ top: "15px", right: "15px", cursor: "pointer", color: "#dc3545" }}
                onClick={() => navigate(-1)}
           />

            <h3 className=" text-center text-danger mb-3 display-7 text-danger fw-bold fade-in-up glow-text animate__animated animate__rotateIn">Add Question</h3>
            <input type="text" name="question" className="form-control mb-2" placeholder="Enter Question" value={form.question} onChange={handleChange} />
            <input type="text" name="optionA" className="form-control mb-2" placeholder="Option A" value={form.optionA} onChange={handleChange} />
            <input type="text" name="optionB" className="form-control mb-2" placeholder="Option B" value={form.optionB} onChange={handleChange} />
            <input type="text" name="optionC" className="form-control mb-2" placeholder="Option C" value={form.optionC} onChange={handleChange} />
            <input type="text" name="optionD" className="form-control mb-2" placeholder="Option D" value={form.optionD} onChange={handleChange} />
            <select name="correctAnswer" className="form-control mb-3" value={form.correctAnswer} onChange={handleChange}>
                <option value="">Select Correct Answer</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
            </select>
            <div className="text-center">
            <button className="btn btn-outline-danger shadow-sm mt-4 " onClick={handleSubmit}>Add Question</button>
            </div>
        </div>
    );
};

export default AddQuestion;