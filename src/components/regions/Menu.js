import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Hidden from '@mui/material/Hidden'
import ActiveLink from '@/components/ActiveLink'
import ContactForm from '@/components/ContactForm'

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
      <ActiveLink
        key={name}
        href={link}
        activeClassName="active"
        className="menu-item"
      >
        {name}
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
      <Box id="menu-custom" sx={{ display: { xs: 'none', md: 'block' } }}>
        <MainMenu />
        <Box ml={2} display="inline">
          <a className="btn btn-white" onClick={toggleContact}>
            Contact
          </a>
        </Box>
      </Box>
      <Box id="mobile-menu" sx={{ display: { md: 'none', sm: 'block' } }}>
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
    </>
  )
}
