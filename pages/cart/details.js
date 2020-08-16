import Head from 'next/head';
import { useRouter } from 'next/router';
import fetch from 'node-fetch'
import Layout from '../../components/layout';
import React from 'react';

export default class Cart extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        products: [],
        salesTaxes: 0,
        total: 0
      }
    }

    async componentDidMount() {
        let queryParams = new URLSearchParams(window.location.search);
        let products = queryParams.get('products');
        if (products) {
          let requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(products.split("|"))
          };
          let res = await fetch('http://localhost:3001/bill', requestOptions);
          let json = await res.json();
          this.setState({ products: json.products, salesTaxes: json.salesTaxes, total: json.total });
        }
    }

    render () {
      return (
        <div className="container">
          <Head>
            <title>Details order</title>
          </Head>
    
          <main className="list-container">
            <Layout>
              <div className="question">Order details</div>
              <div className="list">
                {this.state.products.map((product, key) => (
                  <div key={key}>
                    {product.quantity} {product.name} {product.priceTaxed}
                  </div>
                ))}
              </div>
              <div className="details">
                <div>Sales Taxes: {this.state.salesTaxes}</div>
                <div>Total: {this.state.total}</div>

              </div>
            </Layout>
          </main>
        </div>
      )
    }
}