import React from 'react'
import Header from '../../components/header/header.component';
import Sidebar from '../../components/sidebar/sidebar.component';

import styles from './index.module.scss'

function StaffLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <Header />
      </header>

      <main className={styles.main}>
        <Sidebar />
        <div className={styles['main-body']}>
          {props.children}
        </div>
      </main>

      <footer>
      </footer>
    </>
  );
}

export default StaffLayout;