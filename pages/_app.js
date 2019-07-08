import '../css/tailwind.css'
import React from 'react'
import Router from 'next/router'
import App, { Container } from 'next/app'

class MyApp extends App {
  componentDidMount() {
    Router.beforePopState(({ url, as, options }) => {
      options.shallow = true
      return true
    })
  }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    )
  }
}

export default MyApp