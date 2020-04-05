import React from 'react'
import './Layout.module.scss'
import { Nav, Footer } from 'components/organisms';

const DescriptionDefault = () => (<p>Descrição</p>)

const Layout = ({
  children,
  title = 'Title',
  description = <DescriptionDefault />,
  className = '',
  showPublicNav = false,
}) => {
  return (
    <>
      <div className="container">
        <Nav skipAuth={showPublicNav} />
        <div className={`hero ${className}`}>
          <h1>{title}</h1>
          <div className="hero__description">
            {description}
          </div>
        </div>

        <main>
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
