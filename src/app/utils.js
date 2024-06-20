const verifyAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "/login";
    }
};
export default verifyAuth