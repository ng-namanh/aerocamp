import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export const UserContext = createContext({})

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoggedIn, SetIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios
        .get('/user/profile', {
          headers: {
            Authorization: token
          }
        })
        .then((response) => {
          setUser(response.data.user)
          SetIsLoggedIn(true)
        })
    }
  }, [])

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
