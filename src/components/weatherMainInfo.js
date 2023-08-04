import '../styles/weatherApp.css'
export default function WeatherMainInfo ({weather, icon}){

    let coord = weather?.coord

    return (
        <div>
        <div className='container'>
            <div className='divData'>
            
            <div className='containerInfo'>

            <div className='divIcon'>
                <img src={icon?.url} width='70' alt='icon'></img>
                {weather?.weather[0]?.description}
            </div>

            <div className='containerTitle'>
                <div><div className='city'>{weather?.name}</div><div className='country'>{weather?.sys?.country}</div></div>
               
            </div>
            </div>
            </div>
            <div className='containerTemp'>
                <div className='temp'>
                <div><div className='tempDescription'>{weather?.main?.temp}°</div> 
                <div className='divMaxMin'>
                    <div><div>Max</div><div className='tempMaxMin'>{weather?.main?.temp_max}°</div></div>
                    <div><div>Min</div><div className='tempMaxMin'>{weather?.main?.temp_min}°</div></div> 
                </div>
                </div>
                </div>
            </div>
        </div>
        <div className='divMapa'>
           <iframe src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1673728.8458471673!2d${coord?.lon}!3d${coord?.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1668653350398!5m2!1ses-419!2sar`}width="300" height="150" style={{ border:0 }} title="map" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        </div>
    )
}