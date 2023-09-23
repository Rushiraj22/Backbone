// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (storedToken) {
        setLoading(true)
        setLoading(false)
        let roles = JSON.parse(window.localStorage.getItem())
        roles['role'] = "admin"
        setUser(roles)
      } else {
        const myaccessToken = window.localStorage.getItem("accessToken")
        const myusername = window.localStorage.getItem("username")
        setLoading(false)
        if (!myaccessToken && !myusername) {
          router.replace('/login')
        }
      }
    }

    initAuth()
  }, [])


  const handleLogin = async (params: LoginParams) => {
    // axiosInstance.post(getSignInURL(), params)
    //   .then(async response => {
    //     if (response.status === 200) {
    //       const returnUrl = router.query.returnUrl
    //       const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
    //       router.replace(redirectURL as string)
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.clear()
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
