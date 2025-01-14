import User from "../models/user.model.js";


export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error.message);
        res.status(500).json({ message: "Failed to update user" });
    }
};


export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Trying to delete user with ID:", id); 

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            console.log("User not found"); 
            return res.status(404).json({ message: "User not found" });
        }

        console.log("User deleted successfully"); 
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error.message);
        res.status(500).json({ message: "Failed to delete user" });
    }
};


export const getAllUsers = async (req, res) => {
	try {
	  const users = await User.find()
	  res.status(200).json(users);
	} catch (error) {
	  console.error("Error fetching users:", error);
	  res.status(500).json({ message: "Server error. Could not fetch users." });
	}
  };