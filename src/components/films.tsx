import React, {FC,useEffect, useState } from 'react';
import 'whatwg-fetch'
import '../components/style.css'

interface Films {
    count:    number;
    next:     null;
    previous: null;
    results:  Result[];
}

interface Result {
    title:         string;
    episode_id:    number;
    opening_crawl: string;
    director:      string;
    producer:      string;
    release_date:  Date;
    characters:    string[];
    planets:       string[];
    starships:     string[];
    vehicles:      string[];
    species:       string[];
    created:       Date;
    edited:        Date;
    url:           string;
}

const Films:FC = (): JSX.Element=>{
    const [data, setData] = useState<Result[]>();
    const [item, setItem] = useState<Result[]>();
    const [state,setState] = useState<string>("null");
    const [type,setType] = useState<string>("normal");

    useEffect(()=>{
        fetch('https://swapi.dev/api/films/')
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
                    <div className="buttons" onClick={()=>{setState("list") }}>Films List</div> //opcion lista entera
                    <div className="buttons"  onClick={()=>{setState("search")}}>Search</div>         //opcion buscar                
                </div>
            )}
        </div>
                    {data&&(
                        <div className="components">
                            {state==="list"&&data.map((value,index)=>{
                                return <div className="text">{value.title}</div>
                            })}
                            {state==="search"&&(
                                <div className="components">
                                    <input type="text" className="input_text" onChange={(e)=>{
                                        const items=data.filter((data)=>{
                                            if(data.title.toLowerCase().includes(e.target.value))
                                                return data;
                                            
                                        });
                                        setItem(items)
                                        
                                    }}/>
                                    {item&&item.map((value,index)=>{
                                        return <div className="text">{value.title}</div>
                                    })}
                                </div>
                            )}
                        </div>
                    )}
        </div>
    );
}


export default Films;