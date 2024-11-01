import React, { useEffect, useRef, useState } from 'react';

import { Map, View } from 'ol';
import { Tile, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Point } from 'ol/geom';
import Feature from 'ol/Feature';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Style, Icon } from 'ol/style';

import styles from './index.module.scss';

const MiniMapComponent = (props: { location?: number[], setLocation?: (location: number[]) => void, disableOnclick?: boolean }) => {
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
    if (props.disableOnclick || !props?.setLocation) return;
  
    mapObj.current?.on('click', (event) => {
      const coordinates = toLonLat(event.coordinate);
      props?.setLocation && props.setLocation(coordinates);
    });
  };

  const addPoint = (location: number[]) => {
    const coordinates = new Point(fromLonLat(location));
    
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

    // const selectInteraction = new Select({
    //   condition: click,
    //   layers: [vectorLayer]
    // });

    // mapObj.current?.addInteraction(selectInteraction);
  };

  useEffect(() => {
    createMap();
    return () => mapObj.current?.setTarget('');
  }, []);

  useEffect(() => {
    if (!props.location) return;

    if (props.disableOnclick) {
      addPoint(props.location);
      return;
    }

    //Eliminar los puntos anteriores
    mapObj.current?.getLayers().getArray()?.map((_d: any) => _d instanceof VectorLayer && mapObj.current?.removeLayer(_d))
    addPoint(props.location);
  }, [props.location]);

  return (
      <div className={styles.map_container} ref={mapRef} />
  );
};

export default MiniMapComponent;
