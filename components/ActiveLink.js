import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const ActiveLink = ({ href, children }) => {
  const router = useRouter()
  let className = children.props.className || ''
  let currentPath = router.pathname.split('/')
  let rootPath = `/` + currentPath[1]

  if (rootPath === href) {
    className = `${className} active`
  }

  return <Link href={href}>{React.cloneElement(children, { className })}</Link>
}

export default ActiveLink
