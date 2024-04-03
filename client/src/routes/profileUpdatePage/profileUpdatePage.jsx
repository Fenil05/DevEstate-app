import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import {useNavigate} from "react-router-dom"
import UploadWidget from "../../components/uploadWidget/UploadWidget";

function ProfileUpdatePage() {
  const navigate = useNavigate()
  
  const [error,setError] = useState("")
  
  const {currentUser,updateUser} = useContext(AuthContext)

  const[avatar,setAvatar] = useState([])

  const handleSubmit = async(e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const {username,email,password} = Object.fromEntries(formData)

    try {
      const res = await apiRequest.put(`users/${currentUser.id}`,{
        username,
        email,
        password,
        avatar:avatar[0]
      })
      updateUser(res.data)
      navigate("/profile")
    } catch (err) {
      setError(err.response.data)
    }
  }

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar[0] || currentUser.avatar || "https://i.pinimg.com/originals/fc/04/73/fc047347b17f7df7ff288d78c8c281cf.png"} alt="" className="avatar" />
        <UploadWidget uwConfig={{
          cloudName:"doahplnvf",
          uploadPreset:"devestate_app",
          multiple:false,
          maxImageFileSize:2000000,
          folder:"avatars"
        }}
        setState={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
