import React, {FC,useEffect, useState } from 'react';
import 'whatwg-fetch'
import '../components/style.css'

interface Characters {
    count:    number;
    next:     string|null;
    previous: string|null;
    results:  Result[];
}

interface Result {
    name:       string;
    height:     string;
    mass:       string;
    hair_color: string;
    skin_color: string;
    eye_color:  string;
    birth_year: string;
    gender:     string;
    homeworld:  string;
    films:      string[];
    species:    string[];
    vehicles:   string[];
    starships:  string[];
    created:    Date;
    edited:     Date;
    url:        string;
}

enum Gender {
    Female = "female",
    Male = "male",
    NA = "n/a",
}

const Characters:FC =(): JSX.Element=>{
    const [data, setData] = useState<Result[]>();
    const [item, setItem] = useState<Result[]>();
    const [state,setState] = useState<string>("null");
    const [type,setType] = useState<string>("normal");
    

    useEffect(()=>{
        fetch('https://swapi.dev/api/people/')
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
                    <div className="buttons" onClick={()=>{setState("list") }}>Chatacters List</div> //opcion lista entera
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
export default Characters;