import React, { useContext } from "react";
import ProfileContext from "@/context/ProfileContext";
import { Link } from "react-router";

const Profiles = () => {
  const { profile } = useContext(ProfileContext);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {profile.map((prof, index) => (
        <div
          key={index}
          style={{ border: "1px solid black", margin: "10px", padding: "10px" }}
        >
          <Link to={`/profile/${prof.id}`}>
            <img
              src={prof.profileImage}
              alt="globe"
              style={{ width: "80px", height: "50px" }}
            />
          </Link>

          <h2>{prof.name}</h2>
          <p>{prof.email}</p>
          <p>{prof.phoneNumber}</p>
        </div>
      ))}
    </div>
  );
};

export default Profiles;
