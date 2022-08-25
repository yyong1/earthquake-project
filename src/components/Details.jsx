import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Map, Placemark, YMaps } from 'react-yandex-maps';

function Details(props) {
  return (
    <div>
      {/* <YMaps className="map-container" version="2.1.79">
        <div>
          <h1>Подробности о землетрясении</h1>
          <Map style={{ width: '700px', height: '700px' }} defaultState={{ center: [0, 0], zoom: 2 }} modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}>
            {earthqakeState.map((push) => (
              <Placemark
                key={push.id}
                geometry={{
                  type: 'Circle',
                  coordinates: [[push.latitude], [push.longitude]],
                }}
                options={
                  {
                    preset: 'islands#circleIcon', // список темплейтов на сайте яндекса
                    // iconColor: genRC(), // цвет иконки, можно также задавать в hex
                  }
                }
                properties={
                  {
                    iconContent: push.magnitude, // пару символов помещается
                    hintContent: `<b>${push.location}</b>`,
                    // создаём пустой элемент с заданными размерами
                    balloonContent: `<div id="earthqueke-deth" class="earthqueke"><span>Глубина землетрясения - ${push.depth}</span></div>`,
                  }
                }
                onClick={() => {
                // ставим в очередь промисов, чтобы сработало после отрисовки балуна
                  setTimeout(() => { setActivePortal(true); }, 0);
                }}
              />
            ))}
          </Map>
        </div>
      </YMaps> */}
    </div>
  );
}

export default Details;
