import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import Chip from '@mui/material/Chip';

export default function SearchAppBar() {
  const [texto, setTexto] = useState("");
  const navigate = useNavigate();

  const search = ()=>{
    // navigate.push('/mi-pagina?param1=nuevo-valor');
    navigate(`?texto=${texto}`, { replace: true })
    window.location.reload();
    // console.log(texto)
  }

  const goSearch = () => {
    window.open("https://danisshai.github.io/openai-learn/front-data-structure/search-engine/build/", '_blank');
  };
  return (
    <div style={{cursor:"pointer"}} onClick={goSearch}>
      <Box sx={{ display: 'flex', justifyContent: "space-between" , alignItems: 'flex-end' , padding: "10px"}}>
        {/* <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5, paddingLeft: "5px" }} /> */}
      {/* <strong><Chip style={{"marginRight": "5px"}} label="Vista Árbol" onClick={goArbol} /></strong> */}
        <TextField component-disabled fullWidth id="input-with-sx" label="¿Qué quieres analizar?: " variant="standard" />
        <SearchIcon  style={{"cursor": "pointer"}} fontSize="large" sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      </Box>
    </div>
  );
}