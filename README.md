
<div align="center">
<!-- Image of the heading -->
  <br />

    
 

  <br/>
  <br/>



  <br />

  <div>
    <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="Javascript" />
    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="Reactjs" />
    <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
<img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI" />


  </div>

</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [How it Works](#howitworks)
4. 🤸 [Quick Start](#quick-start)

## <a name="introduction">🤖 Introduction</a>

Welcome to the GitHub Repository Documentation Generator! This tool simplifies the process of generating README files for your GitHub repositories by leveraging the power of OpenAI.

## Overview

**This web application allows you to:**

- Authenticate with GitHub: Log in using your GitHub account to access your repositories.

- Select a Repository: Choose any GitHub repository from your account for documentation generation.

- Download the Repository: The tool will first download the selected repository to process its contents.

- Generate Documentation: After downloading, click on the "Generate Documentation" button. The application uses OpenAI to analyze your package.json and package-lock.json files to generate a comprehensive README file tailored to your project.

<!-- Tech Stack -->
## <a name="tech-stack">⚙️ Tech Stack</a>

- JavaScript
- React Js
- Nodejs
- Github API
<!-- Features -->

## <a name="howitworks">🤔 How It Works</a>


👉 **Login with GitHub:** Start by logging in with your GitHub account. This allows the application to access your repositories.

👉 **Download Repository:** Select a repository you want to generate documentation for. The application will download the entire repository as a ZIP file.

👉 **Generate Documentation:** Once the download is complete, click on the "Generate Documentation" button. The application will extract the repository, read the package.json and package-lock.json files, and send their content to OpenAI.

👉 **OpenAI Analysis:** OpenAI analyzes the content of the package.json and package-lock.json files and generates a detailed README file based on this information.

👉 **Download the Generated README:** The generated README file is saved in the repository folder, and you can download it to include in your project.


## <a name="quick-start">🤸 Quick Start</a>
### Quick Start Guide for Backend
- Follow these steps to set up and run the backend server.


**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Navigate to the Backend Folder**

```
cd new-folder/
```


**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
REDIRECT_URI=http://localhost:3000/auth/github/callback
SESSION_SECRET=your_session_secret
GITHUB_ACCESS_TOKEN=your_github_access_token
OPENAI_API_KEY=your_openai_api_key
DEEPSEEK_API_URL=your_deepseek_api_url

```

**Running the Project**

```bash
npm start
```
Open [http://localhost:3010](http://localhost:3010) in your browser to view the project.

### Quick Start Guide for Frontend
- Follow these steps to set up and run the frontend server.

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
VITE_CLIENT_ID=
VITE_CLIENT_SECRET_KEY=
OPENAI_API_KEY=
```

**Running the Project**

```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the project.