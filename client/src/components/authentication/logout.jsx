import axios from "axios";
import toast from "react-hot-toast";

const logout = async (navigate) => {
    try {
        // Attempt to log out on the server
        const response = await axios.post("http://localhost:5555/auth/logout", {}, { withCredentials: true });

        // Show a success message only if the server logs out successfully
        if (response.status === 200) {
            toast.success("Goodbye!");
        } else {
            toast.warning("Logged out locally; server logout failed.");
        }
    } catch (error) {
        // Show an error message if the logout request fails
        toast.error("Failed to log out from the server. Clearing session locally.");
    } finally {
        // Always clear local session data and redirect
        localStorage.removeItem("user");
        navigate("/login/user");
    }
};

export default logout;
