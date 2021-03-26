import React, {FC,useEffect, useState } from 'react';
import 'whatwg-fetch'
import '../components/style.css'

interface Planets {
    count:    number;
    next:     string;
    previous: null|null;
    results:  Result[];
}

interface Result {
    name:            string;
    rotation_period: string;
    orbital_period:  string;
    diameter:        string;
    climate:         string;
    gravity:         string;
    terrain:         string;
    surface_water:   string;
    population:      string;
    residents:       string[];
    films:           string[];
    created:         Date;
    edited:          Date;
    url:             string;
}

const Planets:FC =():JSX.Element=>{
    const [data, setData] = useState<Result[]>();
    const [item, setItem] = useState<Result[]>();
    const [state,setState] = useState<string>("null");
    const [type,setType] = useState<string>("normal");
    
    
    
    useEffect(()=>{
        fetch('https://swapi.dev/api/planets/')
  .then(response => response.json())   
  .then(data => {
    setData(data.results) 
  })
    
    },[]);

    return(
        <div>
            <div className="components">
            {data&&(
                <div>
                    <div className="buttons" onClick={()=>{setState("list") }}>Planets List</div> //opcion lista entera
                    <div className="buttons"  onClick={()=>{setState("search")}}>Search</div>         //opcion buscar                
                </div>
            )}
        </div>
                    {data&&(
                        <div className="components">
                            {state==="list"&&data.map((value,index)=>{
                                return <div className="text">{value.name}</div>
                            })}
                            {state==="search"&&(
                                <div className="components">
                                    <input type="text" className="input_text" onChange={(e)=>{
                                        const items=data.filter((data)=>{
                                            if(data.name.toLowerCase().includes(e.target.value))
                                                return data;
                                            
                                        });
                                        setItem(items)
                                        
                                    }}/>
                                    {item&&item.map((value,index)=>{
                                        return <div className="text">{value.name}</div>
                                    })}
                                </div>
                            )}
                        </div>
                    )}
        </div>
    );
}

export default Planets;