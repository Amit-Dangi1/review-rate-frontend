import React, { useEffect, useState } from 'react'
import Company from './Company'
import axios from 'axios';
import { API } from '../Api';
 
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'bootstrap-icons/font/bootstrap-icons.css';


const Review = () => {

    let[data,setdata] = useState({});  
    let[review,setreview] = useState({fullName:"",subject:"",reviewText:"",rating:""});
    let[reviewdata,setreviewdata] = useState([]);
    let[count,setcount] = useState(0);
    let[starcount,setstarcount] = useState(0)
    let { id } = useParams();
    let navigate = useNavigate();
 

    const back1 = ()=>{
        navigate(-1);
    }


 const renderStars = (rating) => {
  let stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <i
        key={i}
        className={`bi ${i <= rating ? "bi-star-fill" : "bi-star"}`}
        style={{ color: "gold", fontSize: "18px" }}
      ></i>
    );
  }
  return stars;
};


      

      const getData = async(e)=>{
 
        try {
            let res = await axios.get(`${API.getOneCompany}/${id}`) ;
            setdata(res.data.company)
            setcount(res.data.reviews.length);
            setreviewdata(res.data.reviews);
           let c = res.data.reviews.reduce((acc, val) => acc + val.rating, 0);
           setstarcount((c/res.data.reviews.length).toFixed(1));
            toast.success(res.data.msg)
            
        } catch (error) {
        
            toast.error(error.response.data.msg)
            
        }
      }

      useEffect(()=>{
    if (id) getData();
      },[id])
    

      let addReview = async(e)=>{
       e.preventDefault();
        try {
            let res = await axios.post(`${API.addreview}/${data._id}`,review);
            toast.success(res.data.msg);
            getData();
            setreview({fullName:"",subject:"",reviewText:"",rating:0})
        } catch (error) {
          
            
            toast.error(error?.response?.data.msg);
        }
      };
      
      let getReviewData = async () => {
       try {
           let res = await axios.get(`${API.getreview}/${id}`);
           setreviewdata(res.data.reviews)
       } catch (error) {
        toast.error(error.response.data.msg);
       }        
      }
      
  return (
    <>
   <ToastContainer/>
      <div className="container mt-4">
        <div className="row">
            <div className="col-12 mb-4">
             </div>
        </div>

        <div className="card mb-3 shadow-sm">
            <div className="card-body">
                <div className="row g-3 align-items-center">
                    <div className="col-auto">
                        <div className="bg-light p-3 rounded-circle text-center" style={{width: "70px",height: "70px"}}>
                            <span className="fs-4 fw-bold text-secondary">G</span>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col-md-9 col-12">
                                <h5 className="card-title fw-bold">{data.name}</h5>
                                <p className="card-text text-muted mb-1">
                                {data.location}
                                </p>
                                <div className="row g-0 align-items-center">
                                    <div className="col-auto me-2">
                                        <h6 className="mb-0"><i className='bi-star-fill 'style={{color:"gold"}}></i>    Rating:{starcount}</h6>
                                    </div>
                               
                                    <div className="col-auto mx-3 fw-semibold">
                                        <small className="text-muted">{count} Reviews</small>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-12 text-md-end">
                                <p className="text-muted text-end">Founded on: {new Date(data.foundedOn).toLocaleDateString("en-GB")}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-auto">
                    
        <button type="button" className="btn btn-back-color text-white border" data-bs-toggle="modal" data-bs-target="#addReviewModal">+ Add Review</button>
                    </div>
                </div>
            </div>
        </div>

<button className='btn btn-back-color text-white mt-2' onClick={back1}>Back</button>

{reviewdata && reviewdata.length > 0 ?reviewdata?.map((val,key)=>(
    
    <div className="row mt-5">
            <div className="col-12">
                <div className="card mb-3 shadow-sm">
                    <div className="card-body">
                        <div className="row align-items-center g-2">
                            <div className="col-auto">
                                <img src="https://via.placeholder.com/50" className="rounded-circle"/>
                            </div>
                            <div className="col">
                                <h6 className="mb-0 fw-bold">{val.fullName}</h6>
                                <small className="text-muted">{new Date(val.createdAt).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',hour12: false })}</small>
                            </div>
                      
                        </div>
                        <div className="row mt-3">
                            <div className="col-12">
                                <p className="card-text text-muted">{val.reviewText}.</p>
                            </div>
                        </div>
                        <div className="d-flex align-items-center gap-1 mt-2">
        {renderStars(val.rating)}
      </div>
                    </div>
                </div>

                    
            </div>
        </div>
)):(<div  className='mt-5'>No Review</div>)}
    </div> 
 



 
<div className="modal fade" id="addReviewModal" tabIndex="-1" aria-labelledby="addReviewLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content rounded-3 border-0 shadow">
      <div className="modal-header border-0">
        <h5 className="modal-title fw-bold" id="addReviewLabel">Add Review</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={addReview}>
      
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input onChange={(e)=>setreview({...review,fullName:e.target.value})} value={review.fullName} type="text" className="form-control" placeholder="Enter" required/>
          </div>

    
          <div className="mb-3">
            <label className="form-label">Subject</label>
            <input onChange={(e)=>setreview({...review,subject:e.target.value})} value={review.subject} type="text" className="form-control" placeholder="Enter" required/>
          </div>

       
          <div className="mb-3">
            <label className="form-label">Enter your Review</label>
            <textarea onChange={(e)=>setreview({...review,reviewText:e.target.value})} value={review.reviewText} className="form-control" rows="3" placeholder="Description" required></textarea>
          </div>

      
    <div className="mb-3">
  <label className="form-label d-block">Rating</label>
  <div className="d-flex align-items-center gap-2">
    <div className="text-warning fs-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          key={star}
          className={`bi ${star <= review.rating ? "bi-star-fill" : "bi-star"}`}
          style={{ cursor: "pointer" }}
          onClick={() => setreview({ ...review, rating: star })}
        ></i>
      ))}
    </div>
    <span className="text-muted small">
      {review.rating > 0 ? `You rated ${review.rating}` : "Click to rate"}
    </span>
  </div>
</div>

       
          <div className="text-center">
            <button type="submit" className="btn btn-back-color px-4 text-white border">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default Review
