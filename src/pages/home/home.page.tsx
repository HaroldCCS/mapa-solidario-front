import React from 'react'
import { Fade } from 'react-awesome-reveal'

import HeaderTurnBackComponent from 'components/header_turn_back/header_turn_back.component';

import styles from './index.module.scss';

const HomePage: React.FC = () => {
    return (
        <div className={styles.main}>

            {/* start Titulo */}
            <HeaderTurnBackComponent title="Bienvenido" />
            {/* end Titulo */}


            {/* start Acciones crear ingresar */}
            <div className='d-flex justify-content-evenly flex-wrap gap-3 mb-5'>

            </div>
        </div>
    )
}

export default HomePage
