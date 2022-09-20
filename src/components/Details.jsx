import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Circle, Map, YMaps,
} from 'react-yandex-maps';

function Details(props) {
  const { id } = useParams();
  const [detailState, setDetailState] = useState([{ id: '' }]);
  useEffect(() => {
    fetch(`/api/details/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDetailState(data);
      });
  }, []);
  if (!detailState[0]?.id.length) return null;

  return (
    <div>
      <YMaps className="map-container" version="2.1.79">
        <div>
          <h1>Подробности о землетрясении</h1>
          <Map style={{ width: '700px', height: '700px' }} defaultState={{ center: [detailState[0].latitude, detailState[0].longitude], zoom: 6 }} modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}>
            <Circle
              geometry={
                [[detailState[0].latitude, detailState[0].longitude],
                  +detailState[0].magnitude * 330000]
                }
            />
            <Circle
              geometry={
                [[detailState[0].latitude, detailState[0].longitude],
                  +detailState[0].magnitude * 33000]
                }
            />
            <Circle
              geometry={
                [[detailState[0].latitude, detailState[0].longitude],
                  +detailState[0].magnitude * 3300]
                }
              options={{
                fillColor: 'FF0000FF',
              }}
            />
          </Map>
        </div>
      </YMaps>
    </div>
  );
}

export default Details;
