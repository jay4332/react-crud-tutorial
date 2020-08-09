import React, { Component } from 'react'
import {Table, Button, Alert} from 'react-bootstrap';
import Axios from 'axios';

export default class ProductList extends Component {

    constructor(props){
        super(props);
        this.state = {
            error:null,
            message: 'test',
            check_message: 'success',
            product: []
        };
    }

    componentDidMount(){
        const apiUrl = 'http://127.0.0.1:8000/api/v1/people';

        fetch(apiUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    // console.warn(result.data)
                    this.setState({
                        product: result.data
                    })
                },
                (error) => {
                    this.setState({ error })
                }
            )
    }

    deleteProduct(productId) {
        const { product } = this.state;

        const apiUrl = 'http://127.0.0.1:8000/api/v1/person/'+productId;
      
        Axios.delete(apiUrl)
        .then(function (response) {
            console.log(response.data);
            this.setState({
                    product: product.filter(product => product.id !== productId),
                    message: "Data Deleted",
                    check_message: "success"
                    })
        })
        .catch(function (error) {
            console.log(error);
        });
        // alert(this.state.check_message)
    }

    render() {

        const {error, product} = this.state;

        if(error){
            return(
                <div>Error: {error.message}</div>
            )
        }
        else{
            return (
                <div>
                    
                    <h2>Contact List</h2>

                    

                    <Table>
                        <thead>
                            <tr>
                                <th>#ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>City</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {product.map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.first_name}</td>
                                    <td>{product.last_name}</td>
                                    <td>{product.phone}</td>
                                    <td>{product.email}</td>
                                    <td>{product.city}</td>
                                    <td>
                                        <Button variant="info" onClick ={()=>this.props.editProduct(product.id)} >Edit</Button>
                                        &nbsp; 
                                        <Button variant="danger" onClick={()=>this.deleteProduct(product.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </Table>

                </div>
            )
        }

        
    }
}
