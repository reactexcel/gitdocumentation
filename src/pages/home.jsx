import React from "react";

const Home = () => {
  const clientId = import.meta.env.VITE_CLIENT_ID; // Replace with your GitHub Client ID
  const redirectUri = "http://localhost:5173/git"; // Replace with your callback URL
  const handleLogin = () => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
    window.location.href = githubAuthUrl; // Redirect to GitHub for authentication
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "400px",
          backgroundColor: "#f0f0f5",
          padding: "20px",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h1
          style={{
            fontSize: "3em",
            fontWeight: "bold",
            color: "#2c3e50",
            marginBottom: "20px",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          Welcome to Our App
        </h1>
        <p
          style={{
            fontSize: "1.3em",
            color: "#7f8c8d",
            marginBottom: "40px",
            textAlign: "center",
            maxWidth: "500px",
            lineHeight: "1.6",
          }}
        >
          Please sign in with your GitHub account to continue and access all the
          features of our application. We ensure secure and easy authentication.
        </p>
        <button
          onClick={handleLogin}
          style={{
            fontSize: "1.2em",
            padding: "12px 25px",
            color: "#fff",
            backgroundColor: "#2980b9",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "background-color 0.3s ease, transform 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#3498db";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#2980b9";
            e.target.style.transform = "scale(1)";
          }}
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
};

export default Home;