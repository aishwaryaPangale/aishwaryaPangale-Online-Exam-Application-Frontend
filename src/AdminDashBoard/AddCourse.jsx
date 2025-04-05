import React,{useState} from "react";
import ReactDom from "react-dom";

const AddCourse=()=>{
    const [course, setCourse] = useState({ name: "", description: "" });
    const handleAddCourse = async () => {
        await axios.post("http://localhost:8081/api/course", course);
        setCourse({ name: "", description: "" });
        fetchCourses();
      };
    return(<>
     <div class="sidebar">
        <h2 class="text-center">EXAM PORTAL</h2>
        <div class="text-center">
            <img src="https://www.w3schools.com/howto/img_avatar.png" class="rounded-circle" width="80" height="80"/>
            <h4>Admin</h4>
            <select> <a href="#"><i class="fas fa-chalkboard-teacher"></i> Course</a>
            <option>Add Course</option>
            <option>View Course</option>
            <option>Delete Course</option>
            <option>Update Course</option>
            <option>Search Course</option>
            </select>
        </div>
        </div>
      <div className="content">
      <h1>Admin Dashboard - Course Management</h1>
      <input
        type="text"
        placeholder="Course Name"
        value={course.name}
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={course.description}
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <button onClick={handleAddCourse}>Add Course</button>
      </div>
    </>)
}
export default AddCourse;