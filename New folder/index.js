const express = require('express');
const axios = require('axios');
const qs = require('querystring');
const { exec } = require('child_process');
const simpleGit = require('simple-git');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const cors = require("cors");
const unzipper = require('unzipper');
const { OpenAI } = require('openai');


const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  method: "GET,POST,PUT, DELETE, PATCH,HEAD",
  Credential: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const fetch = require('node-fetch');
const openai = new OpenAI({
  apiKey: 'sk-25672ba6964b4321bebb5e029971ff05',  // Replace with your Deepseek API key
  baseURL: 'https://api.deepseek.com'  // Use the Deepseek API URL
});
// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.get('/', (req, res) => {
  res.send(`
    <a href="https://github.com/login/oauth/authorize?client_id=${clientId}">Login with GitHub</a>
  `);
});

app.get('/auth/callback', async (req, res) => {
  console.log('running')
  const requestToken = req.query.code;
  const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
    client_id: clientId,
    client_secret: clientSecret,
    code: requestToken,
  }, {
    headers: {
      accept: 'application/json',
    },
  });



  const accessToken = tokenResponse.data.access_token;


  console.log(accessToken)
  res.status(200).json({ accessToken: accessToken })
});

app.get('/generate-docs', async (req, res) => {
  const accessToken = req.query.token;
  const git = simpleGit();
  const userReposUrl = 'https://api.github.com/user/repos';

  try {
    const response = await axios.get(userReposUrl, {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });
    console.log(response.data, "????")
    const repos = response.data;
    const repoDocsPromises = repos.map(async (repo) => {
      const repoPath = path.join(__dirname, 'repos', repo.name);

      // Clone the repository
      await git.clone(repo.clone_url, repoPath);
      // Generate documentation
      return new Promise((resolve, reject) => {
        exec(`jsdoc -c jsdoc.json -r ${repoPath}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error generating documentation for ${repo.name}:`, error);
            reject(error);
            return;
          }
          console.log(`Documentation generated for ${repo.name}`);
          resolve(repo.name);
        });
      });
    });

    const generatedRepos = await Promise.all(repoDocsPromises);

    let repoList = '<h1>Generated Documentation for Repositories</h1><ul>';
    generatedRepos.forEach(repoName => {
      repoList += `<li>${repoName} - Documentation generated</li>`;
    });
    repoList += '</ul>';

    res.send(repoList);
  } catch (error) {
    console.error('Error fetching repositories or generating documentation:', error);
    res.send('Error fetching repositories or generating documentation');
  }
});



// app.get('/download', async (req, res) => {
//   const downloadDir = path.join(__dirname, '../repos');
//   const repoName = req.query.repoName || 'default-repo';
//   const owner = req.query.owner || 'default-owner';
//   const fileUrl = `https://github.com/${owner}/${repoName}/archive/refs/heads/main.zip`;
//   const filePath = path.join(downloadDir, `${repoName}.zip`);
//   const extractDir = path.join(downloadDir, repoName);

//   try {
//     // Ensure the repos directory exists
//     if (!fs.existsSync(downloadDir)) {
//       fs.mkdirSync(downloadDir, { recursive: true });
//     }

//     // Download the ZIP file
//     const response = await axios({
//       url: fileUrl,
//       method: 'GET',
//       responseType: 'stream',
//     });

//     const writer = fs.createWriteStream(filePath);
//     response.data.pipe(writer);

//     writer.on('finish', async () => {
//       // Unzip the file
//       fs.createReadStream(filePath)
//         .pipe(unzipper.Extract({ path: extractDir }))
//         .on('close', async () => {
//           console.log(`Unzipped to ${extractDir}`);

//           // Find package.json and package-lock.json
//           const packageJsonPaths = [];
//           const findFiles = (dir) => {
//             const files = fs.readdirSync(dir);
//             for (const file of files) {
//               const fullPath = path.join(dir, file);
//               if (fs.lstatSync(fullPath).isDirectory()) {
//                 findFiles(fullPath);
//               } else if (file === 'package.json' || file === 'package-lock.json') {
//                 packageJsonPaths.push(fullPath);
//               }
//             }
//           };

//           findFiles(extractDir);

//           if (packageJsonPaths.length === 0) {
//             res.status(404).send('No package.json or package-lock.json found.');
//             return;
//           }

//           // Read the files
//           const packageFilesContent = {};
//           for (const filePath of packageJsonPaths) {
//             const content = fs.readFileSync(filePath, 'utf-8');
//             if (filePath.endsWith('package.json')) {
//               packageFilesContent.packageJson = content;
//             } else if (filePath.endsWith('package-lock.json')) {
//               packageFilesContent.packageLockJson = content;
//             }
//           }

