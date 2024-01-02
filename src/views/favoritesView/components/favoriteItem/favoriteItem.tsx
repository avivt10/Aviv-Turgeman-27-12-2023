import React, { useEffect, useState } from "react";
import StarIcon from "../../../../assets/icons/starIcon";
import style from "./favoriteItem.module.css";
import axios from "axios";
import { onDeleteFavorite } from "../../../../redux/features/favoriteSlice";
import { useDispatch } from "react-redux";
import { FavoritesItemProps } from "./models/favoritesItemProps";
import getWeatherIconByNumber from "../../../weatherView/components/fullForecast/functions/getWeatherForecastIconByNumber";
import { toast } from "react-toastify";
import  { onChangeCurrentCity } from "../../../../redux/features/citySlice";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../redux/hooks";

const FavoriteItem = ({ favorite }: FavoritesItemProps) => {
  const [temperatureValue, setTemperatureValue] = useState(0);
  const [temperatureUnit, setTemperatureUnit] = useState("");
  const [weatherIcon, setWeatherIcon] = useState<number>(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentCity = useAppSelector(state => state.citySlice.currentCity)
  useEffect(() => {
    const getCurrentConditions = async () => {
      try{
        const { data } = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${favorite.key}?apikey=${import.meta.env.VITE_APIKEY}`);
        setTemperatureValue(data[0].Temperature.Metric.Value);
        setTemperatureUnit(data[0].Temperature.Metric.Unit);
        setWeatherIcon(data[0].WeatherIcon)
      }catch(err){
        toast(err as string)
      }
    }
    getCurrentConditions();
  }, []);

  const removeCityFromFavorites = (key: string) => {
    dispatch(onDeleteFavorite({ Key: key }));
  };

  const chooseCurrentCity = () => {
    dispatch(onChangeCurrentCity({
      currentCity:{
        city: favorite.cityName,
        country: favorite.countryName,
        key: favorite.key 
      }
    }))
    navigate("/")
  };


  return (
    <div className={style.favoriteWrapper}>
      {temperatureValue ? (
        <React.Fragment>
          <div
            className={style.starIconStyle}
            onClick={() => removeCityFromFavorites(favorite.key)}
          >
            <StarIcon color="#ffdd00" />
          </div>
          <div className={style.favoriteCard} onClick={()=> chooseCurrentCity()}>
            <h3 className="mt-4">{favorite.cityName}</h3>
            <img src={`/src/assets/weather-icons/${getWeatherIconByNumber(weatherIcon)}`} className={style.favoriteIcon} alt={`${weatherIcon}`} />
            <h4 className={style.temperatureStyle}>
              {temperatureValue}°{temperatureUnit}
            </h4>
          </div>
        </React.Fragment>
      ) : (
        <div className={style.favoriteLoading}>Loading ...</div>
      )}
    </div>
  );
};

export default FavoriteItem;
