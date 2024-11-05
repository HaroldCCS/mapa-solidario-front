import React, { useEffect, useRef, useState } from 'react';

import { Map, View } from 'ol';
import { Tile, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Point } from 'ol/geom';
import Feature from 'ol/Feature';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Style, Icon } from 'ol/style';

import styles from './index.module.scss';
import InterfaceEvent from 'store/app/event/event.redux';
import Select from 'ol/interaction/Select';
import { click } from 'ol/events/condition';

const ListMapComponent = (props: { events: InterfaceEvent[], setEventData: (e: InterfaceEvent) => void, eventSelected?: InterfaceEvent }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapObj = useRef<Map>(new Map({
    view: new View({
      center: [-8250000, 520000], // Centro inicial del mapa
      zoom: 10,
    }),
    layers: [
      new Tile({ source: new OSM() }),
    ],
  }));

  const createMap = () => {
    if (!mapRef.current) return;
    mapObj.current?.setTarget(mapRef.current);
    mapObj.current?.on('click', (event) => {
      const coordinates = toLonLat(event.coordinate);
      console.log('coordinates', coordinates)
    });
  };

  const addPoint = (event: InterfaceEvent) => {
      if (!event?.location) return;
      const coordinates = new Point(fromLonLat(event?.location));

    const pointFeature = new Feature({ geometry: coordinates });
    pointFeature.setStyle(
      new Style({
        image: new Icon({
          src: 'https://openlayers.org/en/v6.5.0/examples/data/icon.png',
          scale: 1,
        }),
      })
    );

    const vectorSource = new VectorSource({ features: [pointFeature] });
    const vectorLayer = new VectorLayer({ source: vectorSource });
    mapObj.current?.addLayer(vectorLayer);

    const selectInteraction = new Select({
      condition: click,
      layers: [vectorLayer]
    });

    mapObj.current?.addInteraction(selectInteraction);

    selectInteraction.on('select', (e) => {
      if (e.selected.length > 0) props.setEventData(event)
    });
  };

  useEffect(() => {
    createMap();
    return () => mapObj.current?.setTarget('');
  }, []);

  useEffect(() => {
    // Mueve el centro del mapa a las nuevas coordenadas
    console.log('props.eventSelected?.location', props.eventSelected?.location)
    // props.eventSelected?.location && mapObj.current.getView().setCenter(props.eventSelected?.location);
  }, [props.eventSelected]);

  useEffect(() => {
    if (!props.events) return;

    //Eliminar los puntos anteriores
    mapObj.current?.getLayers().getArray()?.map((_d: any) => _d instanceof VectorLayer && mapObj.current?.removeLayer(_d))

    for (const event of props.events) {
      if (!event?.status) continue;
      addPoint(event);
    }
  }, [props.events]);

  return (
    <div className={styles.map_container} ref={mapRef} />
  );
};

export default ListMapComponent;
