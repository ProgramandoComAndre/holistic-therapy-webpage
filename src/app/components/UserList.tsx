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
      queryKey: [`users/${name}`],
      queryFn: async () => {
        const cache = getFromCache(`users/${name}`);
        if(cache) {
          return cache
        }
        return UsersAPI.getUsers(props.token, name ? `name=${name}` : '');
      },
      staleTime:
    });
  
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
        <input type="text" value={name} onChange={onNameChange} />
        <Container className="table-responsive mt-5">
          <Table striped bordered hover>
            <caption>List of users</caption>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Username</th>
                <th>Role name</th>
              </tr>
            </thead>
            <tbody>
              {query.data?.map((user, index) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.rolename}</td>
                  <td className="text-center">
                    <Container className="d-flex align-items-center gap-3">
                      <Eye size={20} style={{ color: 'orange' }} />
                      <Pencil size={20} style={{ color: 'blue' }} />
                      <XLg size={20} style={{ color: 'red' }} onClick={(e)=> handleShowModal(user.username)} />
                    </Container>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
  
          
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