import { useState } from "react"
import useDebounce from "./useDebounce";


function MyButton(){
    const[count,setCount]=useState(0);

    console.log(useDebounce(count,2000))

    

    function changeCount(){
        setCount(count+1);
    }

    return (
        <div>
           <h1>Click Count: {useDebounce(count,2000)}</h1>
           <input type="button" value="Click Me" onClick={changeCount}/>
        </div>
    )
}

export default MyButton;