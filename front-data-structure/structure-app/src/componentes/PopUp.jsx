import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
function PopUp(props) {
  
  const styles = {
    container: {}
  }
  useEffect(() => {

  }, []);

  return (
    <div style={{position:"fixed", top:"0", left:"0", background:"white"}}>

        <div style={{width: "100vw", height: "100vh", display: 'flex', flexDirection:"column", justifyContent:"center"}}>
            <div> <strong>Nombre Corto:</strong>  {props?.data?.nombre_corto} </div>
            <div style={{padding: "20px", textAlign:"left"}}> <strong>Descripción Larga:</strong> {props?.data?.descripcion} </div>
        </div>
        <div style={{cursor:"pointer", position:"fixed", top:"10px", right:"10px"}} onClick={()=>props.setPopupClose(true)}>
            <CloseIcon fontSize="large"/>
        </div>

    </div>
  );
}

export default PopUp;