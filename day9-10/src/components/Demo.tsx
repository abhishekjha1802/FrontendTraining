import React from "react";
import { useLocation } from "react-router-dom";

function Demo(props:any){
    let location=useLocation()
    console.log(location)
    return(
        <div>
            Hello World+{location}
        </div>
    )
}

export default Demo;