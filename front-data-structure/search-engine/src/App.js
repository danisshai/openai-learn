import React, { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';
import MyComponent from "./components/MyComponent.jsx"
import SearchAppBar from "./components/SearchAppBar.jsx"
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { jsx } from '@emotion/react';
import Checkbox from '@mui/material/Checkbox';

function Fila (props){
  // props parentId parentValue
  console.log(props)
  if(props?.parentId){
    return (
      <div style={{padding: "20px", textAlign:"left"}}> <strong>{props?.parentId} ---> </strong>{props?.parentValue} ---> <strong>{props?.title} ---> </strong>{props?.value} </div> 
    )
  }
  return (
    <div style={{padding: "20px", textAlign:"left"}}> <strong>{props?.title} --> </strong>{props?.value} </div> 
  )
} 

function App() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [dataFlat, setDataFlat] = useState([]);
  const [popupClose, setPopupClose] = useState(true);
  const [popupData, setPopupData] = useState({});
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = queryString.parse(location.search);
  const [busquedaExtendida, setBusquedaExtendida] = React.useState(false);

  

  function flatear_data(subdivisiones) {
    let dataF = [];
    let i = 1;
    // se va a utilizar una metodologia parecida a breadth first approach
    let queue = [].concat(subdivisiones); // start with root node
    // console.log(subdivisiones)
    while (queue.length) {
      
      if (!(queue[0]?.is_cat)) {
        dataF.push({id: queue[0]["id"], parent: queue[0]?.parent, nombre: queue[0]?.nombre, nombre_corto: queue[0]?.nombre_corto});
      }else{
        dataF.push({});
      }
      i += 1;
      if ( queue[0]?.subdivisiones) {
        // add its left child if exists
        // queue[0]["subdivisiones"] = queue[0]["subdivisiones"].map(subdivision=>{...subdivision, parent: ""})
        for (var j = 0; j < queue[0]["subdivisiones"].length; j++) {
          queue[0]["subdivisiones"][j]["parent"] = queue[0].id ;
        }
        queue.push(...queue[0]["subdivisiones"]);
      }
      queue.shift(); // dequeue first node from queue
    }
    return dataF;
  }
  
  useEffect(()=>{
    
    console.log(dataFlat)
  },[dataFlat])
  useEffect(()=>{
    // console.log(data)
    if (!!data[0]?.subdivisiones) {
      // console.log("myVariable has a value and is not undefined.");
      setDataFlat(flatear_data(data[0]?.subdivisiones))
    } 
  },[data])
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
      var url = ""
      if (query.busquedaExtendida) {
        url = 'https://us-south.functions.appdomain.cloud/api/v1/web/e5f49dfa-6fd2-4847-81d9-7b2005be3699/default/search_engine_catch_consulting_con_subpreguntas?texto='+query.texto
      }else{
        url = 'https://us-south.functions.appdomain.cloud/api/v1/web/e5f49dfa-6fd2-4847-81d9-7b2005be3699/default/search_engine_catch_consulting?texto='+query.texto
      }
      // fetch()
      fetch(url)
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
      
      < SearchAppBar busquedaExtendida={busquedaExtendida} />
      <div style={{color: "gray"}}>Busqueda Extendida: <Checkbox
      checked={busquedaExtendida}
      onChange={(e)=> setBusquedaExtendida(e.target.checked)}
      inputProps={{ 'aria-label': 'controlled' }}/></div>
      <br />
      {query.texto ? (<strong> {query.texto} </strong>) : null}
      <br /><br />
      {resultados.map((value, index)=> 
          <Fila key={index} title={value} value={dataFlat[value-1]?.nombre} parentId={dataFlat[value-1]?.parent} parentValue={dataFlat[dataFlat[value-1]?.parent]?.nombre_corto}></Fila>
      )
      }
      {/* < MyComponent location={location}/> */}
      {/* {popupClose ? null:
        <PopUp setPopupClose={setPopupClose} data={popupData}/>
      } */}
      {loading ? 
      <div style={{position:"fixed", top:"0", left:"0", background:"white"}}>

        <div style={{width: "100vw", height: "100vh", display: 'flex', flexDirection:"column", justifyContent:"center"}}>
            <div> <strong>Buscando buenas opciones ... {query.busquedaExtendida? "(BÚSQUEDA EXTENDIDA)": null}</strong>   </div>
            {/* <div style={{padding: "20px", textAlign:"left"}}> <strong>Descripción Larga:</strong>Buscando buenas opciones </div> */}
        </div>
       
        </div>
        : null}
    </div>
  );
}

export default App;
