// import  { useState, forwardRef  } from 'react';
// import comicPlaceholder from '../assets/comic-placeholder.jpg';

// // function ImageWithPlaceholder({ highResImageSrc, alt, ref = null}) {
//   const ImageWithPlaceholder = forwardRef(({ highResImageSrc, alt }, ref) => {
//     const lowResImageSrc = comicPlaceholder
//   const [src, setSrc] = useState(lowResImageSrc);

//   return (
//     <img
//       src={src}
//       alt={alt}
//       onLoad={() => setSrc(highResImageSrc)} // Cambia la imagen cuando la de alta resolución cargue
//       onError={(e) => {
//         if (src !== lowResImageSrc) {
//           setSrc(lowResImageSrc); // Si hay un error cargando la de alta, vuelve a la de baja resolución
//         }
//       }}
//       ref={ref}
//       // style={{
//       //   height: '17rem',
//       //   width: '13rem',
//       //   cursor: 'pointer'
//       //   // width: '100%', // Asegúrate de ajustar el estilo como sea necesario
//       //   // height: 'auto'
//       // }}
//     />
//   );
// }
//   );
// export default ImageWithPlaceholder;

import { useState, forwardRef } from 'react';
import comicPlaceholder from '../assets/comic-placeholder.jpg';

// Use forwardRef to pass the ref down to the img tag
// eslint-disable-next-line react/display-name
const ImageWithPlaceholder = forwardRef(({ highResImageSrc, alt }, ref) => {
  const lowResImageSrc = comicPlaceholder;
  const [src, setSrc] = useState(lowResImageSrc);
  
  return (
    <img
      ref={ref} // Attach the forwarded ref to the img tag
      src={src}
      alt={alt}
      onLoad={() => setSrc(highResImageSrc)}
      onError={() => {
        if (src !== lowResImageSrc) {
          setSrc(lowResImageSrc);
        }
      }}
    />
  );
});

export default ImageWithPlaceholder;