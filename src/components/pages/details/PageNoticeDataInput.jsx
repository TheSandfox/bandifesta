import {useState, useCallback} from "react"

const DataInput = (inputNoti)=>{

    const [noti, setNoti] = useState(inputNoti)
    
    const onchange = useCallback((e)=>{
        const {name, value} = e.target;
        setNoti((noti)=>({
            ...noti,
            // name은 key값이기 때문에 대괄호로 감싸는 것
            [name] : value
        }))
    }, [])

    const reset = useCallback(()=>setNoti(inputNoti),[inputNoti])
    
    return[noti, onchange, reset]
}

export default DataInput;