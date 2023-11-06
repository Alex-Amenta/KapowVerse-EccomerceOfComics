let base_url

// base_url = "https://jl1m0px7-3001.brs.devtunnels.ms"
if (window.location.hostname === "localhost") {
    base_url = "http://localhost:3001"
    
} else {
    base_url = "https://backend-proyecto-final-soyhenry.onrender.com"
}   

export default base_url