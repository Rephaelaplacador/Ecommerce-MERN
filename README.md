# Project E-commerce

## Overview
This project is a multi-component application with a backend and a `frontend` directory. The `frontend` contains the client-side application, while the root directory manages the overall build and dependencies. 

## Prerequisites
To set up the project, ensure the following are installed on your system:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation and Build Steps
Follow these steps to install dependencies and build the project:

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. Install root-level dependencies:
   ```bash
   npm install
   ```

3. Navigate to the `frontend` directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

4. Build the `frontend` application:
   ```bash
   npm run build
   ```

5. Return to the root directory:
   ```bash
   cd ..
   ```

## Deployment on Render.com

### Steps
1. Make sure your `build` script in `package.json` is updated as follows:
   ```json
   "build": "npm install && cd frontend && npm install && npm run build"
   ```

2. Push the code to your repository (e.g., GitHub).

3. Link your repository to Render.com and set the following:
   - **Build Command:**
     ```bash
     npm run build
     ```
   - **Start Command:** (if applicable for backend or frontend hosting)
     ```bash
     npm start
     ```

4. Deploy the application.

### Live Deployment
You can access the live deployment of this project here: [ecommerce-mern-5eum](https://ecommerce-mern-5eum.onrender.com/)

### Environment Variables
If your application requires environment variables, configure them in the Render dashboard under the **Environment** section.

## Troubleshooting

- **Error: `install: unrecognized option '--prefix'`**  
  Update the `build` script to avoid using `--prefix` and use `cd` commands instead.

- **Build Fails on Render:**
  - Ensure that the Node.js version in Render is compatible with your project.
  - Check Render logs for missing dependencies or configuration issues.

- **Frontend Build Issues:**
  Ensure all required dependencies are properly installed in the `frontend` directory.

## Directory Structure
```
.
├── package.json       # Root package file
├── frontend
│   ├── package.json   # Frontend-specific package file
│   ├── src
│   └── public
└── README.md
```




