import React, { useState } from "react";
import api from "../../services/api"
import { Button, Form, FormGroup, Input, Alert, Container, Fade } from 'reactstrap';



function Register({ history }) { // Creating component Login
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fade, fadeEffect] = useState(false)
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
            //loginRef.current.children[0].hidden = false
            loginRef.current.children[0].innerText = message
            //console.log(loginRef.current.children)
            fadeEffect(true)
        }

    }
    return (
        <Container>
            <h2>Register</h2>
            <p>Create <strong>a new account.</strong></p>
        <Form onSubmit={handleSubmit}>
        <Fade in={fade}>
            <div ref={loginRef}>
                <Alert color="danger"> {/* Function component */}
                    
                </Alert>
            </div>
        </Fade>
            <FormGroup >
                <Input type="text" name="firstname" id="firstname" placeholder="Your name" onChange={evt => setFirstName(evt.target.value)} />
            </FormGroup>
            <FormGroup >
                <Input type="text" name="lastname" id="lastname" placeholder="Your last name" onChange={evt => setLastName(evt.target.value)} />
            </FormGroup>
            <FormGroup >
                <Input type="email" name="email" id="email" placeholder="Your email" onChange={evt => setEmail(evt.target.value)} />
            </FormGroup>
            <FormGroup>
                <Input type="password" name="password" id="password" placeholder="Your password" onChange={evt => setPassword(evt.target.value)} />
            </FormGroup>
            <FormGroup>
            <Button className="submit-btn">Register</Button>
            </FormGroup>
            <FormGroup>
            <Button className="secondary-btn" onClick={()=>{history.push('/login')}}>Log In instead?</Button>
            </FormGroup>
        </Form>
        </Container>
    )
}

export { Register }