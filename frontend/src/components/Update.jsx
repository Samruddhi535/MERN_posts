import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {useNavigate} from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);

  const [error, setError] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  const getSingleUser = async () => {

    const response = await fetch(`${import.meta.env.REACT_APP_BACKEND_BASEURL}/${id}`);

    const result = await response.json();
    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      setError("");
      console.log("Updated User", result);
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
    }
  }

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      const updatedUser = { name, email, age }
      const response = await fetch(`${import.meta.env.REACT_APP_BACKEND_BASEURL}/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedUser),
        headers: {
          "Content-Type": "application/json",
        },

      });
      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      }
      if (response.ok) {
        setError("");
        navigate("/all")
      }
    } catch (err) {
      console.log(err.message)
    }


  }

  useEffect(() => {
    getSingleUser();
  }, [])


  return (

    <div className='container my-2'>
      {
        error && <div class="alert alert-danger" >
          {error.message}
        </div>
      }
      <h2 className='text-center'>Edit the data</h2>

      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />

        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input type="number" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Update