import * as React from 'react';
import Image from './Image';
import Modal from './Modal';
import { Iimage } from '../interfaces';

type Props = {
  images: Iimage[];
  columns: number;
};

export default function PhotoGrid({
  images,
  columns = 3
}): React.FunctionComponentElement<Props> {
  const [showModal, setShowModal] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [selectedData, setSelectedData] = React.useState({ src: '', alt: '' });
  const parentRef = React.useRef(null);

  const handleClick = event => {
    const key = event.currentTarget.dataset.flipKey;
    if (key) {
      setSelected(key);
      const { src, alt } = event.target;
      setSelectedData({ src, alt });
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setSelected(false);
    setShowModal(false);
  };

  return (
    <div className="parent" ref={parentRef}>
      <div className="container">
        {images.map(({ id, src, alt }) => (
          <div
            tabIndex={0}
            className="img-wrapper"
            key={id}
            onClick={handleClick}
            data-flip-key={id}
          >
            <Image src={src} alt={alt} />
          </div>
        ))}
      </div>

      {showModal ? (
        <Modal
          image={selectedData}
          flipKey={selected}
          parent={parentRef}
          close={closeModal}
        />
      ) : null}
      <style jsx>{`
        .parent {
          position: relative;
          width: 100%;
          height: 100vh;
          max-width: 1200px;
          margin: auto;
        }

        .container {
          margin-top: -5rem;
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(${Math.min(columns, 3)}, 1fr);
          gap: 1rem;
          grid-auto-rows: 3rem;
          padding: 1rem;
        }

        @media (min-width: 601px) {
          .container {
            grid-template-columns: repeat(${Math.min(columns, 4)}, 1fr);
            padding: 2rem;
            gap: 2rem;
            grid-auto-rows: 5rem;
          }
        }

        @media (min-width: 801px) {
          .container {
            grid-template-columns: repeat(${columns}, 1fr);
          }
        }

        .img-wrapper {
          grid-row: span 6;
          border-radius: 0.5rem;
          cursor: pointer;
          outline: none;
        }
        .img-wrapper:nth-child(odd) {
          grid-row: span 5;
        }
        .img-wrapper:nth-child(1) {
          grid-row: span 4;
        }
      `}</style>
    </div>
  );
}
