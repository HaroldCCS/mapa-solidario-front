import React from 'react'
import Header from '../../components/header/header.component';

import styles from './index.module.scss'

function AnonymousLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <Header />
      </header>

      <main className={styles.main}>
        <div className={styles['main-body']}>
          {props.children}
        </div>
      </main>

      <footer>
      </footer>
    </>
  );
}

export default AnonymousLayout;