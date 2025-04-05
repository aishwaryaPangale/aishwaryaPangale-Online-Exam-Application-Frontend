import React from "react";
import ReactDom from "react-dom";

const SearchCourse=()=>{
    const [search, setSearch] = useState("");
    useEffect(() => {
        fetchCourses();
      }, []);
      
      const fetchCourses = async () => {
        const response = await axios.get("http://localhost:8081/api/courses");
        setCourses(response.data);
      };
      const handleSearch = async () => {
        const response = await axios.get(`http://localhost:8081/api/courses/search/${search}`);
        setCourses(response.data);
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
   <h2>Admin Dashboard - Course Management</h2>
   <input
  type="text"
  placeholder="Search Course"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
<button onClick={handleSearch}>Search</button>
   </div>
</>)

}
export default SearchCourse;