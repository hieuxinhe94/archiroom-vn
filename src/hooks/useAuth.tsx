'use client'
import Keycloak from 'keycloak-js'
import { useCallback, useEffect, useRef, useState } from 'react'

const useAuth = () => {
  const isRun = useRef(false)
  const [token, setToken] = useState(null)
  const [isLogin, setLogin] = useState(false)
  const [client, setClient] = useState<Keycloak | undefined>()

  const init = useCallback(async () => {
    if (typeof window !== 'undefined') {
      const client = new Keycloak({
        url: 'http://chimseo.com:5001/auth',
        realm: 'chimseo',
        clientId: 'chimseo',
      })
      client
        .init({
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri:
            window.location.origin + '/silent-check-sso.html',
          // silentCheckSsoFallback: false,
          pkceMethod: 'S256',
        })
        .then((res) => {
          setLogin(res)
          client.loadUserInfo()
        })
      // setClient(client)
    }
  }, [])

  useEffect(() => {
    init()
  }, [init])

  return { isLogin, token, client }
}

export default useAuth
