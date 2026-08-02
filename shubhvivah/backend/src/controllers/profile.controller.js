import Profile from "../models/profile.model.js";


export const createProfile = async (req, res) => {
   try {
    const { userId, fullName, email, phoneNumber, profilePicture, gender, dharma, varna, jati, occupation, income, state, district, address, height, weight, color, dob, tob, pob, age } = req.body;


    const profile = new Profile({
        userId,
        fullName,
        email,
        phoneNumber,
        profilePicture,
        gender,
        dharma,
        varna,
        jati,
        occupation,
        income,
        state,
        district,
        address,
        height,
        weight,
        color,
        dob,
        tob,
        pob,
        age,
    });
    await profile.save();
    res.status(201).json(profile);
    
   } catch (error) {
        console.error("Error creating profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }    
   
};
export const updateProfile = async (req, res) => {
   try {
    const profileId = req.params.id; // Assuming profile ID is passed as a URL parameter
    const { fullName, email, phoneNumber, profilePicture, gender, dharma, varna, jati, occupation, income, state, district, address, height, weight, color, dob, tob, pob, age } = req.body;
    const updatedProfile = await Profile.findByIdAndUpdate(
        profileId,
        {
        fullName,
        email,
        phoneNumber,
        profilePicture,
        gender,
        dharma,
        varna,
        jati,
        occupation,
        income,
        state,
        district,
        address,
        height,
        weight,
        color,
        dob,
        tob,
        pob,
        age,
        },
        { new: true } // Return the updated profile
    );
    if (!updatedProfile) {
        return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(updatedProfile);

    
   } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }    
   
};
export const deleteProfile = async (req, res) => {
    try {
        const profileId = req.params.id; // Assuming profile ID is passed as a URL parameter
        const deletedProfile = await Profile.findByIdAndDelete(profileId);
        if (!deletedProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.status(200).json({ message: "Profile deleted successfully" });  
        
    } catch (error) {
        console.error("Error deleting profile:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
};
export const getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find();
        if (profiles.length === 0) {
            return res.status(404).json({ message: "No profiles found" });
        }
        res.status(200).json(profiles);
        
    } catch (error) {
        console.error("Error fetching profiles:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
};
export const getSingleProfile = async (req, res) => {
    try {
        const profileId = req.params.id; // Assuming profile ID is passed as a URL parameter
        const profile = await Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.status(200).json(profile);
        
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
};
export const getCurrentProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is stored in req.user
        const profile = await Profile.findOne({ userId: userId });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.status(200).json(profile);
        
    } catch (error) {
        console.error("Error fetching current profile:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
};