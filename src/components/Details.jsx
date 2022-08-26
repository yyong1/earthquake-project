import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';
import { Map, Placemark, YMaps } from 'react-yandex-maps';

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
  if (!detailState[0].id.length) return null;
  console.log('xxx', detailState);
  return (
    <div>
      <YMaps className="map-container" version="2.1.79">
        <div>
          <h1>Подробности о землетрясении</h1>
          <Map style={{ width: '700px', height: '700px' }} defaultState={{ center: [detailState[0].latitude, detailState[0].longitude], zoom: 2 }} modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}>

            <Placemark
              key={detailState[0].id}
              geometry={{
                type: 'Circle',
                coordinates: [[detailState[0].latitude, detailState[0].latitude], 1000],
              }}
            //   key={detailState.id}
            //   geometry={[detailState[0].latitude, detailState[0].longitude]}
              options={
                  {
                    preset: 'islands#circleIcon', // список темплейтов на сайте яндекса
                    // iconColor: genRC(), // цвет иконки, можно также задавать в hex
                  }
                }
              properties={
                  {
                    iconContent: detailState.magnitude, // пару символов помещается
                    hintContent: `<b>${detailState.location}</b>`,
                    // создаём пустой элемент с заданными размерами
                    balloonContent: `<div id="earthqueke-deth" class="earthqueke"><span>Глубина землетрясения - ${detailState.depth}</span></div>`,
                  }
                }
            />

          </Map>
        </div>
      </YMaps>
    </div>
  );
}

export default Details;
