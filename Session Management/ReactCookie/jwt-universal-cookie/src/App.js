import './App.css';
import Cookies from 'universal-cookie';
import jwt from 'jwt-decode';
import {useState, useEffect} from 'react';

function App() {
   //checks to see if there is a user Auth token, and logs them in
   useEffect(() => {
    try {
      console.log(jwt(document.cookie));
      setUser(jwt(document.cookie));
    } catch (err) {
      console.log("User not logged in")
    }
  }, []);

  //Initialize cookies
  const cookies = new Cookies();

  //init user state
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
    cookies.remove("jwt_authorization");
  }

  const login = (jwt_token) => {
    //Decode JWT token
    const decoded = jwt(jwt_token);

    //set user state
    setUser(decoded);

    //set Cookie
    cookies.set("jwt_authorization", jwt_token, {
      expires: new Date(decoded.exp * 1000),
    });

  }

 

  return (
    <div className="App">
      {user ? (
        <div>
          <h1>Welcome {user.Username}</h1>
          <button onClick={logout}>Logout</button>

          <p><b>Name:</b> {user.Name}</p>
          <p><b>Email:</b> {user.Email}</p>
          <p><b>City:</b> {user.City}</p>
          <p><b>Favourite Dog Breed:</b> {user.DogBreed}</p>
        </div>
      ) : (
        <div>
          <h1>Please Login to Continue...</h1>
          <button onClick={() => login(
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJEYXRhRG9nIiwiaWF0IjoxNjc5MTAyMjc0LCJleHAiOjE2Nzk3MDcwNzQsImF1ZCI6Ind3dy5kYXRhZG9nLmNvbSIsInN1YiI6ImRhdGFkb2dAaWNsb3VkLmNvbSIsIlVzZXJuYW1lIjoiSk1pdGNoZWxsIiwiRW1haWwiOiJKTWl0Y2hlbEBpY2xvdWQuY29tIiwiRG9nQnJlZWQiOiJBdXNzaWUiLCJBZ2UiOiIyNyIsIkNpdHkiOiJIYW1pbHRvbiIsIk5hbWUiOiJKYW1lcyBNaXRjaGVsbCJ9.0OWLcAwY0YH_LjNuRAo7YwopV9rpigBZaypzoewdOuM"
          )}>Login</button>
        </div>
      )} 
    </div>
  );
}

export default App;
