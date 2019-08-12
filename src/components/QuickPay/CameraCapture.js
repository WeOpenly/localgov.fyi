import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import styles from "./spectre.min.module.css"
import inputStyles from './inputfile.module.css';
import iconStyles from './typicons.min.module.css';
import { graphql, StaticQuery } from 'gatsby';
import Img from "gatsby-image";
import { uploadDocumentAndCreateSubmission } from './actions'
import { stepChange } from './actions'
import { trackQPevent } from '../common/tracking';
import Camera, { FACING_MODES, IMAGE_TYPES } from '../external/ReactHTMLCamera/index';
import 'react-html5-camera-photo/build/css/index.css';


class CameraCapture extends React.Component {
    constructor(props) {
        super(props);
        this.onTakePhoto = this.onTakePhoto.bind(this);
    }

    onTakePhoto(dataUri){
       this.props.onPhotoTaken(dataUri);
    }

    componentDidMount() {
        const { anonUserID } = this.props;
        this.props.trackEvent('final_confirmation_page', anonUserID, {})
    }


    render() {
   
        return (<div className={`${styles.modal} ${styles.active}  ${styles.modalLg}`} style={{ backgroundColor: '#000' }}>
            <a href="#close" className={styles.modalOverlay} aria-label="Close"></a>
            <div className={`${styles.modalContainer}`} style={{height: '100%', maxHeight: '100vh', padding: '0px'}}>
                <Camera
                    cancelCamera={this.props.cancelCamera}
                    idealFacingMode={FACING_MODES.ENVIRONMENT}
                    imageType={IMAGE_TYPES.JPG}
                    imageCompression={0.7}
                    isMaxResolution={false}
                    isImageMirror={false}
                    onCameraError={this.props.onCameraError}
                    isSilentMode={true}
                    isDisplayStartCameraError={true}
                    isFullscreen={false}
                    sizeFactor={1}
                    onTakePhoto={(dataUri) => { this.onTakePhoto(dataUri); }}
                />
            </div>
        </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        trackEvent: (ev, id, data) => {
            dispatch(trackQPevent(ev, id, data));
        }
    }
}


const mapStateToProps = function (state, ownProps) {
    return {
        ...state.quickPay
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CameraCapture);