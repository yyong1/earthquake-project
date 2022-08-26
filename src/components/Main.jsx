import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Map, Placemark, YMaps } from 'react-yandex-maps';
import Details from './Details';

export function Portal({ children, getHTMLElementId }) {
  // находим искомый HTML по id
  const mount = document.getElementById('root');
  // создаём свой div
  const el = document.createElement('div');

  useEffect(() => {
    // добавляем свой див к искомому элементу
    if (mount) mount.appendChild(el);
    return () => {
      // удаляем элемент от искомого при завершении компоненты
      if (mount) mount.removeChild(el);
    };
  }, [el, mount]);

  // отменяем отрисовку при отсутствии искомого элемента
  if (!mount) return null;
  // собственно, пририсовываем React-элемент в div к искомому HTML
  return createPortal(children, el);
}
function Main(props) {
  const [activePortal, setActivePortal] = useState(false);
  const [earthqakeState, setEarthqakeState] = useState([]);

  useEffect(() => {
    fetch('/api/earthqakes')
      .then((res) => res.json())
      .then((data) => setEarthqakeState(data));
  }, []);

  function genRC() {
    const r = Math.round((Math.random() * 255)); // red 0 to 255
    const g = Math.round((Math.random() * 255)); // green 0 to 255
    const b = Math.round((Math.random() * 255)); // blue 0 to 255
    return `rgb(${r}, ${g}, ${b})`;
  }

  return (
    <YMaps className="map-container" version="2.1.79">
      <div>
        <h1>Последние землятрясения в мире</h1>
        <Map style={{ width: '700px', height: '700px' }} defaultState={{ center: [0, 0], zoom: 2 }} modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}>
          {earthqakeState.map((push) => (
            <Placemark
              key={push.id}
              geometry={[push.latitude, push.longitude]}
              options={
                  {
                    preset: 'islands#circleIcon', // список темплейтов на сайте яндекса
                    iconColor: genRC(), // цвет иконки, можно также задавать в hex
                  }
                }
              properties={
                  {
                    iconContent: push.magnitude, // пару символов помещается
                    hintContent: `<b>${push.location}</b>`,
                    // создаём пустой элемент с заданными размерами
                    balloonContent: `<div id="earthqueke-deth" class="earthqueke"><a href="/details/${push.id}"><span>Глубина землетрясения - ${push.depth} км</span></a></div>`,
                  }
                }
              onClick={() => {
                // ставим в очередь промисов, чтобы сработало после отрисовки балуна
                setTimeout(() => { setActivePortal(true); }, 0);
              }}
            />
          ))}
        </Map>
        {
            activePortal && (
              <Portal getHTMLElementId="driver-2">
                <Details />
              </Portal>
            )
          }

      </div>
    </YMaps>
  );
}

export default Main;
