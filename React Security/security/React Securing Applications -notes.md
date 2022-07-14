# React: Securing Applications

Created: July 14, 2022 10:11 AM
Tags: In Progress, React, Security, Study

# Introduction:

- Building a secure React app using Auth0
- Experience with React and JavaScript
    - npm and terminal commands

---

# 1. Setting Up

### Project setup:

- `npx create-react-app ***projectname***`
- we then took the source folder and index file from the project files
    - from the looks of it, it’s just a basic app that we can work from within
- `npm install react-router-dom@5.2.0`

### Set up flow:

- flow isn’t security, rather type checking
- `npm i flow-bin`
- add a flow script
    
    ```jsx
    "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject",
        "flow": "flow"
      },
    ```
    
- `npm run flow init`
    - generates a flow.config
- npm run flow
    - checks the project for typing errors

### Set up ESLint

- gotta say, this is my least favourite tool
    - it just never works well
- comes with React already
    - add more strict rules (like AirBnB standards)
- `npx install-peerdeps --dev eslint-config-airbnb`
- `npm i eslint`
- create a .eslintrc file
    - this will apply the airbnb linting to your entire project
    
    ```jsx
    **{
        "extends": "airbnb"
    }**
    ```
    

---

# 2. Overview of Security Threats

### OWASP Overview

- look at OWASP cheat-sheet series
- lots of references as to vulnerabilities and how to secure your code

### Cross-site Scripting Attacks (XSS)

- pulling data from cookie, session tokens
- google has a demo game where you can practice XSS attacks
    - that game where you have to cause an alert() to complete the level
- how to prevent?
    - react prevents against it by default (with a warning)
    - unsafe code
    
    ```jsx
    const createMarkup = () => {
      return {_html: "Example of how to leave yourself vulnerable"}
    }
    
    <div className="footer">
      <p>&copy; {this.state.name} Inc.</p>
      <div innerHTML={createMarkup}></div>
    </div>
    ```
    
    ```jsx
    const createMarkup = () => {
      return {_html: "Example of how to leave yourself vulnerable"}
    }
    
    <div className="footer">
      <p>&copy; {this.state.name} Inc.</p>
    	<div dangerouslySetInnerHTML={createMarkup()}/>
    </div>
    
    ```
    

### Cross-site Request Forgery (CSRF)

- check headers to verify that request is from the same origin
    - prevent CORS (cross origin requests)
- checks for a signed token
- implement with JSON web token
    - using cloud services like Auth0
        - also prevents against XXS attacks

### Intro: JSON Web Token (JWT)

- standard that is used to transmit information between two parties
- three main parts
    - **header**
        - type of token
        - hashing algorithm
    - **payload**
        - meta data from the request party
            - required by server
            - issuer, expiry, etc.
    - **signature**
        - how the request is validated
        - how do I know you are who you say you are?

---

# 3. Authenticating with Auth0

### Initial setup of your server

- split the project into a client and a server folder
- inside server folder
    - npm init
    - `npm i --save-dev babel-cli babel-preset-env babel-preset-stage-0`
    - `npm i body-parser cors expres express-jwt jwks-rsa nodemon`

```jsx
import express from 'express';
import jwt from 'express-jwt';
import cors from 'cors';
import jwks from 'jwks-rsa';
import bodyParser from 'body-parser';

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
```

```jsx
{
    "presets": [
        "env",
        "stage-0"
    ]
}
```

### Create API endpoints

- add a start script
    - `“start”: “nodemon ./index.js —exec babel-node -e js”`
