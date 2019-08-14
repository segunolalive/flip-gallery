import * as React from 'react';
import Image from './Image';
import { Iimage } from '../interefaces';

type Props = {
  images: Iimage[];
  columns: number;
};

export default function MasonryGrid({
  images,
  columns = 3
}): React.FunctionComponentElement<Props> {
  const blocks = Array.from({ length: columns }, block => []);

  for (let i = 0; i < images.length; i++) {
    const bucket = i % columns;
    blocks[bucket].push(images[i]);
  }
  return (
    <div className="container">
      {blocks.map((block, index) => (
        <div key={index} className="block">
          {block.map(image => (
            <Image src={image.src} alt={image.alt} key={image.id} />
          ))}
        </div>
      ))}
      <style jsx>{`
        .container {
          display: flex;
          flex: 0 0 100%;
          width: 100%;
          max-width: 1200px;
          margin: auto;
        }

        .block {
          display: flex;
          flex-direction: column;
          flex: 0 0 ${100 / columns}%;
        }
      `}</style>
    </div>
  );
}
