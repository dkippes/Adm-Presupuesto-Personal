import React from 'react'
import Nav from '../NavBar/NavBar';

export default function Dashboard() {
    console.log(sessionStorage);
    if(sessionStorage.getItem('userLogged')) {
      return (
        <div>
          <Nav></Nav>
          <h1>Home</h1>
          <h2>Balance General</h2>
          <h2>Listado de los ultimos 10 registrados</h2>

        </div>
      );
    } else {
      window.location = '/login';
    }

    
}

