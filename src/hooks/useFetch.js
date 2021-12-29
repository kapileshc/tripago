import { useState, useEffect } from "react"

export const useFetch=(url)=>{
    const [data,setData] =useState(null)
    const [isPending, setIspending]= useState(false)
    const [error, setError] = useState(null)

    useEffect(()=>{
        const controller = new AbortController()
        const fetchData =async()=>{
            setIspending(true)

            try{
                const res = await fetch(url,{signal:controller.signal})
                if(!res.ok){
                    throw new Error(res.statusText)
                }
            const json =await res.json()

            setIspending(false)
            setData(json)
            setError(null)
            }catch(err){
                if(err.name==="AbortError"){
                    console.log("the fetch was aborted")
                }else{
                    setIspending(false)
                setError('could not fetch the data')
                console.log(err.message)
                }
                
            }
            
        }
        fetchData()
        return ()=>{
            controller.abort()
        }
    },[url])
    return{data,isPending,error}
}



