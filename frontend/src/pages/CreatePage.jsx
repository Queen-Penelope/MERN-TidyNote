import api from '../lib/axios';
import { ArrowLeftIcon } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate,  } from 'react-router';

const CreatePage = () => {
  const [ title, setTitle ]  = useState("");
  const [ content, setContent ] = useState("");
  const [ loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!title.trim() || !content.trim()) {
      toast.error("All Fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes/", {
        title,
        content
      });
      navigate("/");
      toast.success("Note Created Successfully");
    } catch (error) {
      console.log("ERROR in creating Note", error);
      if(error.response.status === 429){
        toast.error("Slow down! you are creating notes so fast", {
          duration: 10000,
          icon: "💀"
        })
      } else {
        toast.error("Failed to create your Note")
      }
      
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text text-lg font-bold ml-5">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered w-full rounded-4xl mt-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                 <div className="form-control mb-4">
                  <label className='label'>
                    <span className="label-text text-lg font-bold ml-5">Content</span>
                  </label>
                  <textarea placeholder="Write your thoughts here..." 
                          className="textarea textarea-bordered h-32 w-full rounded-4xl mt-2"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}></textarea>
                 </div>
                 <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary rounded-4xl" disabled={loading}>
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                 </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage