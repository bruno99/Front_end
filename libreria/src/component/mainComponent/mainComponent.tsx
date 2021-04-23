import React , {FC, useState} from 'react';
import Body from "../body/books";
import ABody from "../body/autor"

import "./style.css"

const Main:FC = ()=>{
    const [search,setSearch] = useState<string>("");
    const [searchA,setSearchA] = useState<string>("");
    const [state,setState] =useState<string>();


    return(
        <div className="back">
            <div className="title">Librería Online</div>
            <div className= "title">Autor------------Libro</div>
            <div className="container"> 
                <input type="text" onChange={(e)=>setSearchA(e.target.value)}/> 
                <input type="text" onChange={(e)=>setSearch(e.target.value)}/>
                <div className="boton" onClick={(e)=>setState("searching")}>Buscar</div>
            </div>
            {!state&&(<div className="text_aux"></div>)}
            {state&&<Body text={search}></Body>}
            {state&&<ABody text={searchA}></ABody>}
        </div>
    )
}
export default Main;
