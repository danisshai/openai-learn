import React, { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';
import MyComponent from "./components/MyComponent.jsx"
import SearchAppBar from "./components/SearchAppBar.jsx"
import { useLocation } from "react-router-dom";
import queryString from "query-string";

function Fila (props){
  return (
    <div style={{padding: "20px", textAlign:"left"}}> <strong>{props?.title} --> </strong>{props?.value} </div> 
  )
} 

function App() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [popupClose, setPopupClose] = useState(true);
  const [popupData, setPopupData] = useState({});
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = queryString.parse(location.search);
  

  useEffect(() => {
    
    // console.log("hellokjkj")
    // Descarga los datos y los guarda en cookies que quedan guardadas por 1 dia
    // si fetchAlways = true siempre descarga los datos
    const fetchAlways = false
    if (fetchAlways) {
      fetch('data.json')
      .then(response => response.json())
      .then(jsonData => {
        setData(jsonData);
        // console.log(jsonData)
        localStorage.setItem('dataCatch', JSON.stringify(jsonData));
        
      })
      .catch(error => console.error(error));

    }else{
      const myDataCatch = localStorage.getItem('dataCatch');
      if (myDataCatch) {
        setData(JSON.parse(myDataCatch));
      }else{
        fetch('data.json')
      .then(response => response.json())
      .then(jsonData => {
        setData(jsonData);
        localStorage.setItem('dataCatch', JSON.stringify(jsonData));
      })
      .catch(error => console.error(error));
      
      }
      
    }
    if(query.texto){

      fetch('https://us-south.functions.appdomain.cloud/api/v1/web/e5f49dfa-6fd2-4847-81d9-7b2005be3699/default/search_engine_catch_consulting?texto='+query.texto)
        .then(response => response.json())
        .then(jsonData => {
          setLoading(false)
          setResultados(jsonData?.best_matcnes)
          
        })
        .catch(error => console.error(error));
    }else{setLoading(false)}
  }, []);
  return (
    <div className="App" style={{width:"100vw"}}>
      < SearchAppBar />
      <br />
      {query.texto ? (<strong> {query.texto} </strong>) : null}
      <br /><br />
      {resultados.map((value, index)=> (<Fila key={index} title={value} value={data[0]?.subdivisiones[value-1]?.nombre}></Fila>))}
      {/* < MyComponent location={location}/> */}
      {/* {popupClose ? null:
        <PopUp setPopupClose={setPopupClose} data={popupData}/>
      } */}
      {loading ? 
      <div style={{position:"fixed", top:"0", left:"0", background:"white"}}>

        <div style={{width: "100vw", height: "100vh", display: 'flex', flexDirection:"column", justifyContent:"center"}}>
            <div> <strong>Buscando buenas opciones ...</strong>   </div>
            {/* <div style={{padding: "20px", textAlign:"left"}}> <strong>Descripción Larga:</strong>Buscando buenas opciones </div> */}
        </div>
       
        </div>
        : null}
    </div>
  );
}

export default App;
