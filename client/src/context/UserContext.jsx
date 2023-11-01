import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export const UserContext = createContext({})

function UserContextProvider({ children }) {
  const [user, setUser] = useState({})
  const [isLoggedIn, SetIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!user) {
      axios
        .get('/user/profile', {
          headers: {
            Authorization: token
          }
        })
        .then((data) => {
          console.log(data)
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