- update index,js to run a static server
    
    ```jsx
    import express from 'express';
    import jwt from 'express-jwt';
    import cors from 'cors';
    import jwks from 'jwks-rsa';
    import bodyParser from 'body-parser';
    
    const app = express();
    const PORT = 4000;
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true}));
    app.use(cors());
    
    app.get('/courses', (req, res) => {
        let courses = [
            {
                "id": 1,
                "title": "Building an App with ReactJS and MeteorJS",
                "link": "https://www.lynda.com/React-js-tutorials/Building-App-React-js-MeteorJS/533228-2.html",
                "description": "Meteor and React are a powerhouse combination. Meteor gives you a fast, easy-to-use solution for data management across clients and servers, and React gives you a way to structure your app's UI from reusable components. The combination allows you to create your dream apps: dynamic, data driven, and cross-platform."
              },
              {
                "id": 2,
                "title": "Framer for UX design",
                "link": "https://www.lynda.com/FramerJS-tutorials/UX-Design-Tools-Framer/562923-2.html",
                "description": "You can use Framer to create JavaScript-based app prototypes quickly and easily. UX designers, engineers, interaction designers, and more can get refreshed on UX fundamentals in this course, and then dive into navigating Framer."
              },
              {
                "id": 3,
                "title": "Migrating to TypeScript 2",
                "link": "https://www.lynda.com/JavaScript-tutorials/Migrating-TypeScript-2/585078-2.html",
                "description": "TypeScript is a newer Microsoft language built on JavaScript that is finding wide adoption in the Microsoft, Google, and Angular communities. Like many things JavaScript these days, TypeScript is changing rapidly as it grows."
              },
                {
                "id": 4,
                "title": "From React to React Native",
                "link": "https://www.lynda.com/React-Native-tutorials/From-React-React-Native/577371-2.html",
                "description": "With React Native, you can leverage your existing React knowledge to build native iOS and Android apps. In this course, explore the different components that make up a basic React Native application, and learn how to use this platform to build your own native projects."
              },
                {
                "id": 5,
                "title": "React Native Ecosystem and Workflow",
                "link": "https://www.lynda.com/React-Native-tutorials/React-Native-Ecosystem-Workflow/560206-2.html",
                "description": "React Native makes it easy to develop applications and then deploy them natively to multiple mobile platforms. That said, building a complete app means looking beyond React Native to the different options that can help you customize your workflow."
              },
                {
                "id": 6,
                "title": "Create a CRM mobile application with React Native",
                "link": "https://www.lynda.com/Web-tutorials/Create-CRM-Mobile-Application-React-Native/585274-2.html",
                "description": "You can develop a mobile CRM application using React Native. Learn how set up a project, code the login, work with Redux, add views, use CRUD operations, and more."
              },
                {
                "id": 7,
                "title": "Prototype a CRM mobile application with Framer",
                "link": "https://www.lynda.com/FramerJS-tutorials/Prototype-Mobile-CRM-Application-Framer/587677-2.html",
                "description": "You can create a prototype for a mobile CRM application using Framer. Learn how to create assets, build a mockup, simulate interactions with animations, prototype concepts, and more."
              },
                {
                "id": 8,
                "title": "React Ecosystems",
                "link": "https://www.lynda.com/React-js-tutorials/React-Ecosystems/601831-2.html",
                "description": "React is rarely used by itself. As a result, working effectively with React—especially when developing in a group—means mastering a set of tools. Some of these tools supplement React, while others establish and maintain workflows for efficient development or help React mesh with another set of web-centric tools."
              },
                {
                "id": 9,
                "title": "React: Testing and debugging",
                "link": "https://www.lynda.com/React-js-tutorials/React-Testing-Debugging/592511-2.html",
                "description": "Tracking down bugs in React and among the many different pieces it communicates with can be a challenge. While basic JavaScript testing and debugging tools certainly work, solutions designed specifically to work with React will save you time and effort."
              },
                {
                "id": 10,
                "title": "InVision Craft for UX design",
                "link": "https://www.lynda.com/Craft-tutorials/InVision-Craft-UX-Design/599634-2.html",
                "description": "InVision Craft is suite of plugins that equip designers with tools that simplify some of the more tedious tasks in their UX design workflow and, in turn, speed up the entire process."
              },
                {
                "id": 11,
                "title": "InVision for UX Design",
                "link": "https://www.lynda.com/InVision-tutorials/InVision-UX-Design/599633-2.html",
                "description": "InVision is a platform that provides UX designers with a set of powerful tools for creating interactive prototypes, collaborating with teammates, and managing their UX design workflow."
              },
                {
                "id": 12,
                "title": "GraphQL: Data fetching with Relay",
                "link": "https://www.lynda.com/GraphQL-tutorials/GraphQL-Data-Fetching-Relay/595829-2.html",
                "description": "Want to build more efficient, data-driven React.js applications? Streamline data retrieval with GraphQL and Relay. You can get exactly the data you need—nothing more, nothing less—and predictable results every time."
              }
        ]
        res.json(courses);
    })
    
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    });
    ```
    

### Initial Auth0 setup

- login to Auth0 w/ github
- pull a couple specific files to the client folder from auth0
- `npm i @auth0/auth0-spa-js axios`

### Updating index for Auth0 integration

```jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Auth0Provider } from "./react-auth0-spa";
import config from "./auth_config.json";
import history from "./history";

const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
```

- Auth0Provider ensures that there is an authorized user accessing the application

### Add connections to server

---

# 4. Authentication with Auth0

### Use secure HTTPS protocol

- Most of this section was about how to connect to Auth0 servers.
- This is something I would have to refer back to the video for anyways, and figure out on my own when I go to implement a login system

---

# 5. Other React Considerations

- always go back to the documentation to secure your code after an new syntax update
    - might be a security update on React’s behalf
- Never publish Auth0 information data
- Never publish sensitive data
- Use **strict mode** for more checks on your application
    - components with unsafe life cycles
    - deprecated strings
    - turn on by adding the `<React.StrictMode>code to validate</React.StrictMode>` tags

---

# Next Steps

- intro to major security threats
- intro to Auth0
- should always be updating your projects with new best practices
- keep an eye on OWASP
    - sign onto their newsletter
- make sure all areas of your webapp are secure and ensure that the user is authenticated
- OWASP Social Community