import React, { useCallback, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';

import FlatButton from '../../buttons/FlatButton';

import styles from './styles.module.scss';

const CropModal = ({ updateImageFile, image, isVisible }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixelsState, setCroppedAreaPixelsState] = useState({
    width: 1,
    height: 1,
  });
  const { x, y, width: cropWidth, height: cropHeight } = croppedAreaPixelsState;

  const canvasRef = useRef(null);
  const ctx = canvasRef.current ? canvasRef.current.getContext('2d') : null;

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixelsState(croppedAreaPixels);
  }, []);

  const getCroppedImage = useCallback(() => {
    const {
      current: { width, height },
    } = canvasRef;

    const img = new Image();
    img.src = image;

    ctx.clearRect(0, 0, width || 0, height || 0);
    ctx.drawImage(img, x, y, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

    return canvasRef.current.toDataURL('image/jpeg');
  }, [image, ctx, x, y, cropWidth, cropHeight]);

  const onCropSubmit = useCallback(() => {
    const croppedImg = getCroppedImage();
    updateImageFile(croppedImg);
  }, [getCroppedImage, updateImageFile]);

  return (
    <div className={`${styles.cropWrapper} ${isVisible ? styles.cropWrapperVisible : ''}`}>
      <div className={styles.buttonWrapper}>
        <FlatButton type="button" onClick={onCropSubmit} title="Crop" />
      </div>
      <canvas ref={canvasRef} width={cropWidth} height={cropHeight} />
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        aspect={1}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        cropShape="round"
      />
    </div>
  );
};

export default CropModal;
