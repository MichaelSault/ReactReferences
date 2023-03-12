import './App.css';
import Cookies from 'universal-cookie';
import jwt from 'jwt-decode';
import {useState, useEffect} from 'react';

function App() {
  //checks to see if there is a user Auth token
  useEffect(() => {
    var JWTCookie = cookies.get("jwt_authorization");
    console.log(JWTCookie);
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

    cookies.set("jwt_test", "does this work or nah?", {
      expires: new Date(decoded.exp * 1000),
    });
  }

  return (
    <div className="App">
      {user ? (
        <div>
          <h1>Welcome {user.Username}</h1>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Welcome Guest</h1>
          <button onClick={() => login(
            "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoidXNlciIsIklzc3VlciI6IkRhdGFEb2ciLCJVc2VybmFtZSI6InVzZXIxIiwiZXhwIjoxNjgxMzI0NzEwLCJpYXQiOjE2Nzg2NDYzMTB9.9ino-T9qd93GL7l3ETB_ahd6T1uXhEbPY66ciiUnIQQ"
          )}>Login</button>
        </div>
      )} 
    </div>
  );
}

export default App;
