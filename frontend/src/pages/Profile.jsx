import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { updateProfilePicture } from "../api/userAPI";

function Profile() {
  const { user,setUser } = useContext(UserContext);
   
  const [imageFile,setImageFile]=useState(null);
    const handleUpdate=async()=>{
const res=await updateProfilePicture(imageFile);
setUser(res.user);
    }

   
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-500">
      <div className="bg-blue-300 w-[40%]  p-10 rounded-lg ring ring-white">
        <div>
          <img
            src={user?.image || user?.profilePic}
            alt="avatar"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
        </div>
<div>
<h2 className="text-black font-bold mx-auto w-fit"> {user?.name.toUpperCase()}</h2>
<h2 className="text-black font-bold mx-auto w-fit">{user?.email}</h2>
<input type="file" name="image" onChange={(e)=>setImageFile(e.target.files[0])} className="mt-4 w-full text-black"/>
<button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full">Update Profile Picture</button>
</div>
        
      </div>
    </div>
  );
}

export default Profile;
