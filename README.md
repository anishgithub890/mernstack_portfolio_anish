# MERNSTACK PORTFOLIO

![amazon](/frontend/public/images/home.png)

# React Tutorial - Build Personal Portfolio

## What i learn

- HTML5, SCSS and CSS3: Semantic Elements, CSS Grid, Flexbox
- React: Components, Props, Events, Hooks, Router, Axios
- Context API: Store, Reducers, Actions
- Node & Express: Web API, Body Parser, File Upload, JWT
- MongoDB: Mongoose, Aggregation
- Development: ESLint, Babel, Git, Github,
- Deployment: render.com

## Run Locally

### 1. Clone repo

```
$ git clone gitURL
$ cd {project-name}
```

### 2. Create .env File

- duplicate .env.example in backend folder and rename it to .env

### 3. Setup MongoDB

- Local MongoDB
  - Install mongodb
  - In .env file update MONGODB_URI=mongodb://localhost/....
- OR Atlas Cloud MongoDB
  - Create database at [https://cloud.mongodb.com](https://cloud.mongodb.com)
  - In .env file update MONGODB_URI=mongodb+srv://your-db-connection

### 4. Run Backend

```
$ cd backend
$ npm install
$ npm start
```

### 5. Run Frontend

```
# open new terminal
$ cd frontend
$ npm install
$ npm start
```

### 6. Seed Users and Products

- Run this on browser: http://localhost:9000/api/seed
- It returns admin email and password

### 7. Admin Login

- Run http://localhost:3000/signin
- Enter admin email and password and click signin
