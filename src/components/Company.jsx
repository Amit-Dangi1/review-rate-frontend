import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { API } from '../Api';
 


const Company = () => {
  let[company,setcompany] = useState({name:"",location:"",foundedOn:"",city:"",image:""});
  let[data,setdata] = useState([]);
  let[search,setsearch] = useState("");
  let[searchname,setsearchname] = useState("");
  let navigate = useNavigate(); 
  let [originalData, setOriginalData] = useState([]);



  let addCompany = async (e) => {
    e.preventDefault();
    try {
       let res = await axios.post(API.addcompany,company);
              console.log(res.data);
              

       toast.success(res.data.msg||"Company Added");
       getCompany();
          setcompany({
    name:"",
    location:"",
    foundedOn:"",
    city:""
  }) 
     
    } catch (error) {
      
      console.log(error);
            toast.error(error?.response?.data?.msg || "Something went wrong!");

      
    }
    
  }

  let getCompany = async()=>{
    try {
      let res = await axios.get(API.getcompany);
      setdata(res?.data?.comp)
      setOriginalData(res.data.comp)
      console.log(res?.data?.comp);
      
    } catch (error) {
                  toast.error(error.response?.data?.msg || "Something went wrong!");
console.log(error);

    }
  }
  useEffect(()=>{
    getCompany();
  },[])
 
const searchCompany = (e) => {
  e.preventDefault();

  if (!search) {
    setdata(data);  
    return;
  }

  const filtered = data.filter((val) =>
    val.city.toLowerCase().includes(search.toLowerCase())
  );

  setdata(filtered);
};

 let searchByName = ()=>{
   

  const filtered = data.filter((val) =>
    val.name.toLowerCase().includes(searchname.toLowerCase())
  );

  setdata(filtered);
 }
 

 
 
  return (
    <>
    <ToastContainer />

      {/* Navbar */}
  <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
  <div className="container">
    <Link className="navbar-brand d-flex align-items-center gap-2" to="#">
      <span>
        Review<span className="text-primary">&</span><span className="f">RATE</span>
      </span>
    </Link>

    {/* Centered search */}
 <div className="mx-auto w-50">
  <div className="input-group">
    <input onChange={(e)=>setsearchname(e.target.value)}
      type="search"
      className="form-control"
      placeholder="Search By Name"
    />
    <button onClick={searchByName} className="btn btn-back-color text-white fw-semibold border" type="button">
      Search
    </button>
  </div>
</div>

    <ul className="navbar-nav ms-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/signup">SignUp</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>
      </li>
    </ul>
  </div>
</nav>


      <div className="container py-4">

        <div className="bg-white rounded-3 p-3 border">
          <div className="row g-3 align-items-end">
            <div className="col-lg-5">
              <label className="form-label mb-1">Select City</label>
              <div className="input-group">
                <input onChange={(e)=>setsearch(e.target.value)} type="search" className="form-control" placeholder='Enter City Name'/>
                <button onClick={searchCompany} className="btn btn-back-color text-white fw-semibold border">Find Company</button>
              </div>
            </div>

            <div className="col-lg-3 d-flex align-items-end">
              {/* <button className="btn btn-primary w-50 mx-5">
                 Add Company
              </button> */}
              <button type="button" className="btn btn-back-color text-white fw-semibold border mx-5" data-bs-toggle="modal" data-bs-target="#addCompanyModal">
                Add Company
              </button>
            </div>

            <div className="col-lg-4">
              <label className="form-label mb-1">Sort:</label>
              <div className="input-group ">
                <select className=" border w-50 p-1 rounded-2">
                  <option defaultValue>Name</option>
                  <option>Rating</option>
                  <option>Location</option>
                  <option>Average</option>
                </select>
              </div>
            </div>
          </div>
        </div>
<p className='mt-5'></p>
  
        {/* Company Card  */}
        {data?.map((val,index)=>(
        <div key={index} className="card border-0 shadow-sm mb-3">
  

          <div className="card-body">
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <div
                  className="d-flex align-items-center justify-content-center bg-dark text-white rounded-3"
                  style={{ width: "72px", height: "72px" }}
                >
                  <span className="fs-2 fw-bold">G</span>
                </div>
              </div>

              <div className="col">
                <h6 className="mb-1 fw-semibold">{val.name}</h6>
                <div className="text-muted small">
                   {val.location}
                </div>
                <div className="d-flex align-items-center gap-2 mt-2">
                  <span  className="fw-semibold">4.5</span>
                   
                  <span className="text-muted small"> 0</span>
              
                </div>
              </div>

              <div className="col-auto text-end">
                <div className="text-muted small mb-2">Founded on: {new Date(val.foundedOn).toLocaleDateString("en-GB")}</div>
                <Link to={`/review/${val._id}`} className="btn btn-dark">Detail Review</Link>
              </div>
            </div>
          </div>
        </div>
        ))}

     

      </div>


      {/* PopUp */}
      <div className="modal fade" id="addCompanyModal" tabIndex="-1" aria-labelledby="addCompanyModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addCompanyModalLabel">Add Company</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={addCompany}>
                <div className="mb-3">
                  <label  className="form-label">Company name</label>
                  <input type="text" value={company.name} onChange={(e)=>setcompany({...company,name:e.target.value})} className="form-control" id="companyName" placeholder="Enter..." required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">Location</label>
                  <div className="input-group">
                  <select className='form-select'name="location" value={company.location} onChange={(e) => setcompany({...company,location:e.target.value})} required>
  <option value="">Select Location</option>
  <option value="816,Shekhar Central,Manorama Ganj,AB road New Palasia,Indore(MP)">816,Shekhar Central,Manorama Ganj,AB road New Palasia,Indore(MP)</option>
  <option value="414,Kancha Appartement,Bhawarkua,Indore(MP)">414,Kancha Appartement,Bhawarkua,Indore(MP)</option>
  <option value="910,Shekhar Central,Manorama Ganj,AB road New Palasia,Indore(MP)">910,Shekhar Central,Manorama Ganj,AB road New Palasia,Indore(MP)</option>
  <option value="212,Veda Bussiness Park,Bhawarkua,Indore(MP)">212,Veda Bussiness Park,Bhawarkua,Indore(MP)</option>
</select>
                   </div>
                </div>
                <div className="mb-3">
                  <label   className="form-label">Founded on</label>
                  <input value={company.foundedOn} onChange={(e)=>setcompany({...company,foundedOn:e.target.value})} type="date" className="form-control" id="foundedOn" required />
                </div>
                <div className="mb-3">
                  <label  className="form-label">City</label>
                  <input type="text" value={company.city} onChange={(e)=>setcompany({...company,city:e.target.value})} className="form-control" id="city" required/>
                </div>
                  <div className="modal-footer d-flex justify-content-center">
              <button type="submit" className="btn btn-back-color text-white fw-semibold border">Save</button>
            </div>
              </form>
            </div>
          
          </div>
        </div>
      </div>
    </>
  )
}

export default Company
