import React from "react";
import queryString from "query-string";

function MyComponent(props) {
    
  const query = queryString.parse(props.location.search);
  console.log(query)
  const textToDisplay = query.text || "No se ha proporcionado ningún texto.";
  return <div>{textToDisplay}</div>;
}

export default MyComponent;
