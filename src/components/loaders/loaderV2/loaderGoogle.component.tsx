import React from 'react';

import styles from './index.module.scss';

function LoaderGoogleComponent() {

  return (<div className={styles.wrapper}>
    <div className={styles.blue}></div>
    <div className={styles.red}></div>
    <div className={styles.yellow}></div>
    <div className={styles.green}></div>
  </div>);
}

export default LoaderGoogleComponent;
