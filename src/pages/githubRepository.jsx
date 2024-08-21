// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const GithubRepository = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [token, setToken] = useState();
//   const [loading, setLoading] = useState(false);


//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       const response = await fetch(
//         `http://116.202.210.102:3003/auth/callback${location.search}`
//       );
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const data = await response.json();
//       setToken(data.accessToken); // Assuming the response is JSON. Adjust if needed.
//       console.log(data.accessToken);
//     };
//     setLoading(false);
//     fetchData();
//   }, []);


//   useEffect(() => {
//     const userReposUrl = "https://api.github.com/user/repos";
//     if (token) {
//       setLoading(true);
//       const data = async () => {
//         const response = await axios.get(userReposUrl, {
//           headers: {
//             Authorization: `token ${token}`,
//             Accept: "application/vnd.github.v3+json",
//           },
//         });
//         if (response.status) {
//           console.log(response.data, "hgcf");
//           if (response.data.length > 0) {
//             window.location.href = `https://github.com/${response.data[0].owner.login}?tab=repositories`;
//           } else {
//             console.log("No repositories found");
//           }
//         }
//         setLoading(false);
//       };
//       data();
//     }
//   }, [token]);

//   return (
//     <div>
//       {loading && <p>Loading......</p>}
//     </div>
//   );
// };

// export default GithubRepository;


import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./githubRepository.css"
import { toast } from "react-toastify";

// const GithubRepository = () => {
//   const location = useLocation();
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [generateDocLoading, setGenerateDocLoading] = useState(null);
//   const [repos, setRepos] = useState([]);

//   useEffect(() => {
//     const fetchToken = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(`http://116.202.210.102:3003/auth/callback${location.search}`);
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//         const data = await response.json();
//         setToken(data.accessToken);
//         localStorage.setItem('githubToken', data.accessToken);
//       } catch (error) {
//         console.error('Error fetching access token:', error);
//         alert('Authentication failed. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchToken();
//   }, [location.search]);

//   useEffect(() => {
//     if (token) {
//       const fetchRepos = async () => {
//         setLoading(true);
//         try {
//           let repos = [];
//           let page = 1;
//           const perPage = 100;

//           while (true) {
//             const response = await fetch(`https://api.github.com/user/repos?page=${page}&per_page=${perPage}`, {
//               headers: {
//                 Authorization: `token ${token}`,
//                 Accept: "application/vnd.github.v3+json",
//               },
//             });

//             if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//             const data = await response.json();
//             if (data.length === 0) break;

//             repos = repos.concat(data);
//             page += 1;
//           }

//           setRepos(repos);
//         } catch (error) {
//           console.error('Error fetching repositories:', error);
//           alert('Failed to fetch repositories. Please try again.');
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchRepos();
//     }
//   }, [token]);


//   // const handleDownload = async (repoName, owner) => {
//   //   try {
//   //     const response = await fetch(`http://116.202.210.102:3003/download?repoName=${repoName}&owner=${owner}`).then(response => response.text())
//   //       .then(data => {
//   //         alert(data);
//   //       });
//   //     if (!response.ok) {
//   //       console.error(`Failed to fetch: ${response.statusText}`);
//   //       return;
//   //     }
//   //   } catch (error) {
//   //     console.error('Download error:', error);
//   //   }
//   // };

//   const handleDownload = async (repoName, owner) => {
//     try {
//       setGenerateDocLoading(repoName);
//       const response = await fetch(`http://116.202.210.102:3003/download?repoName=${repoName}&owner=${owner}`);
//       const message = await response.text();
//       setGenerateDocLoading(null)
//       alert(message);
//     } catch (error) {
//       console.error('Download error:', error);
//     }
//   };






