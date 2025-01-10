import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";

const ProfileForm = () => {
  const { user, updateUserProfile } = useUserStore();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState(user?.address || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const updatedUser = { name, email, address };
    await updateUserProfile(updatedUser); 
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl text-gray-100 mb-4">Edit Profile</h2>
      
      <div className="space-y-2">
        <label htmlFor="name" className="text-gray-300">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded-md bg-gray-700 text-gray-300"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-gray-300">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded-md bg-gray-700 text-gray-300"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="address" className="text-gray-300">Address</label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 rounded-md bg-gray-700 text-gray-300"
          required
        />
      </div>

      <button
        type="submit"
        className={`w-full py-2 rounded-md bg-blue-600 text-white ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default ProfileForm;
