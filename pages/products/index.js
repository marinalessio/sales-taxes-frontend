import Head from 'next/head';
import Link from 'next/link';
import fetch from 'node-fetch'
import Layout from '../../components/layout';
import React from 'react';

export default class Products extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        productsSelected: [],
        link: "/cart/details"
      };

      this.selectProduct = this.selectProduct.bind(this);
    }

    static async getInitialProps() {
      
      const res = await fetch('https://cwl4ojiqki.execute-api.us-east-2.amazonaws.com/latest/products');
      const json = await res.json();
      return { products: json };

    }

    selectProduct(productId) {
      if (this.state.productsSelected.indexOf(productId) == -1) {
        this.setState({
          productsSelected: [...this.state.productsSelected, productId],
          link: "/cart/details?products="+[...this.state.productsSelected, productId].join('|'),
        })
      } else {
        this.setState({
          productsSelected: [...this.state.productsSelected].filter(i => i != productId),
          link: "/cart/details?products="+[...this.state.productsSelected].filter(i => i != productId).join("|")
        });
      }
    }

    render () {
      return (
        <div className="container">
          <Head>
            <title>Create your order</title>
          </Head>
    
          <main className="list-container">
            <Layout>
              <div className="question">What do you need? Please select some products and create your order.</div>
              <div className="list">
                {this.props.products.map((product, key) => (
                  <div key={key} onClick={() => this.selectProduct(product.id)} className={(this.state.productsSelected.indexOf(product.id) > -1)? 'selected': ''}>
                    {product.name}
                  </div>
                ))}
              </div>

              <Link href={this.state.link} >
                <button>
                  Calculate total
                </button>
                </Link>
              
            </Layout>
          </main>

        </div>
      )
    }
}