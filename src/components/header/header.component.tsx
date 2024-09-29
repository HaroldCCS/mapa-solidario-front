
import React, { memo } from 'react'
import style from './index.module.scss'

function HeaderComponent() {

  return (
    <div className={style.header}></div>
  );
}

export default memo(HeaderComponent);
