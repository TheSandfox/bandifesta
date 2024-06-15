import { useContext, useEffect, useState } from "react";
import { getFestivals } from "/src/api_utils/festivalUtil"
import {configContext} from '/src/App';
function MainSec4 (){
    const config = useContext(configContext);
    const [festivals,setFestivals]= useState([])
    useEffect(()=>{
        getFestivals({
            itemsPerPage:10,
            pageNum:1,
            language:config.language,
            periodType:1,
            sortMethod:1, 
        },(response)=>{
            console.log(response);
            setFestivals(response.data);
        },(error)=>{
            console.log(error);
        });     

    },[]) 
    // console.log(festivals)
    return<>
    
    </>
}
export default MainSec4