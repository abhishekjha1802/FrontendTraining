import { useState } from "react"
import Counter from "./Counter";

export default function HOC() {

    return (
      <div className="App">
        <h1>HOC </h1>
        <HOCRed cmp={Counter} />
        <HOCGreen cmp={Counter} />
        <HOCBlue cmp={Counter} />
  
      </div>
    );
  }
  function HOCRed(props : any)
  {
    return <h2 style={{backgroundColor:'red',width:100}}>Red<props.cmp /></h2>
  }
  function HOCGreen(props : any)
  {
    return <h2 style={{backgroundColor:'green',width:100}}>Green<props.cmp /></h2>
  }
  function HOCBlue(props : any)
  {
    return <h2 style={{backgroundColor:'blue',width:100}}>blue <props.cmp /></h2>
  }