import React, { Component } from 'react'
import ProductList from './ProductList'
import { Container, Button, Alert } from 'react-bootstrap' 
import AddProduct from './AddProduct';
import Axios from 'axios';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      isAddProduct: false,
      error: null,
      message: null,
      check_message: 'success',
      response: {},      
      product: {},
      isEditProduct: false
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onCreate() {
    this.setState({ isAddProduct: true });
  }

  onFormSubmit(data) {
    const product_id= data.id;
    // console.log(data.firstName);
    const formData = {
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
      email: data.email,
      city: data.city
    };

    // let apiUrl;

    // const proxyurl = "https://cors-anywhere.herokuapp.com/";

    if(this.state.isEditProduct){
      
      const apiUrl = 'http://127.0.0.1:8000/api/v3/person/'+product_id;
      
      Axios.put(apiUrl, formData)
      .then(function (response) {
        // console.log(response.data);
          this.setState({
                  // response: response.data,
                  message: "Data Updated",
                  check_message: "success",
                  isAddProduct: false,
                  isEditProduct: false
                })
      })
      .catch(function (error) {
        console.log(error);
      });
      // alert(this.state.check_message)
      

    } else {
      const apiUrl = 'http://127.0.0.1:8000/api/v1/person';
      
      Axios.post(apiUrl, formData)
      .then(function (response) {
        // console.log(response.data);
          this.setState({
                  // response: response.data,
                  message: "New Data Added",
                  check_message: "success",
                  isAddProduct: false,
                  isEditProduct: false
                })
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
  }

  editProduct = productId => {
    // console.log(productId);
    const apiUrl="http://127.0.0.1:8000/api/v3/person/"+productId;
    
    // const formData = new FormData();
    // formData.append('productId', productId);

    const options = {
      method : 'GET'
      // body : formData
    };

    fetch(apiUrl , options)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            product: result.data,
            message:  "Fetched data",
            check_message: "success",
            isAddProduct: true,
            isEditProduct: true
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
      
  }

  render() {

    let productForm;
    if(this.state.isAddProduct || this.state.isEditProduct){
      productForm = <AddProduct onFormSubmit ={this.onFormSubmit} product={this.state.product} />
    }

    return (
      <div className="App">
        <Container>

          <h1 style={{textAlign: "center"}}>React Tutorial</h1>

          {!this.state.isAddProduct &&
            <Button variant="primary" onClick={() => this.onCreate()}> Add Contact</Button>
          }

          {/* {this.state.response.status === 'success' && */}
          

          {!this.state.isAddProduct &&
            <ProductList editProduct={this.editProduct} />
          }

          {productForm}

          {/* {this.state.isAddProduct && <AddProduct onFormSubmit={this.onFormSubmit}/>} */}
          
          <p>{this.state.message}</p>

        {this.state.error && <div> {this.state.error.message} </div>}
        </Container>
        
        
        
      </div>
    )
  }
}
