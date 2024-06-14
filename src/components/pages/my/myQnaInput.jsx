import { useState, useCallback } from "react";

const QnaInput = (inputData)=>{
    const [data, setData] = useState([]);

    const onchange = useCallback((e)=>{
        const {name, value} = e.target
        setData((data)=>({
            ...data,
            [name]:value
        }))
    },[])

    const reset = useCallback(()=>setData(inputData),[inputData])
    return[data, onchange, reset]
}
export default QnaInput;