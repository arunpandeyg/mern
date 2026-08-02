import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", },
    fullName: {type: String, required: true, trim: true,},
    email: {type: String, required: true, unique: true, trim: true, lowercase: true,},
    password: {type: String, required: true, trim: true,},
    phoneNumber: {type: String, required: true, trim: true,},
    profilePicture: {type: String, default: "",},
    gender: {type: String,trim: true,},
    dharma: { type: String,  },
    varna: { type: String,  },
    jati: { type: String,  },
    occupation: { type: String,  },
    income: { type: String,  },
    state: { type: String,  },
    district: { type: String,  },
    address: { type: String,  },
    height: { type: String,  },
    weight: { type: String,  },
    color: { type: String,  },
    dob: { type: String,  },
    tob: { type: String,  },
    pob: { type: String,  },
    age: { type: String,  },
  },
  { timestamps: true }
);
const Profile = mongoose.models.Profile || mongoose.model("Profile", profileSchema);
export default Profile;
