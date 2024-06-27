"use client"

import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UsersAPI } from '../../api/usersAPI';
import { useAuth } from '@/app/providers/AuthProvider';
import Nav from '@/app/components/Nav';
import TagControl from '@/app/components/TagsControl';

const queryClient = new QueryClient();

function RegisterUser(props) {
    // username, name, password, confirmPassword, role--> therapists--> specialities

    const auth = useAuth();
    
    const [specialities, setSpecialities] = useState([])
    const [username, setUsername] = useState('');
    const [token, setToken] = useState("");
    const [role, setRole]= useState(1)
    const [newUsername, setNewUsername] = useState('')
    const [newName, setNewName] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newConfirmPassword, setNewConfirmPassword] = useState('')
    const [showSpecialities, setShowSpecialities] = useState(false)
    const [formData, setFormData] = useState({})
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
      } else {
        auth.verifyAuth(token).then((res) => {
          if (!res) {
            window.location.href = "/login";
          } else {
            setUsername(res.username);
            setToken(token);
          }
        });
      }
    }, []);

    const handleRoleChange = (e) => {
      setRole(e.target.value)
      if(e.target.value == 2) {
        setShowSpecialities(true)
      }
      else {
        setShowSpecialities(false)
      }
    }

    const handleUsernameChange = (e) =>  {
      setNewUsername(e.target.value)
    }

    const handleNameChange = (e) =>  {
      setNewName(e.target.value)
    }

    const handlePasswordChange = (e) =>  {
      setNewPassword(e.target.value)
    }
    const handleConfirmPasswordChange = (e) =>  {
      setNewConfirmPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      const request = {username: newUsername, name: newName, password: newPassword, confirmPassword: newConfirmPassword, roleid: role, specialities: specialities}
      const user = await UsersAPI.createUser(token, request)
      console.log(user)
      if(user.status == 200) {
        window.location.href = "/"
      }
    }

    const rolesQuery = useQuery({
        queryKey: ["roles"],
        queryFn: async () => {
            return UsersAPI.getRoles();
        }
    });

    if (rolesQuery.isLoading) {
      return <div>Loading...</div>;
    }

    if (rolesQuery.error) {
      return <div>Error loading roles: {rolesQuery.error.message}</div>;
    }
    
    return (
      <>
        <Nav username={username}></Nav>

        <Container>
          <Form>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control as="select" value={role} name="roleid" id="roleid" onChange={handleRoleChange}>
                {rolesQuery.data?.map((role) => (
                  <option key={role.id} value={role.id}>{role.description}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='formUsername'>
              <Form.Label>Username</Form.Label>
              <Form.Control type='text' name='username' id="username" onChange={handleUsernameChange}></Form.Control>
            </Form.Group>

            <Form.Group controlId='formName'>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name='name' id="name" onChange={handleNameChange}></Form.Control>
            </Form.Group>

            <Form.Group controlId='formPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' name='password' id="password" onChange={handlePasswordChange}></Form.Control>
            </Form.Group>

            <Form.Group controlId='formConfirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type='password' name='confirmPassword' id="confirmPassword" onChange={handleConfirmPasswordChange}></Form.Control>
            </Form.Group>
            
            {showSpecialities && <Form.Group controlId="formSpecialities">
              <TagControl name="Specialities" tags={specialities} setTags={setSpecialities}></TagControl>
            </Form.Group>
            }
            <br/>
            <Button variant='primary' onClick={handleSubmit}>Create user</Button>
          </Form>

          
        </Container>
      </>
    );
  }

export default function RegisterUserProvider(props) {
    return (
      <QueryClientProvider client={queryClient}>
          <RegisterUser></RegisterUser>
      </QueryClientProvider>      
    );
}

