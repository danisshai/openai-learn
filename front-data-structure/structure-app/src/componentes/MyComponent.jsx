import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('data.json')
      .then(response => response.json())
      .then(jsonData => setData(jsonData))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default MyComponent;