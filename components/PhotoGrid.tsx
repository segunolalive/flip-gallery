import * as React from 'react';
import Image from './Image';
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
  const modalRef = React.useRef(null);

  React.useLayoutEffect(
    () => {
      if (!showModal) return;
      const [source, modal] = parentRef.current.querySelectorAll(
        `[data-flip-key='${selected}']`
      );
      const sourceRect = source.getBoundingClientRect();
      const modalRect = modal.getBoundingClientRect();
      modal.style.setProperty(
        '--transform',
        `
      translateX(${sourceRect.left - modalRect.left}px)
      translateY(${sourceRect.top - modalRect.top}px)
      scaleX(${sourceRect.width / modalRect.width})
      scaleY(${sourceRect.height / modalRect.height})
    `
      );
    },
    [showModal]
  );

  const handleClick = event => {
    const key = event.currentTarget.dataset.flipKey;
    if (key) {
      setSelected(key);
      const { src, alt } = event.target;
      setSelectedData({ src, alt });
      setShowModal(true);
    }
  };

  return (
    <div className="parent" ref={parentRef}>
      <div className="container">
        {images.map(({ id, src, alt }) => (
          <div
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
        <div
          className="modal-container"
          onClick={() => {
            setSelected(false);
            setShowModal(false);
          }}
        >
          <div ref={modalRef} className="modal" data-flip-key={selected}>
            <img src={selectedData.src} alt={selectedData.alt} />
          </div>
        </div>
      ) : null}
      <style jsx global>{`
        .parent {
          position: relative;
          width: 100%;
          height: 100vh;
          max-width: 1200px;
          margin: auto;
          padding: 1rem;
        }

        .container {
          position: absolute;
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(${columns > 3 ? 3 : columns}, 1fr);
          gap: 1rem;
          grid-auto-rows: 3rem;
        }

        @media (min-width: 601px) {
          .container {
            grid-template-columns: repeat(${columns > 4 ? 4 : columns}, 1fr);
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

        .modal-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal {
          display: flex;
          justify-content: center;
          align-items: center;
          transform-origin: 0 0;
          transform: var(--transform);
          animation: show 0.5s cubic-bezier(0.5, 0, 0.5, 1) forwards;
        }

        @keyframes show {
          to {
            transform: translateX(0) translateY(0) scaleX(1) scaleY(1);
          }
        }

        .modal img {
          height: auto;
          width: auto;
          min-height: 50vh;
          min-width: 50vw;
          max-height: 80vh;
          max-width: 100%;
          object-fit: cover;
        }
        .img-wrapper {
          grid-row: span 6;
          border-radius: 0.5rem;
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
