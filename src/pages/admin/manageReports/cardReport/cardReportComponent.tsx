import React from 'react'
import './index.scss'
import LoaderGoogleComponent from '../../../../components/loaders/loaderV2/loaderGoogle.component';

const CardReportComponent = (props: {
  onClick?: () => void,
  title?: string
  description?: string
  loading?: boolean
}) => {
  return (
    <div className="card-report playing" onClick={props.onClick}>
      <div className="image"></div>

      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>

      <div className="infotop">
        {
          props?.loading
            ?
            <LoaderGoogleComponent />
            : <>
              {props?.title}
              <div className="name">
                {props?.description}
              </div>
            </>
        }
      </div>
    </div>
  )
}

export default CardReportComponent