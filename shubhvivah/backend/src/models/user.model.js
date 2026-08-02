import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
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
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
})
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;