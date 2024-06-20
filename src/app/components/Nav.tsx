"use client"
import React, { useEffect, useState } from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { useAuth } from "../providers/AuthProvider";
const Nav = (props) => {

  const auth = useAuth()

  return (
    <Navbar bg="dark" expand="lg" className='navbar-dark bg-dark justify-content-between'>
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <p className='text-light p-2'>{props.username}</p>
      {props.username && <Button onClick={() => auth.logOut()}>Logout</Button>}
    </Navbar>
  );
}

export default Nav