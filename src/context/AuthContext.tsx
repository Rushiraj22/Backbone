import { createContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/router";
import authConfig from "src/configs/auth";
import { AuthValuesType, LoginParams, UserDataType } from "./types";
import axiosObj from "src/services/api";
import { getSignInURL } from "src/services/apiConfig";
import { TokenBlackList } from "src/redux/reducers/authReducer";

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
  /**
   * States
   */
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  /**
   * Hooks
   */
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem("accessToken")
      if (storedToken) {
        setLoading(true)
        setLoading(false)
        const userData = window.localStorage.getItem("userData");
        const roles = userData ? userData : null;
        setUser(roles)
      } else {
        const myaccessToken = window.localStorage.getItem("accessToken")
        setLoading(false)
        if (!myaccessToken) {
          router.replace("/login")
        }
      }
    }

    initAuth();
  }, [])


  const handleLogin = async (params: LoginParams) => {
    axiosObj.post(getSignInURL(), params)
      .then(async response => {
        if (response.status === 200) {
          localStorage.setItem("accessToken", response.data.access);
          localStorage.setItem("refreshToken", response.data.refresh);
          localStorage.setItem("userData", "admin");
          localStorage.setItem("user_permissions", response.data.user_permissions)
          const userData = window.localStorage.getItem("userData");
          const roles = userData ? userData : null;
          setUser(roles)
          const returnUrl = router.query.returnUrl
          const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
          router.replace(redirectURL as string)
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  const handleLogout = () => {
    setUser(null);
    let token = localStorage.getItem("refreshToken")
    TokenBlackList(token)
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
