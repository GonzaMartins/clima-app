import {useState} from 'react'
import '../styles/weatherApp.css'

export default function WeatherForm ({onChangeCity}){

    const [city, setCity] = useState('Buenos Aires')

    const onChange = (e) =>{
        const value = e.target.value

        value !== '' && setCity(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        onChangeCity(city)

        return city

    }

    return (<form onSubmit={handleSubmit} className='formContainer'>
                <input type='text' placeholder='Busque una ubicacion' onChange={onChange} className='input'></input>
            </form>)
}