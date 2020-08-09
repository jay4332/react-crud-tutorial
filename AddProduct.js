import React, { Component } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap';

export default class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            id: '',
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            city: ''
        }

        if(props.product){
            this.state = props.product;
        } else {
            this.state = this.initialState;
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onFormSubmit(this.state);
        this.setState(this.initialState);
    }

    render() {

        let pageTitle;
        if(this.state.id){
            pageTitle = <h2>Edit Contact</h2>
        } else {
            pageTitle = <h2>Add Contact</h2>
        }

        return (
            <div>
                {pageTitle}
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>

                            <Form.Group controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="firstName" 
                                    value={this.state.firstName}
                                    onChange={this.handleChange} 
                                    placeholder="First Name" />
                            </Form.Group>
                            
                            <Form.Group controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    value={this.state.lastName}
                                    onChange={this.handleChange}
                                    placeholder="Last Name" />
                            </Form.Group>

                            <Form.Group controlId="phone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    value={this.state.phone}
                                    onChange={this.handleChange}
                                    placeholder="Phone" />
                            </Form.Group>

                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    placeholder="Phone" />
                            </Form.Group>

                            <Form.Group controlId="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="city"
                                    value={this.state.city}
                                    onChange={this.handleChange}
                                    placeholder="City" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control type="hidden" name="id" value={this.state.id} />
                                <Button variant="success" type="submit" >Save</Button>
                            </Form.Group>

                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}
