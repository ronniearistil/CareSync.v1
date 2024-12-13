import axios from "axios";

const logout = async () => {
    try {
        // Send logout request to the backend
        await axios.post("http://localhost:5555/auth/logout", {}, { withCredentials: true });

        // Clear authentication cookies
        document.cookie = "access_token_cookie=; Max-Age=0;";
        document.cookie = "refresh_token_cookie=; Max-Age=0;";

        // Redirect to the login page
        window.location.href = "/login";
    } catch (err) {
        console.error("Logout failed", err);
        alert("An error occurred while logging out. Please try again.");
    }
};

export default logout;
