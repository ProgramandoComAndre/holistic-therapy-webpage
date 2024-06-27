"use client"

import React, { useState, useEffect } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Pencil, Trash, Eye, XLg } from 'react-bootstrap-icons';

import { UsersAPI } from './api/usersAPI';
import ModalComponent from './components/Modal';
import { useAuth } from './providers/AuthProvider';
import UsersProvider from './components/UserList';
import Nav from './components/Nav';



export default function Home() {
  console.log(process.env)
  const auth = useAuth();
  let [username, setUsername] = useState('');
  let [users, setUsers] = useState([]);
  let [token, setToken] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
    else {

      auth.verifyAuth(token).then((res) => {
        if(!res) {
          window.location.href = "/login";
        }
        else {
          setUsername(res.username)
          setToken(token)
        }
      })
    }
  })
  return (
    <>
      <Nav username={username}></Nav>
      <UsersProvider token={token}></UsersProvider>
      

    </>
    
    
  );
};

