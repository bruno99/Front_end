import React, {useState, FC} from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { gql, useQuery } from "@apollo/client"
import './info.css'
const City = gql`
  query getCity($name :String!){
      cities(where: {name: {eq: $name}}) {
        name
        population
        country {
          name
        }
        timeZone {
          name
        }
      }
  }
`
interface CityProps{
  name: string,
  changeFilter: Function,

}

interface ICity{
  cities: Array<{
    name: string,
    population: number,
    country: {
      name:string
    }
    timeZone: {
      name:string
    }
  }>
}
interface WeatherAPI {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface Clouds {
  all: number;
}

interface Coord {
  lon: number;
  lat: number;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Wind {
  speed: number;
  deg: number;
}



const InfoCity: FC<CityProps> = (props) => {
  const { data, loading, error } = useQuery<ICity>(City, { variables: { name: props.name } })
  const [index, setIndex] = useState<number>(-1);
  const [dataWeather, setData] = useState<WeatherAPI>();
  useEffect(() => {
    if (index !== -1) {
      axios.get("https://api.openweathermap.org/data/2.5/weather?lat=" + data?.cities[index].location.lat + "&lon=" + data?.cities[index].location.long + "&appid=" + process.env.REACT_APP_KEY).then((results) => {
        setData(results.data);
        console.log(results.data);

      })
    }

  }, [index]);
  console.log(data);

  return (
    <div className="container_global">
      {error && <div>{error.message}</div>}
      {data && data.cities.map((city, index_city) => {
        if (index === index_city) {
          return (
            <div className="container_info" >
              <div className="name no" onClick={() => {
                setIndex(index)
              }}>{city.name}</div>
              <div className="args country" onClick={() => {
                props.changeFilter(city.country.name, true)
              }}>Country: {city.country.name}</div>
              <div className="args">Population: {city.population}</div>
              {city.timeZone && <div className="args">TimeZone: {city.timeZone.name}</div>}
            </div>
          )
        } else {
          return (
            <div className="container_info" >
              <div className="name" onClick={() => {
                setIndex(index_city)
              }}>{city.name}</div>
            </div>
          )
        }
      })}

      {index !== -1 &&
        <div className="popup">
          <div className="close" onClick={() => setIndex(-1)}>X</div>
          <div className="datas">
            <div className="flag">
  
              <img src={"https://www.countryflags.io/" + data?.cities[index].country.alpha2Code + "/flat/64.png"}></img>

            </div>
          <div className="data country" onClick={
            () => {
              props.changeFilter(data?.cities[index].country.name,true);
            }
            }>Country: {data?.cities[index].country.name}</div>
            <div className="data">Population: {data?.cities[index].population} </div>
            {data?.cities[index].timeZone && <div className="data">Time zone: {data.cities[index].timeZone.name}</div>}
            {dataWeather &&
            <div>
                <br />
                <div className="data">Description: {dataWeather.weather[0].description}</div>
                <div className="data">Time: {(dataWeather.main.temp)}ºC</div>
              </div>
            }
          </div>
        </div>

      }
    </div>
  )
}


export default InfoCity;