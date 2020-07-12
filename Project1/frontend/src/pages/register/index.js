import React, { useState } from "react";
import api from "../../services/api"
import { Button, Form, FormGroup, Input, Alert, Container } from 'reactstrap';



function Register({ history }) { // Creating component Login
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const loginRef = React.createRef();
    const handleSubmit = async evt => {
        //This is async func. coz It will talk to the server API
        
        evt.preventDefault();

        //console.log(`${email} and ${password}`)

        const response = await api.post('/user/register', { firstName, lastName, email, password })
        const userId = response.data._id || false;

        if (userId) {
            localStorage.setItem('user_id', userId)
            history.push('/dashboard')
        } else {
            const { message } = response.data;
            loginRef.current.children[0].hidden = false
            loginRef.current.children[0].innerText = message
            //console.log(loginRef.current.children)

        }

    }
    return (
        <Container>
            <h2>Register</h2>
            <p>Create <strong>a new account.</strong></p>
        <Form onSubmit={handleSubmit}>
            <div ref={loginRef}>
                <Alert hidden={true} color="danger"> {/* Function component */}
                    
                </Alert>
            </div>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="text" name="firstname" id="firstname" placeholder="Your name" onChange={evt => setFirstName(evt.target.value)} />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="text" name="lastname" id="lastname" placeholder="Your last name" onChange={evt => setLastName(evt.target.value)} />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="email" name="email" id="email" placeholder="Your email" onChange={evt => setEmail(evt.target.value)} />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="password" name="password" id="password" placeholder="Your password" onChange={evt => setPassword(evt.target.value)} />
            </FormGroup>
            <Button>Submit</Button>
        </Form>
        </Container>
    )
}

export { Register }