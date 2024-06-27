"use client"

import React, { useState, useEffect } from 'react';
import { Button, Container, Table, Nav } from 'react-bootstrap';
import { Pencil, Trash, Eye, XLg } from 'react-bootstrap-icons';
import { useQuery, QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';
import { UsersAPI } from '../api/usersAPI';
import ModalComponent from './Modal';

const queryClient = new QueryClient();
const getFromCache = (key) => {
    return queryClient.getQueryData([key]);
  };
  
  

function Users(props) {
    const [showModal, setShowModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [deleteUsername, setDeleteUsername] = useState('');
    const [currentPage, setCurrentPage]= useState(1)
    const deleteMutation = useMutation({
      mutationFn: async (params) => {
        return UsersAPI.deactivateUser(params.token, params.username);
      },
      onSuccess: () => {
        queryClient.invalidateQueries([`users/${name}`]);
      },
      onError: (error) => {
        console.log(error);
      },
    });

    const query = useQuery({
      queryKey: [`users/${name}/${currentPage}`],
      queryFn: async () => {

        const queryParams = {
          name: name.length > 0 ? name : undefined,
          page: currentPage,
          limit: 10
        }

        if(!queryParams.name?.length > 0) {
          delete queryParams.name
        }

        return UsersAPI.getUsers(props.token, queryParams);
      }
    });

    const onUserViewClick = (username, rolename) => {
      if(rolename == "therapist") {
        window.location.href = "/therapist/"+username
      }
    }
  
    const onNameChange = (e) => {
      setName(e.target.value);
    };
  
    const handleShowModal = (username) => {
      setDeleteUsername(username);
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };

    const handleDelete = async () => {
      console.log(deleteUsername)
      await deleteMutation.mutateAsync({token:props.token, username: deleteUsername})
      setDeleteUsername('')

      setShowModal(false)


    };

    
  
    return (
      <>
        <Container className="table-responsive mt-5">
          <nav className='navbar justify-content-start gap-3'>
          <label htmlFor="name">Name</label>
          <input type="text" name='name' value={name} onChange={onNameChange} />
          <a href='/register/user'><Button>New User</Button></a>
         
          
          </nav>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Username</th>
                <th>Role name</th>
              </tr>
            </thead>
            <tbody>
              {query.data?.users.map((user, index) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.rolename}</td>
                  <td className="text-center">
                    <Container className="d-flex align-items-center gap-3">
                      <Eye size={20} style={{ color: 'orange' }} onClick={(e) => onUserViewClick(user.username, user.rolename)}/>
                      <Pencil size={20} style={{ color: 'blue' }} />
                      <XLg size={20} style={{ color: 'red' }} onClick={(e)=> handleShowModal(user.username)} />
                    </Container>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <nav className='navbar justify-content-center'>
      <ul className="d-flex pagination gap-3">
        <li className={`  ${currentPage=== 1 ? 'disabled' : ''}`}>
          <a className="page-link" href="#" onClick={() => setCurrentPage(currentPage - 1)}>Prev</a>
        </li>
        <li>{currentPage}</li>
        <li className={` ${currentPage * 10 >= query.data?.itemsCount ? 'disabled' : ''}`}>
          <a className="page-link w-100" href="#" onClick={() => setCurrentPage(currentPage+1)}>Next</a>
        </li>

      </ul>
      
      </nav>
          
        </Container>

        {showModal && 
        <ModalComponent
            show={showModal}
            onHide={handleCloseModal}
            title="Modal title"
            body={
              <div>
                <strong>
                  <h4>Example of a Static Modal</h4>
                </strong>
              </div>
            }
            footer={
              <div>
                <Button variant="danger" onClick={(e) =>handleCloseModal(e)}>
                  Close
                </Button>
                <Button variant="success" onClick={(e) =>handleDelete()}>Save</Button>
              </div>
            }
          />
        }
      </>
    );
  }
  
export default function UsersProvider(props) {
    return (
      <QueryClientProvider client={queryClient}>
          <Users token={props.token}></Users>
      </QueryClientProvider>
      
      
    );
}