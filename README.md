# NASA Image of the Day Generator

This is a web application that generates the NASA Image of the Day by consuming the NASA API. Users can visit the web app to see a new image every day, along with a brief description of the image.

## Installation
Clone the repository to your local machine using Git or download the ZIP file and extract it to a directory of your choice.
bash
```
git clone https://github.com/prajwalpatankar/nasa-iotd.git
```

Navigate to the frontend directory.
```
cd client
```

Install the project dependencies using npm or yarn.
```
npm install
```
or
```
yarn install
```

Navigate to the backend directory.
```
cd backend
```

Install the project dependencies using npm or yarn.
```
npm install
```
or
```
yarn install
```

## Usage
Start the development server inside the backend directory using npm or yarn.
```
node index.js
```
or
```
nodemon index.js
```

Start the development server using npm or yarn.
```
npm start
```
or
```
yarn start
```



Open your web browser and navigate to http://localhost:3000 to view the app.

## Configuration
The application requires an API key from NASA to consume the Image of the Day API. To obtain an API key, follow these steps:  
Visit the NASA API portal.  
Create an account or log in to your existing account.  
Navigate to the API Key page and generate a new API key.  
Copy the API key and paste it into the REACT_APP_API_KEY variable in the .env file in the project root directory.  
Note: The .env file is not included in the repository for security reasons. You will need to create your own .env file and set the REACT_APP_API_KEY variable to your NASA API key.  

## Contributing
Contributions to this project are welcome! If you find a bug or have a feature request, please open an issue on the GitHub repository. If you would like to contribute code, please fork the repository and submit a pull request with your changes.  
