
import * as React from 'react';
// import StarIcon from '@mui/icons-material/Star';
import CircleIcon from '@mui/icons-material/Circle';

const styles = {row:{ display: "flex",  flexFlow:"row nowrap", justifyContent:"space-between", alignItems:"center"},
                textRight: {marginLeft: "8px", marginRight: "8px", color:"grey"}}

export default function CustomizedTreeRow(props) {
  // if(props?.isCat){
  //   console.log(props)
  // }
  return (
    <div style={styles.row}>
        <div
        onClick={
          ()=>{
            props.setPopupData({nombre_corto: props.nombre_corto, descripcion: props.nombre_antiguo})
            props.setPopupClose(false)
            // setPopupClose={props.setPopupClose} setPopupData={props.setPopupData}
          }
        }
        > {!props?.isCat ?props.id+".": null} {props.nombre_corto}</div>
        
            {/* <div style={styles.textRight}>40 vec.</div>
            <div style={styles.textRight}>4 categ.</div>
            <div style={styles.textRight}>Col: 'AB'</div> */}
            {props?.isCat ?
              <div style={{marginRight:"2%", display: "flex",  flexFlow:"row nowrap"}}>
                <div style={styles.textRight}>{props?.preview?.count} vec.</div>
              </div> 
            :
              (props?.marcar_como_columna? 
              <div style={{marginRight:"2%", display: "flex",  flexFlow:"row nowrap"}}>
                  <div style={styles.textRight}> 
                  {/* Col: */}
                   {props.nombre_columna} </div> 
                  <div style={styles.textRight}> 
                  {/* Categorias: */}
                   {props.cantidad_subdivisiones} </div> 
              </div> 
              : 
              <div style={{marginRight:"2%", display: "flex",  flexFlow:"row nowrap"}}>
                  <div style={styles.textRight}> {props.cantidad_subdivisiones}</div> 
                  <CircleIcon color="disabled" />
              </div>) 
            }
            {/* {props.marcar_como_columna? null: <CircleIcon />} */}
            
       
    </div>
  );
}

