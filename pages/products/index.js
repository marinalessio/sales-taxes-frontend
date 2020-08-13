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
      
      const res = await fetch('http://localhost:3001/products');
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
    
          <main>
            <Layout>
              <div className="question">What do you need?</div>
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

              <Link href="/products/new">
                <button>
                  Create new product
                </button>
              </Link>
              
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

            .selected {
              background-color: yellow;
            }
          `}</style>
        </div>
      )
    }
}