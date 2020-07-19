import React, { useState, useEffect } from 'react'
import { Container, FormGroup, Label, Input, Form, Button, Fade, Alert } from 'reactstrap'
import image from '../../img/image.png'
import api from '../../services/api'
function Events() {
    const user_id = localStorage.getItem('user_id')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [haveThumbnail, setHaveThumbnail] = useState(false)
    const [date, setDate] = useState('')
    const [sport, setSport] = useState('')
    const [thumbnail, setThumbnail] = useState()
    const [alertMessage, setAlertMessage] = useState('')
    const [fade, fadeEffect] = useState(false)
   
    //const krl = <div>oi</div>;
    useEffect(() => {

        const parserthumb = new FileReader()

        if (haveThumbnail === true) {
            
            if (document.getElementById('thumbnail').files[0]) {
                parserthumb.readAsDataURL(document.getElementById('thumbnail').files[0])
                setThumbnail(document.getElementById('thumbnail').files[0])
                parserthumb.addEventListener("loadend", function () {
                    if(parserthumb.result.split('/')[0] !== 'data:image'){
                        setAlertMessage("You can only upload image files.")
                        fadeEffect(true)
                        setTimeout(()=>{
                            fadeEffect(false)
                        },5000)
                    }else{
                        document.getElementById('imagepreview').src = parserthumb.result
                        
                    }
                    
                })
            }
        }
        setHaveThumbnail(false)
    }, [haveThumbnail])

    const handleSubmit = async evt => {
        evt.preventDefault()
        //console.log(price)
        //console.log(typeof Number(price)) 
        //console.log(isNaN(Number(price)))
        if (description !== "" && title !== "" && date !== "" && sport !== "" && price !== "") {


            if (isNaN(Number(price))) {
                setAlertMessage("Please enter a valid price.")
                fadeEffect(true)
                setTimeout(()=>{
                    fadeEffect(false)
                },5000)
            } else {

                const file = new FormData()
                file.append("thumbnail", thumbnail)
                file.append("title", title)
                file.append("description", description)
                file.append("date", date)
                file.append("sport", sport)
                file.append("price", price)

                await api.post('/event', file, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'user_id': user_id
                    }
                })
            }
        } else {
            setAlertMessage("Required field missing.")
            fadeEffect(true)
            setTimeout(()=>{
                fadeEffect(false)
            },5000)
        }
    }
    //console.log(user_id)
    return (
        <Container>
            <Fade in={fade}>
    <Alert color="danger"><div>{alertMessage}</div></Alert>
            </Fade>
            <Form onSubmit={handleSubmit}>
                <Label>Select your image</Label><br />
                <FormGroup style={{ textAlign: "center" }}>
                    <Label for="thumbnail"><img alt="" id='imagepreview' src={image} width='200px' /></Label>
                    <Input hidden={true} type="file" name="thumbnail" id="thumbnail" onChange={(evt) => {
                        setHaveThumbnail(true)
                    }} />
                </FormGroup>

                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input type="text" name="title" id="title" onChange={evt => { setTitle(evt.target.value) }} />
                </FormGroup>
                <FormGroup>
                    <Label for="title">Description</Label>
                    <Input type="textarea" name="title" id="title" onChange={evt => { setDescription(evt.target.value) }} />
                </FormGroup>
                <FormGroup>
                    <Label for="price">Price</Label>
                    <Input type="text" name="price" id="price" onChange={evt => { setPrice(evt.target.value) }} />
                </FormGroup>
                <FormGroup>
                    <Label for="sport">Sport</Label>
                    <Input type="text" name="sport" id="sport" onChange={evt => { setSport(evt.target.value) }} />
                </FormGroup>
                <FormGroup>
                    <Label for="date">Date</Label>
                    <Input type="date" name="date" id="date" onChange={evt => { setDate(evt.target.value) }} />
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </Container>
    )
}

export { Events }