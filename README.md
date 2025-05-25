# Task pipline withe React And Nodejs And Mongodb
  #
  ![ChatGPT Image May 25, 2025, 01_12_55 PM](https://github.com/user-attachments/assets/0ecdccbc-a16f-4b51-96e4-6e9abbd16c7f)
  #
# install docker linux on unbutu server
      for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
  #
     
      sudo apt-get update
      sudo apt-get install ca-certificates curl
      sudo install -m 0755 -d /etc/apt/keyrings
      sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
      sudo chmod a+r /etc/apt/keyrings/docker.asc


      echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
      $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
      sudo apt-get update
  #

      sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
  #
      sudo usermod -aG docker $USER
      newgrp docker
      chmod 666 /var/run/docker.sock
  # Install docker-compose
      sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
      sudo chmod +x /usr/local/bin/docker-compose

  # Install dependencies app from React 
        {
          "name": "auth-frontend",
          "version": "0.1.0",
          "private": true,
          "dependencies": {
            "@testing-library/dom": "^10.4.0",
            "@testing-library/jest-dom": "^6.6.3",
            "@testing-library/react": "^16.3.0",
            "@testing-library/user-event": "^13.5.0",
            "axios": "^1.9.0",
            "react": "^19.1.0",
            "react-dom": "^19.1.0",
            "react-router-dom": "^7.6.0",
            "react-scripts": "5.0.1",
            "web-vitals": "^2.1.4"
          },
          "scripts": {
            "start": "react-scripts start",
            "build": "react-scripts build",
            "test": "react-scripts test",
            "eject": "react-scripts eject"
          },
          "eslintConfig": {
            "extends": [
              "react-app",
              "react-app/jest"
            ]
          },
          "browserslist": {
            "production": [
              ">0.2%",
              "not dead",
              "not op_mini all"
            ],
            "development": [
              "last 1 chrome version",
              "last 1 firefox version",
              "last 1 safari version"
            ]
          }
        }
  # Build React frontend  with web server nginx
      FROM node:18 AS build
      WORKDIR /app
      COPY package*.json ./
      RUN npm install
      COPY . .
      RUN npm run build
      FROM nginx:alpine
      COPY --from=build /app/build /usr/share/nginx/html
      COPY nginx.conf /etc/nginx/conf.d/default.conf
      EXPOSE 80
   # Install dependencies backend 
        {
          "name": "auth-backend",
          "version": "1.0.0",
          "description": "",
          "main": "index.js",
          "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1"
          },
          "keywords": [],
          "author": "",
          "license": "ISC",
          "dependencies": {
            "bcryptjs": "^3.0.2",
            "cors": "^2.8.5",
            "dotenv": "^16.5.0",
            "express": "^5.1.0",
            "jsonwebtoken": "^9.0.2",
            "mongoose": "^8.15.0"
          }
        }     
   # Build Nodejs backend 
      FROM node:18

      WORKDIR /app

      COPY package*.json ./
      RUN npm install

      COPY . .

      EXPOSE 5000

      CMD ["node", "server.js"]

   # Build images app 
     docker build -t nameimage/frontend .
     docker build -t nameimage/backend .

   # Show .env file backend 
      PORT=5000
      MONGO_URI=mongodb://mongo-service:27017/mern-auth-db
      JWT_SECRET=your_jwt_secret_key
    # Show .env file frontend
      REACT_APP_API_URL=localhost:5000/api
   #  File ==> docker-compose
   #
          version: '3.8'
          
          services:
            mongo:
              image: mongo
              container_name: mongo
              ports:
                - "27017:27017"
              volumes:
                - mongo-data:/data/db
          
            backend:
              build: ./backend
              container_name: backend
              ports:
                - "5000:5000"
              environment:
                - MONGO_URI=mongodb://mongo:27017/authdb
                - JWT_SECRET=your_jwt_secret_key
              depends_on:
                - mongo
          
            frontend:
              build: ./frontend
              container_name: frontend
              ports:
                - "3000:80"
              depends_on:
                - backend
          
          volumes:
            mongo-data:
   #
   # Coomand docker-compose
       docker-compose up --build -d 
   #
   # acsess with Browser 
   #
      http://localhost:3000
      
        
