import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export const UserContext = createContext({})

function UserContextProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem('user')) || null
  )
  const [isLoggedIn, SetIsLoggedIn] = useState(false)

  useEffect(() => {
    if (!user) {
      axios.get('/profile').then((data) => {
        sessionStorage.setItem('user', JSON.stringify(data))
        setUser(data)
        SetIsLoggedIn(true)
      })
    }
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  )
}
export default UserContextProvider

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}
