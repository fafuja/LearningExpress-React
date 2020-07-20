import React, { useState } from "react";
import api from "../../services/api"
import { Button, Form, FormGroup, Input, Alert, Container, Fade } from 'reactstrap';



function Login({ history }) { // Creating component Login
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fade, fadeEffect] = useState(false)
    const loginRef = React.createRef();
   
    const handleSubmit = async evt => {
        //This is async func. coz It will talk to the server API

        evt.preventDefault();

        //console.log(`${email} and ${password}`)
        console.log('result of the submit', email, password)

        const response = await api.post('/login', { email, password })
        const userId = response.data._id || false;

        if (userId) {
            localStorage.setItem('user_id', userId)
            history.push('/dashboard')
        } else {
            const { message } = response.data;

            //loginRef.current.children[0].hidden = false
            loginRef.current.children[0].innerText = message
            console.log(message)
            fadeEffect(true)

            //console.log(loginRef.current.children)
        }
    }
    return (
        <Container>
            <h2>Login</h2>
            <p>Please <strong>login into your account.</strong></p>
            <Form onSubmit={handleSubmit}>
                <Fade in={fade}>
                    <div ref={loginRef}>
                        <Alert color="danger"> {/* Function component */}
                            {/*hidden={false}*/}
                        </Alert>
                    </div>
                </Fade>
                <FormGroup>
                    <Input type="email" name="email" id="email" placeholder="Your email" onChange={evt => setEmail(evt.target.value)} />
                </FormGroup>
                <FormGroup >
                    <Input type="password" name="password" id="password" placeholder="Your password" onChange={evt => setPassword(evt.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Button className="submit-btn">Log in</Button>
                </FormGroup>
                <FormGroup>
                    <Button className="secondary-btn" onClick={()=>history.push('/register')}>Sign Up</Button>
                </FormGroup>
            </Form>
        </Container>

    )
}

export { Login }