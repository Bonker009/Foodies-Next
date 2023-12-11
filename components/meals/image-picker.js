'use client';
import { useRef, useState } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker({ label, name }) {
  const [pickImage, setPickImage] = useState();
  const imageInput = useRef();

  const handlePickClick = () => {
    imageInput.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Fix: 'files' instead of 'file'
    if (!file) {
      setPickImage(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {pickImage ? (
            <Image src={pickImage} alt='The image selected by the user' fill />
          ) : (
            <p>No Image picked yet</p>
          )}
        </div>
        <input
          className={classes.input}
          type='file'
          id='image'
          accept='image/png, image/jpeg'
          name='image'
          ref={imageInput}
          onChange={handleImageChange}
          required
        />

        <button
          className={classes.button}
          type='button'
          onClick={handlePickClick}
        >
          Pick an image
        </button>
      </div>
    </div>
  );
}
