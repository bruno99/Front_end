import React, {useState} from 'react';
import { ApolloProvider } from '@apollo/client/react';
import './App.css';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import InputText from './components/inputs/input'
import InfoCity from './components/info/info'
import InfoCountry from './components/info/infoCountry'


const client = new ApolloClient({
  uri: process.env.REACT_APP_URL,
  cache: new InMemoryCache()
})


function App() {
  
  const [searchName, setName] = useState<string>("")
  const [type, setType] = useState<boolean>(false);

  const setAll = (name: string, isCountry: boolean) => {
    setName(name);
    setType(isCountry)
  }
  console.log(searchName + " " + type);
  
  return (
    <ApolloProvider client={client}>
      {searchName === "" &&
        <InputText changeFilter={setAll}/>
      }

      {searchName !== "" &&
        <div>
          <div className="main" onClick={() => {
            setName("")
            setType(false)
            }}>
              <div className="new"></div>
              <div>New search</div>
          </div>
        {!type &&
          <InfoCity name={searchName} changeFilter={setAll}/>
        }
        {type &&
          <InfoCountry name={searchName} changeFilter={setAll}/>
        }

        </div>
        
        
      }
    </ApolloProvider>
  );
}

export default App;
