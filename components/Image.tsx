import * as React from 'react';
import { Iimage } from '../interefaces';

export default function Image({
  src,
  alt = ''
}): React.FunctionComponentElement<Iimage> {
  return (
    <>
      <img src={src} alt={alt} />
      <style jsx>{`
        img {
          width: 100%;
          height: auto;
          padding: 0.5rem;
        }

        @media (min-width: 601px) {
          img {
            padding: 1rem;
          }
        }
      `}</style>
    </>
  );
}
