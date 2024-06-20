"use client"
import { Button, Col, Container, Row, Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "./login.css"
import { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { useSearchParams } from "next/navigation";

export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const queryParams = useSearchParams()
  const [usernameBlured, setUsernameBlured] = useState(false);
  const [passwordBlured, setPasswordBlured] = useState(false);
  let insertedUsername = queryParams.get('inserted_username') || ""
  const auth = useAuth();
  const validUsername = (username:string) => {
    // Implemente a lógica para validar o username aqui
    return true;
  };

  const validPassword = (password:string) => {
    // Implemente a lógica para validar a senha aqui
    return password.length >= 8;
  };

  const submit = () => {

    if (validUsername(username) && validPassword(password)) {
      auth.loginAction({username, password}).then((res) => {
        if(res === true) {
          window.location.href = "/"
        }
        else {
          window.location.href = "/login?inserted_username=" + username
        }
      }).catch((err) => {
        console.log(err)
      })

    } else {
      if (!validUsername(username)) {
        setUsernameBlured(true);
      }
      if (!validPassword(password)) {
        setPasswordBlured(true);
      }
    }
  };
  return (
    <Container className="mt-5">
    <Row className="justify-content-center">
      <Col md={6}>
        <Card className="px-5 py-5" id="form1">
            <div className="form-data">
              <h1>Login</h1>
              <Form>
                <Form.Group className="mb-4">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    className={`form-control ${
                      !validUsername(username) && usernameBlured ? 'is-invalid' : ''
                    }`}
                    onBlur={() => setUsernameBlured(true)}
                    onChange={(e) => setUsername(e.target.value)}
                    defaultValue={insertedUsername}
                  />
                  {!validUsername(username) && usernameBlured && (
                    <Form.Text className="text-danger">
                      A valid username is required!
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    className={`form-control ${
                      !validPassword(password) && passwordBlured
                        ? 'is-invalid'
                        : ''
                    }`}
                    onBlur={() => setPasswordBlured(true)}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {!validPassword(password) && passwordBlured && (
                    <Form.Text className="text-danger">
                      Password must be 8 characters!
                    </Form.Text>
                  )}
                </Form.Group>
                {insertedUsername && <p className="text-danger">Invalid Credentials</p>}
                <Button variant="dark" className="w-100" onClick={(e) => submit()}>
                  Login
                </Button>
              </Form>
            </div>
          
        </Card>
      </Col>
    </Row>
  </Container>
  );
}