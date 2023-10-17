let base_url


if (window.location.hostname === "localhost") {
    base_url = "http://localhost:3001"
} else {
    base_url = "https://backend-proyecto-final-soyhenry.onrender.com"
}   

export default base_url