import React, { useState } from 'react'
import ActiveLink from './ActiveLink'
import Box from '@material-ui/core/Box'
import Hidden from '@material-ui/core/Hidden'
import ContactForm from './ContactForm'

export default function Navigation() {
  const [showMenu, setShowMenu] = useState(false)
  const [showContact, setShowContact] = useState(false)

  function MainMenu() {
    const menu = [
      { name: 'Work', link: '/work' },
      { name: 'About', link: '/about' },
      { name: 'Skills', link: '/skills' }
    ]
    const mainMenu = menu.map(({ name, link }) => (
      <ActiveLink key={name} href={link}>
        <a onClick={toggleMenu} className="menu-item">
          {name}
        </a>
      </ActiveLink>
    ))
    return mainMenu
  }

  function toggleMenu() {
    setShowMenu(!showMenu)
  }

  function toggleContact() {
    setShowContact(!showContact)
  }

  return (
    <>
      <ContactForm contactChange={toggleContact} contact={showContact} />
      <Hidden smDown>
        <Box className="menu-custom">
          <MainMenu />
          <Box ml={2} display="inline">
            <a className="btn btn-white" onClick={toggleContact}>
              Contact
            </a>
          </Box>
        </Box>
      </Hidden>
      <Hidden mdUp>
        <Box id="mobile-menu">
          <button
            onClick={toggleMenu}
            className={`menu-btn ${showMenu ? 'open' : ''}`}
            aria-label="menu"
          >
            <span className="menu-title">menu</span>
            <span className="menu-box">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
          <Box className={`mobile-menu-body ${showMenu ? 'show' : ''}`}>
            <MainMenu />
            <a className="btn btn-white" onClick={toggleContact}>
              Contact
            </a>
          </Box>
        </Box>
      </Hidden>
    </>
  )
}
