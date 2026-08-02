import React from "react";
import ProfileContext from "./ProfileContext";

const profile = [
  {
    id: "1",
    profileImage: "lion.png",
    name: "Arun Pandey",
    email: "arun@gmail.com",
    phoneNumber: "9988000002",
  },
  {
    id: "2",
    profileImage: "lion.png",
    name: "Raj Pandey",
    email: "raj@gmail.com",
    phoneNumber: "9988000002",
  },
  {
    id: "3",
    profileImage: "lion.png",
    name: "Suresh Pandey",
    email: "suresh@gmail.com",
    phoneNumber: "9988000002",
  },
  {
    id: "4",
    profileImage: "lion.png",
    name: "Yogesh Pandey",
    email: "yogesh@gmail.com",
    phoneNumber: "9988000002",
  },
];
const ProfileState = (props) => {
  const setProfile = () => {
    return profile;
  };
  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileState;
