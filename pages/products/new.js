import Head from 'next/head';
import Link from 'next/link';
import fetch from 'node-fetch'
import Layout from '../../components/layout';
import React from 'react';


export default class NewProduct extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        quantity: "",
        price: "",
        imported: false,
        excepted: false,
        category: "other"
      };

      this.submitForm = this.submitForm.bind(this);
      this.setValueName = this.setValueName.bind(this);
      this.setValueQuantity = this.setValueQuantity.bind(this);
      this.setValuePrice = this.setValuePrice.bind(this);
      this.setValueImported = this.setValueImported.bind(this);
      this.setValueCategory = this.setValueCategory.bind(this);
    }

    async create() {
      let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: this.state.name,
          quantity: Number(this.state.quantity),
          price: Number(this.state.price),
          imported: this.state.imported,
          excepted: this.state.excepted
        })
      };
      let res = await fetch('https://cwl4ojiqki.execute-api.us-east-2.amazonaws.com/latest/products', requestOptions);
      if (res.ok) {
        alert("Product created");
      } else {
        alert("Error");
      }
      this.setState({
        name: "",
        quantity: "",
        price: "",
        imported: false,
        excepted: false,
        category: "other"
      })
      return;
    }
    
    submitForm = (event) => {
      event.preventDefault();
      if (this.state.name == "" || this.state.quantity == 0 || this.state.price == 0) {
        alert("All fields are required");
        return;
      }
      this.create();
      return;
  
   }

   setValueName(value) {
    this.setState({ name: value });
   }

   setValueQuantity(value) {
    this.setState({ quantity: value });
   }

   setValuePrice(value) {
    this.setState({ price: value });
   }

   setValueImported(value) {
    this.setState({ imported: value });
   }

   setValueCategory(value) {
    if (value == 'other') {
      this.setState({ excepted: false, category: value });
    } else {
      this.setState({ excepted: true, category: value });
    }
   }

    render () {
      return (
        <div className="container">
          <Head>
            <title>Create product</title>
          </Head>
    
          <main>
            <Layout>
               
                <form onSubmit={this.submitForm} className="new-product-form">

                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" className="form-control" value={this.state.name} onChange={(e) => this.setValueName(e.target.value)} />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" name="quantity" className="form-control" value={this.state.quantity} min="1" step="1" onChange={(e) => this.setValueQuantity(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" className="form-control" value={this.state.price} min="0" step="0.01" onChange={(e) => this.setValuePrice(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <input type="checkbox" name="imported" className="form-control" value={this.state.imported} onChange={(e) => this.setValueImported(e.target.checked)} />
                    <label htmlFor="scales">Has been imported?</label>
                  </div>

                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select type="checkbox" name="category" className="form-control" value={this.state.category} onChange={(e) => this.setValueCategory(e.target.value)}>
                      <option value="food">Food</option>
                      <option value="books">books</option>
                      <option value="medical">medical</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <button type="submit">
                    Create product
                  </button>
                </form>

            </Layout>
          </main>
    
          <style jsx>{`
            .container {
              min-height: 100vh;
              padding: 0 0.5rem;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
          `}</style>
        </div>
      )
    }
}