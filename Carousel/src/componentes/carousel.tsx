import React, { FC , useState} from 'react';
import './styles.css'

const perretes:string[]=[
    "url(https://www.hillspet.com.mx/content/dam/cp-sites/hills/hills-pet/es_mx/skyword/golden-retriever-puppy-running-in-field-SW.jpg)",
    "url(https://www.hola.com/imagenes/estar-bien/20200514167993/perros-como-ensenar-cachorro-pipi/0-823-921/pis-cachorro-t.jpg)",
    "url(https://www.perrospedia.com/wp-content/uploads/2013/12/image57.jpg)",
    "url(https://www.zooplus.es/magazine/wp-content/uploads/2020/01/escuela-para-cachorros-1-1024x683.jpeg)",
    "url(https://cdn.nutricionistadeperros.com/wp-content/uploads/2012/01/perro-cachorro.jpg)",    
    "url(https://comoeducarauncachorro.com/blog/wp-content/uploads/p-2-805x452.jpg)",
]

const Carousel=(): JSX.Element=>{
    const [img,setImage]=useState<string>("");
    const [ind,setInd]= useState(0);
   
    
    return( 
        
        <div className="head">
             Perretes 
            <div className="screen">
                <div className="selected" style={{backgroundImage:img}}></div>
            </div>
        <div className="body">
            <div className="carousel">
            <div className="slide"style={{transform:`translate3d(${-ind*100}%,0px,0px)`}}>
               
                {perretes.map((image,index)=>{
                    
                    return (<div 
                    className="imagen" 
                   /* key{image.index}*/
                    key={index} 
                    /*current={{backgroundImage:image}}*/
                    style={{backgroundImage:image}}
                    onClick={()=>{
                        console.log(window.screen.height);
                        setImage(perretes[index]);
                    }}
                
                ></div>);
                })}
            </div>
            <div className="button">
                {perretes.map((_,index)=>{
                    return (<div 
                        /* key{button.index}*/
                        key={index} 
                        className={`buttons${ind===index ? " on":""}`}
                        onClick={()=>{ setInd(index);}}
                        
                        ></div>);
                })}
            </div>
          </div>
        </div>

       {
       /* <footer>
       <div class="next_prev">
            <h3><button onclick="findPrev()">Prev</button></h3>
            <h3><button onclick="findNext()">Next</button></h3>
        </div>
        </footer>
            */}
        </div>
        
    );

}

export default Carousel;