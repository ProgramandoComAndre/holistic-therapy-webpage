"use client"

import React, { useState, useEffect } from 'react';
import { Badge, Button, Container, Form } from 'react-bootstrap';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UsersAPI } from '../../api/usersAPI';
import { useAuth } from '@/app/providers/AuthProvider';
import Nav from '@/app/components/Nav';
import TagControl from '@/app/components/TagsControl';
import { TherapistAPI } from '@/app/api/therapistAPI';
import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';
const queryClient = new QueryClient();

function GetTherapist(props) {
    // username, name, password, confirmPassword, role--> therapists--> specialities

    const auth = useAuth();
    const params = useParams()

    const [username, setUsername] = useState('');
    const [token, setToken] = useState("");
    
    console.log(params)
    
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

    

    
    const therapistQuery = useQuery({
        queryKey: [`therapists/${params.therapistUsername}`],
        queryFn: async () => {
            return TherapistAPI.getTherapist(token, params.therapistUsername)
        }
    });

    if (therapistQuery.isLoading) {
      return <div>Loading...</div>;
    }

    if (therapistQuery.error) {
      return <div>Error loading therapist: {therapistQuery.error.message}</div>;
    }
    
    return (
      <>
        <Nav username={username}></Nav>
        <p>Username: {therapistQuery.data?.username}</p>
        <p>Name: {therapistQuery.data?.name}</p>

        <p>Specialities</p>
        <div>
          {therapistQuery.data?.specialities.map((speciality, index) => (
            <Badge key={index} pill bg="info" className="me-2 mb-2">
              {speciality}
            </Badge>
          ))}
        </div>
    
      </>
    );
  }

export default function GetTherapistProvider(props) {
    return (
      <QueryClientProvider client={queryClient}>
          <GetTherapist></GetTherapist>
      </QueryClientProvider>      
    );
}