//   return (
//     <div
//       className="main"
//       style={{
//         padding: "20px",
//         fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//         backgroundColor: 'white'
//       }}
//     >
//       {loading ? (
//         <p style={{ fontSize: "1.5em", textAlign: "center" }}>Loading...</p>
//       ) : (
//         <table
//           style={{
//             width: "100%",
//             borderCollapse: "collapse",
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//             borderRadius: "10px"
//           }}
//         >
//           <thead>
//             <tr
//               style={{
//                 backgroundColor: "#2980b9",
//                 color: "#fff",
//                 textAlign: "left",
//                 padding: "12px 15px",
//               }}
//             >
//               <th style={{ padding: "12px 15px", color: 'black' }}>Repo Name</th>
//               <th style={{ padding: "12px 15px", textAlign: "center", color: 'black' }}>
//                 Download
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {repos.map((repo) => (
//               <tr
//                 key={repo.id}
//                 style={{
//                   backgroundColor: "#f9f9f9",
//                   borderBottom: "1px solid #ddd",
//                   transition: "background-color 0.3s ease",
//                 }}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.backgroundColor = "#f1f1f1")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.backgroundColor = "#f9f9f9")
//                 }
//               >
//                 <td style={{ padding: "12px 15px" }}>{repo.name}</td>
//                 <td
//                   className="download_btn"
//                   style={{ textAlign: "center", padding: "12px 15px" }}
//                 >
//                   <button
//                     onClick={() => handleDownload(repo.name, repo.owner.login)}
//                     style={{
//                       padding: "8px 16px",
//                       fontSize: "1em",
//                       color: "#fff",
//                       backgroundColor: "#3498db",
//                       border: "none",
//                       borderRadius: "4px",
//                       cursor: "pointer",
//                       transition: "background-color 0.3s ease",
//                       width:"330px"
//                     }}
//                     onMouseEnter={(e) =>
//                       (e.currentTarget.style.backgroundColor = "#2980b9")
//                     }
//                     onMouseLeave={(e) =>
//                       (e.currentTarget.style.backgroundColor = "#3498db")
//                     }
//                   >
//                     {generateDocLoading===repo.name  ? "Downloading...." : "Download & generate documentation"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>

//   );
// };



const GithubRepository = () => {
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(null);
  const [generateDocLoading, setGenerateDocLoading] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchToken = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3010/auth/callback${location.search}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setToken(data.accessToken);
        localStorage.setItem('githubToken', data.accessToken);
      } catch (error) {
        console.error('Error fetching access token:', error);
        alert('Authentication failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, [location.search]);

  useEffect(() => {
    if (token) {
      const fetchRepos = async () => {
        setLoading(true);
        try {
          let repos = [];
          let page = 1;
          const perPage = 100;

          while (true) {
            const response = await fetch(`https://api.github.com/user/repos?page=${page}&per_page=${perPage}`, {
              headers: {
                Authorization: `token ${token}`,
                Accept: "application/vnd.github.v3+json",
              },
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            if (data.length === 0) break;

            repos = repos.concat(data);
            page += 1;
          }

          setRepos(repos);
        } catch (error) {
          console.error('Error fetching repositories:', error);
          alert('Failed to fetch repositories. Please try again.');
        } finally {
          setLoading(false);
        }
      };

      fetchRepos();
    }
  }, [token]);

  const handleDownload = async (repoName, owner) => {
    try {
      setDownloadLoading(repoName);
      const response = await fetch(`http://localhost:3010/download?repoName=${repoName}&owner=${owner}`);
      if(response.ok){
        toast.success('Repository was successfully downloaded')
      setDownloadLoading(null);
  
      }
      
      
      
    } catch (error) {
      toast.error('Failed to download repository')
      console.error('Download error:', error);
      setDownloadLoading(null);
    }
  };

  const handleGenerate = async (repoName) => {
    try {
      setGenerateDocLoading(repoName);
      const response = await fetch(`http://localhost:3010/generate-readme`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ repoPath: `../repos/${repoName}` }),
      });
      if(response.ok){
        toast.success('Readme was created successfully')
        setGenerateDocLoading(null);
      }
      
    } catch (error) {
      toast.error('Failed to create README')
      console.error('Generate README error:', error);
      setGenerateDocLoading(null);
    }
  };

  return (
    <div
      className="main"
      style={{
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: 'white'
      }}
    >
      {loading ? (
        <p style={{ fontSize: "1.5em", textAlign: "center" }}>Loading...</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px"
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#2980b9",
                color: "#fff",
                textAlign: "left",
                padding: "12px 15px",
              }}
            >
              <th style={{ padding: "12px 15px", color: 'black' }}>Repo Name</th>
              <th style={{ padding: "12px 15px", textAlign: "center", color: 'black' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {repos.map((repo) => (
              <tr
                key={repo.id}
                style={{
                  backgroundColor: "#f9f9f9",
                  borderBottom: "1px solid #ddd",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f1f1f1")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f9f9f9")
                }
              >
                <td style={{ padding: "12px 15px" }}>{repo.name}</td>
                <td
                  className="download_btn"
                  style={{ textAlign: "center", padding: "12px 15px" }}
                >
                  <button
                    onClick={() => handleDownload(repo.name, repo.owner.login)}
                    disabled={downloadLoading === repo.name || generateDocLoading === repo.name}
                    style={{
                      padding: "8px 16px",
                      fontSize: "1em",
                      color: "#fff",
                      backgroundColor: downloadLoading === repo.name ? "#95a5a6" : "#3498db",
                      border: "none",
                      borderRadius: "4px",
                      cursor: downloadLoading === repo.name ? "not-allowed" : "pointer",
                      transition: "background-color 0.3s ease",
                      width:"330px",
                      marginBottom: "10px"
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = downloadLoading === repo.name ? "#95a5a6" : "#2980b9")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = downloadLoading === repo.name ? "#95a5a6" : "#3498db")
                    }
                  >
                    {downloadLoading === repo.name ? "Downloading..." : "Download Repository"}
                  </button>
                  <button
                    onClick={() => handleGenerate(repo.name)}
                    disabled={generateDocLoading === repo.name || downloadLoading === repo.name}
                    style={{
                      padding: "8px 16px",
                      fontSize: "1em",
                      color: "#fff",
                      backgroundColor: generateDocLoading === repo.name ? "#95a5a6" : "#2ecc71",
                      border: "none",
                      borderRadius: "4px",
                      cursor: generateDocLoading === repo.name ? "not-allowed" : "pointer",
                      transition: "background-color 0.3s ease",
                      width:"330px",
                      marginTop: "10px"
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = generateDocLoading === repo.name ? "#95a5a6" : "#27ae60")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = generateDocLoading === repo.name ? "#95a5a6" : "#2ecc71")
                    }
                  >
                    {generateDocLoading === repo.name ? "Generating Information..." : "Generate Documentation"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};



export default GithubRepository;