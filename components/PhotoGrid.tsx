import * as React from 'react';
import Image from './Image';
import ReactModal from 'react-modal';
import Modal from './Modal';
import { Iimage } from '../interfaces';

type Props = {
  images: Iimage[];
  columns: number;
};

ReactModal.setAppElement('#main');

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
        {images.map(({ id, urls, alt_description }, index) => (
          <div
            tabIndex={0}
            className="img-wrapper"
            key={id}
            onClick={handleClick}
            data-flip-key={id}
            data-index={index}
          >
            <Image src={urls.regular} alt={alt_description} />
          </div>
        ))}
      </div>

      <ReactModal
        isOpen={showModal}
        onRequestClose={closeModal}
        portalClassName="modal-portal"
        style={{ content: { top: 0, left: 0, bottom: 0, right: 0 } }}
      >
        <button className="close" onClick={closeModal} name="close modal">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="arrow-left"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"
            />
          </svg>
        </button>
        <Modal image={selectedData} flipKey={selected} />
      </ReactModal>
      <style jsx>{`
        .close {
          position: absolute;
          display: flex;
          place-content: center;
          top: 1rem;
          left: 1rem;
          height: 3rem;
          width: 3rem;
          z-index: 10;
          color: #41535d;
          background: white;
          border: 0.3rem solid currentColor;
          border-radius: 50%;
          cursor: pointer;
        }
        @media (min-width: 801px) {
          .close {
            top: 3rem;
            left: 3rem;
          }
        }
        .close svg {
          height: 2rem;
          width: 2rem;
        }
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
