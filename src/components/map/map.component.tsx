import React, { useEffect, useRef, useState } from 'react';

import { FiPlusCircle } from 'react-icons/fi';

import { Map, View } from 'ol';
import { Tile, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Point } from 'ol/geom';
import Feature from 'ol/Feature';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Style, Icon } from 'ol/style';
import { click } from 'ol/events/condition';
import Select from 'ol/interaction/Select';

import styles from './index.module.scss';
import useHeadquarters from '../../hooks/useHeadquarters.hook';
import { Interface } from 'store/app/headquarter';
import HeadquarterCreateComponent from 'modules/manageHeadquarters/create/headquarter.create.component';
import { Alert, Button, Card } from 'react-bootstrap';
import { Fade } from 'react-awesome-reveal';
import usePermissions from 'hooks/usePermissions.hook';
import { PERMISSIONS } from 'resources/permissions-constants';

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  let mapObj: Map;
  const { headquarters } = useHeadquarters();
  const { hasPermission } = usePermissions()

  const createMap = () => {
    if (!mapRef.current) return;
    mapObj = new Map({
      view: new View({
        center: [-8250000, 520000], // Centro inicial del mapa
        zoom: 10,
      }),
      layers: [
        new Tile({ source: new OSM() }),
      ],
    });
    mapObj.setTarget(mapRef.current);
  };

  const addPoint = (headquarter: Interface) => {
    const coordinates = new Point(fromLonLat(headquarter?.location));
    
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
    mapObj.addLayer(vectorLayer);

    const selectInteraction = new Select({
      condition: click,
      layers: [vectorLayer]
    });

    mapObj.addInteraction(selectInteraction);

    selectInteraction.on('select', (e) => {
      if (e.selected.length > 0) setShowModel(headquarter)
    });
  };

  useEffect(() => {
    createMap();
    if (!mapObj) return;

    mapObj.on('click', (event) => {
      const coordinates = toLonLat(event.coordinate);
      setLastLocation(coordinates);
    });
    if (!printHeadquarters()) {
      setTimeout(() => printHeadquarters(), 2000);
    }
    
    return () => mapObj.setTarget('');
  }, []);


  const printHeadquarters = () => {
    if (headquarters?.length && mapObj) {
      headquarters.forEach(headquarter => addPoint(headquarter));
      return true;
    }
    return false;
  }

  useEffect(() => {
    printHeadquarters();
  }, [headquarters]);

  const [show, setShow] = useState<boolean>(false);
  const [showModel, setShowModel] = useState<Partial<Interface>>({});
  const [onSelectLocaltion, setOnSelectLocaltion] = useState<boolean>(false);

  const [modelData, setModelData] = useState<Partial<Interface>>({});
  const [lastLocation, setLastLocation] = useState<number[]>();

  useEffect(() => {
    if (onSelectLocaltion && lastLocation && lastLocation[0] !== 0) {
      setOnSelectLocaltion(false);
      setModelData({ location: lastLocation });
      setShow(true);
    }
  }, [lastLocation]);

  return (
    <>
      <div className={styles.map_container} ref={mapRef} />
      {hasPermission(PERMISSIONS.MANAGE_HEADQUARTERS) && <div className={styles.add_headquarter} onClick={() => { setLastLocation([0, 0]); setOnSelectLocaltion(true); setShowModel({}); }}>
        <FiPlusCircle />
      </div>}

      {onSelectLocaltion ?
        <Fade direction='up' duration={1000}>
          <Alert variant="success" className={styles.alert}>
            <Alert.Heading>Seleciona las coordenadas del centro de ayuda</Alert.Heading>
            <p>
              Para continuar con la creación de un nuevo centro de ayuda,
              debes dar clic en el mapa donde se encuentra la ubicación <Card.Link onClick={() => setOnSelectLocaltion(false)}>Cancelar</Card.Link>
            </p>
          </Alert>
        </Fade>
        : null
      }

      {hasPermission(PERMISSIONS.MANAGE_HEADQUARTERS) && <HeadquarterCreateComponent modelData={modelData} setShow={setShow} show={show} />}

      {showModel?.name ? <Card className={styles.card}>
        <Card.Body >
          <Card.Title>Información de la sede</Card.Title>
          <Card.Text>
            {showModel?.name}
            <br />
            {showModel?.description}
            <br />
            <br />
            <div className='d-flex justify-content-between'>
              {hasPermission(PERMISSIONS.MANAGE_HEADQUARTERS) && <>
                <Button variant="primary" size='sm' onClick={() => {
                  setModelData(showModel)
                  setShow(true);
                }}>Editar</Button>
                <Button variant="primary" size='sm' onClick={() => {
                  setModelData(showModel)
                  setShow(true);
                }}>Eliminar</Button>
              </>}
            </div>

          </Card.Text>
        </Card.Body>
      </Card> : null}
    </>
  );
};

export default MapComponent;
