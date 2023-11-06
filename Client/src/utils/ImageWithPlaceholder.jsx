import  { useState } from 'react';
import comicPlaceholder from '../assets/comic-placeholder.jpg';

function ImageWithPlaceholder({ highResImageSrc, alt }) {
    const lowResImageSrc = comicPlaceholder
  const [src, setSrc] = useState(lowResImageSrc);

  return (
    <img
      src={src}
      alt={alt}
      onLoad={() => setSrc(highResImageSrc)} // Cambia la imagen cuando la de alta resolución cargue
      onError={(e) => {
        if (src !== lowResImageSrc) {
          setSrc(lowResImageSrc); // Si hay un error cargando la de alta, vuelve a la de baja resolución
        }
      }}
      style={{
        height: '17rem',
        width: '13rem',
        cursor: 'pointer'
        // width: '100%', // Asegúrate de ajustar el estilo como sea necesario
        // height: 'auto'
      }}
    />
  );
}

export default ImageWithPlaceholder;
