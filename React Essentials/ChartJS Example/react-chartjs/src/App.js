import './App.css';
import { useState } from 'react';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';
import { UserData } from './Data';

function App() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [{
      label: "Users Gained",
      data: UserData.map((data) => data.userGain),
      backgroundColor: ["red","orange", "yellow", "blue", "green", "indigo", "violet"],
      borderColor: "black",
      borderWidth: 1
    }]
  })

  const [userDataLine, setUserDataLine] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [{
      label: "Users Gained",
      data: UserData.map((data) => data.userGain),
      backgroundColor: ["cyan"],
      borderColor: "black",
      borderWidth: 1
    }]
  })

  return (
    <div className="App">
      <div style={{width:500}}>
        <BarChart chartData={userData}/>
      </div>
      <div style={{width:500}}>
        <LineChart chartData={userDataLine}/>
      </div>
      <div style={{width:450}}>
        <PieChart chartData={userData}/>
      </div>
    </div>
  );
}

export default App;
