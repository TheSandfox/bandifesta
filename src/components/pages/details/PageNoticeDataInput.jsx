import {useState, useCallback} from "react"

const DataInput = (inputNoti)=>{

    const [noti, setNoti] = useState(inputNoti)
    
    const onchange = useCallback((e)=>{
        const {name, value} = e.target;
        setNoti((noti)=>({
            ...noti,
            [name] : value
        }))
    }, [])

    const reset = useCallback(()=>setNoti(inputNoti),[inputNoti])
    
    return[noti, onchange, reset]
}

export default DataInput;