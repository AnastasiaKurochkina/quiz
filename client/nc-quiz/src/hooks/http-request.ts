import { useCallback } from "react"
import { useState } from "react"
export const useHttp = () => {
    const [loading, setLoading] = useState < boolean > (false)
    const request = useCallback(async(url, method = 'POST', body = null, headers = {}) => {
        setLoading(true)
        try {
          if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            } 
            const response = await fetch(url, {
                method,
                body,
                headers
            })
            const data = await response.json()
            setLoading(false)
            return data
        } catch (e: any) {
            setLoading(false)
            console.log(e.message)
        }
    }, [])
    return {loading,request}
}
