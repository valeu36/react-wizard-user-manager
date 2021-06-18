import { useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { ICONS } from '../../constants';

import IconButton from '../buttons/IconButton';

import InputContainer from '../inputs/InputContainer';
import CropModal from './CropModal';

import styles from './styles.module.scss';

export function ImageUploader({
  label,
  onChange,
  className,
  field,
  form: { errors, setFieldValue, setFieldTouched },
  ...props
}) {
  const [image, setImage] = useState();

  const [isCropperVisible, setIsCropperVisible] = useState(false);

  const fileInputEl = useRef();
  const { name } = field;

  function onFileChangePopup() {
    const { current } = fileInputEl;
    if (current && current.click()) {
      current.click();
    }
  }

  async function toBase64(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  }

  const onFileChange = useCallback(
    (event) => {
      const [firstFile] = event.target.files;
      const reader = new FileReader();

      reader.onloadend = () => {
        toBase64(firstFile).then((img) => setImage(img));
        setFieldValue(name, firstFile);
        setFieldTouched(name, true, true);
        setIsCropperVisible(true);
      };

      reader.readAsDataURL(firstFile);
    },
    [name, setFieldTouched, setFieldValue],
  );

  const updateCroppedImageFile = useCallback(
    (file) => {
      if (errors[name]) {
        setIsCropperVisible(false);
        return;
      }
      setFieldValue(name, file);
      setIsCropperVisible(false);
      onChange(file);
    },
    [errors, name, onChange, setFieldValue],
  );

  return (
    <InputContainer className={className} field={field}>
      <input
        {...field}
        {...props}
        type="file"
        name={field.name}
        className={styles.input}
        onChange={onFileChange}
        ref={fileInputEl}
        accept=".jpg,.jpeg,.png,gif,.svg"
        value=""
      />
      <IconButton
        type="button"
        icon={ICONS.add}
        onClick={onFileChangePopup}
        className={styles.addButton}
      >
        {label}
      </IconButton>
      <CropModal
        image={image}
        updateImageFile={updateCroppedImageFile}
        isVisible={isCropperVisible}
      />
    </InputContainer>
  );
}

ImageUploader.prototype.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  className: PropTypes.string,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
  }).isRequired,
  form: PropTypes.shape({
    errors: PropTypes.object,
    setFieldValue: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
  }).isRequired,
};

ImageUploader.defaultProps = {
  name: '',
  onChange: () => {},
  label: 'Add Avatar',
  className: '',
};

export default ImageUploader;
