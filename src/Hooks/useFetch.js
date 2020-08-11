import React from 'react'

const useFetch = () => {
    const [data, setData] = React.useState(null)
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    
    const request = React.useCallback( async (url, option) => {
        let response
        let json
        try {
            setError(null)
            setLoading(true)
            response = await fetch(url, option)
            json = await response.json()
            if(!response.ok) throw new Error(json.message)
        } catch (error) {
            setError(error.message)
            json = null
        }finally {
            setLoading(false)
            setData(json)
            return {response, json}
        }
    
    }, [])
    
    return ({
        data,
        loading,
        error,
        request
    })
}

export default useFetch
