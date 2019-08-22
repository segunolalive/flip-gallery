import * as React from 'react';
import { Iimage } from '../interfaces';

export default function Image({
  src,
  alt = '',
  ...props
}): React.FunctionComponentElement<Iimage> {
  return (
    <>
      <img src={src} alt={alt} {...props} />
      <style jsx>{`
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: inherit;
          background-color: #eeeeee;
        }
      `}</style>
    </>
  );
}
