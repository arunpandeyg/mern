import React, {useContext} from 'react'
import ProfileContext from "../context/ProfileContext"

const Profile = () => {
  const {profile} = useContext(ProfileContext);
 
  return (
    <div>
        <h1>Single Profile Page</h1>
        <img src={profile.profileImage} alt="profileImage" style={{width:"100px", height:"60px"}} />
        <p>{profile.name}</p>
        <p>{profile.email}</p>
        <p>{profile.phoneNumber}</p>
        
    </div>
  )
}

export default Profile