//           // console.log(packageFilesContent.packageJson, "@@@@@@@@@@@@@@@@");

//           try {
//             // Send the contents as text to DeepSeek AI
//             const response = await openai.chat.completions.create({
//               model: 'deepseek-chat',
//               messages: [
//                 { role: 'system', content: 'You are a helpful assistant' },
//                 {
//                   "role": "user", "content": `Please generate a README file based on the following package.json and package-lock.json content:

//                   package.json:
//                   ${packageFilesContent.packageJson}
                  
//                   package-lock.json:
//                   ${packageFilesContent.packageLockJson}`
//                 }
//               ],
//               stream: false
//             });
//             console.log(response.choices[0].message.content, "&&&&&&&&&&&&&&&&77");
//             const readmeContent = response.choices[0].message.content;

//             // Save the README file in the repos folder
//             const readmeFilePath = path.join(downloadDir, 'README.md');
//             fs.writeFileSync(readmeFilePath, readmeContent);

//             res.json({
//               message: 'Files processed and README created',
//               readmeFile: readmeFilePath
//             });
//           } catch (deepSeekError) {
//             res.status(500).send(`Error interacting with DeepSeek AI: ${deepSeekError.message}`);
//           }
//         });
//     });

//     writer.on('error', (err) => {
//       res.status(500).send(`Error: ${err.message}`);
//     });
//   } catch (error) {
//     res.status(500).send(`Error: ${error.message}`);
//   }
// });

app.get('/test',(req,res)=>{
  return res.json("Hello from sneha Backend")
})

app.get('/download', async (req, res) => {
  const downloadDir = path.join(__dirname, '../repos');
  const repoName = req.query.repoName || 'default-repo';
  const owner = req.query.owner || 'default-owner';
  const fileUrl = `https://github.com/${owner}/${repoName}/archive/refs/heads/main.zip`;
  const filePath = path.join(downloadDir, `${repoName}.zip`);
  const extractDir = path.join(downloadDir, repoName);

  try {
    // Ensure the repos directory exists
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir, { recursive: true });
    }

    // Download the ZIP file
    const response = await axios({
      url: fileUrl,
      method: 'GET',
      responseType: 'stream',
    });

    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    writer.on('finish', async () => {
      // Unzip the file
      fs.createReadStream(filePath)
        .pipe(unzipper.Extract({ path: extractDir }))
        .on('close', async () => {
          console.log(`Unzipped to ${extractDir}`);
          res.json({
            message: 'Repository downloaded and unzipped successfully',
            repoPath: extractDir
          });
        });
    });

    writer.on('error', (err) => {
      res.status(500).send(`Error: ${err.message}`);
    });
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

app.post('/generate-readme', async (req, res) => {
 
  
  const repoPath = req.body.repoPath;
  const downloadDir = path.join(__dirname, '../repos');

  try {
    // Find package.json and package-lock.json
    const packageJsonPaths = [];
    const findFiles = (dir) => {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
          findFiles(fullPath);
        } else if (file === 'package.json' || file === 'package-lock.json') {
          packageJsonPaths.push(fullPath);
        }
      }
    };

    findFiles(repoPath);

    if (packageJsonPaths.length === 0) {
      res.status(404).send('No package.json or package-lock.json found.');
      return;
    }

    // Read the files
    const packageFilesContent = {};
    for (const filePath of packageJsonPaths) {
      const content = fs.readFileSync(filePath, 'utf-8');
      if (filePath.endsWith('package.json')) {
        packageFilesContent.packageJson = content;
      } else if (filePath.endsWith('package-lock.json')) {
        packageFilesContent.packageLockJson = content;
      }
    }

    try {
      // Send the contents as text to DeepSeek AI
      const response = await openai.chat.completions.create({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'You are a helpful assistant' },
          {
            role: 'user',
            content: `Please generate a README file based on the following package.json and package-lock.json content:

            package.json:
            ${packageFilesContent.packageJson}
            
            package-lock.json:
            ${packageFilesContent.packageLockJson}`
          }
        ],
        stream: false
      });

      const readmeContent = response.choices[0].message.content;

      // Save the README file in the repos folder
      const readmeFilePath = path.join(repoPath, 'README.md');
      fs.writeFileSync(readmeFilePath, readmeContent);

      res.json({
        message: 'README created successfully',
        readmeFile: readmeFilePath
      });
    } catch (deepSeekError) {
      res.status(500).send(`Error interacting with DeepSeek AI: ${deepSeekError.message}`);
    }
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
});
const port = 3010;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


