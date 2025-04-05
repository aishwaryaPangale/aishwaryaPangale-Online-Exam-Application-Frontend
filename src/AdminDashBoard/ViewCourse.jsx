import React,{useState,useEffect} from "react";
import ReactDom from "react-dom";

const ViewCourse=()=>{
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState({ name: "", description: "" });
    const [search, setSearch] = useState("");
    useEffect(() => {
        fetchCourses();
      }, []);
    
      const fetchCourses = async () => {
        const response = await axios.get("http://localhost:8081/api/courses");
        setCourses(response.data);
      };
    const handleDeleteCourse = async (id) => {
        await axios.delete(`http://localhost:8081/api/courses/${id}`);
        fetchCourses();
      };
    
      const handleUpdateCourse = async (id) => {
        await axios.put(`http://localhost:8081/api/courses/${id}`, course);
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
   <h3>All Courses</h3>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.description}</td>
              <td>
                <button onClick={() => handleUpdateCourse(c.id)}>Edit</button>
                <button onClick={() => handleDeleteCourse(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
   </div>
</>)

}
export default ViewCourse;