import React, { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import CustomizedTreeView from "./componentes/tree/CustomizedTreeView.tsx"
import MyComponent from './componentes/MyComponent.jsx';
import Cookies from 'js-cookie';
import PopUp from "./componentes/PopUp.jsx"
// import GmailTreeView from "./componentes/tree/GmailTreeView.tsx"
function App() {

  const [data, setData] = useState([]);
  const [popupClose, setPopupClose] = useState(true);
  const [popupData, setPopupData] = useState({});
  


  useEffect(() => {


    // Descarga los datos y los guarda en cookies que quedan guardadas por 1 dia
    // si fetchAlways = true siempre descarga los datos
    const fetchAlways = true
    if (fetchAlways) {
      fetch('openai-learn/data.jso')
      .then(response => response.json())
      .then(jsonData => {
        setData(jsonData);
        localStorage.setItem('dataCatch', JSON.stringify(jsonData));
        
      })
      .catch(error => console.error(error));

    }else{
      const myDataCatch = localStorage.getItem('dataCatch');
      if (myDataCatch) {
        setData(JSON.parse(myDataCatch));
      }else{
        fetch('openai-learn/data.json')
      .then(response => response.json())
      .then(jsonData => {
        setData(jsonData);
        localStorage.setItem('dataCatch', JSON.stringify(jsonData));
      })
      .catch(error => console.error(error));
      
      }
      
    }
  }, []);
  return (
    
    <div className="App" style={{width:"100vw"}}>
      <CustomizedTreeView data={data} setPopupClose={setPopupClose} setPopupData={setPopupData}/>
      {/* <MyComponent /> */}
      {popupClose ? null:
        <PopUp setPopupClose={setPopupClose} data={popupData}/>
      }
    </div>
  );
}

export default App;
