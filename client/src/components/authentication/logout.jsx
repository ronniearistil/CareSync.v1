import axios from "axios";
import toast from "react-hot-toast";

const logout = async (navigate) => {
    try {
        await axios.post("http://localhost:5555/auth/logout", {}, { withCredentials: true });
        localStorage.removeItem("user");
        toast.success("Logged out successfully!");
        navigate("/login/user");
    } catch (error) {
        toast.error("Failed to log out. Please try again.");
    }
};

export default logout;


