<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#built-with">Built with</a>
    </li>
    <li>
      <a href="#dependencies">Dependecies</a>
    </li>
    <li>
      <a href="#database-prep">Database Prep</a>
    </li>
    <li>
      <a href="#developement">Developement</a>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<strong>STRIKE A POSE</strong> is an interactive and fun web application where players can challenge themselves to mimic various poses. The game presents users with a series of random poses to imitate, captured from a diverse range of images. Players use their device's camera to capture their own pose, and the application provides feedback on how closely they match the target pose.

`https://github.com/CodeOp-tech/strike-a-pose`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)]()
- [![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)]()
- [![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)]()
- [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
- [![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
- [![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=TensorFlow&logoColor=white)]()
- [![Axios](https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white)]()
- [![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)]()
- [![Node](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)]()
- [![ReactRouter](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)]()

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).
- Run `npm install react-router-dom` in the client dependecies.
- Run `npm install axios`. This will be installed in the client dependecies.
- Run `npm install jsonwebtoken bcrypt` in project directory.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called team4: `create database strike_database`
- Add the `.env`, to containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=strike_database
  DB_PASS=YOURPASSWORD
```

- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create a table users in your database.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Development

- Run `npm start` in project directory to start the Express server on port 5001
- In another terminal, do `cd client` and run `npm run dev` to start the client in development mode with hot reloading in port localhost 5173.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

\_This is a project that was created at [CodeOp](http://CodeOp.tech), a full stack development bootcamp in Barcelona.
