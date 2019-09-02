import * as React from 'react';
import ModalContent from './ModalContent';

export default function Modal({ image, close, flipKey, parent }) {
  const imageRef = React.useRef(null);

  React.useLayoutEffect(() => {
    const [source, image] = parent.current.querySelectorAll(
      `[data-flip-key='${flipKey}']`
    );
    const sourceRect = source.getBoundingClientRect();
    const imageRect = image.getBoundingClientRect();
    image.style.setProperty(
      '--transform',
      `
      translateX(${sourceRect.left - imageRect.left}px)
      translateY(${sourceRect.top - imageRect.top}px)
      scaleX(${sourceRect.width / imageRect.width})
      scaleY(${sourceRect.height / imageRect.height})
    `
    );
    imageRef.current.focus();
  }, []);

  return (
    <div className="modal-container" onClick={close}>
      <div className="modal">
        <img
          ref={imageRef}
          data-flip-key={flipKey}
          src={image.src}
          alt={image.alt}
        />
      </div>
      <ModalContent />
      <style jsx>
        {`
          .modal-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            background-color: rgba(76, 104, 119, 0.7);
          }

          .modal {
            display: flex;
            flex-direction: column;
            background-color: #41535d;
            max-height: 50%;
          }

          @media (min-width: 801px) {
            .modal-container {
              flex-direction: row;
            }

            .modal {
              width: 50%;
              height: inherit;
              max-height: 100%;
              justify-content: center;
            }
          }

          @keyframes show {
            to {
              transform: translateX(0) translateY(0) scaleX(1) scaleY(1);
            }
          }

          .modal img {
            width: 100%;
            height: auto;
            max-height: 100%;
            object-fit: contain;
            transform-origin: 0 0;
            transform: var(--transform);
            animation: show var(--time) cubic-bezier(0.5, 0, 0.5, 1) forwards;
          }
        `}
      </style>
    </div>
  );
}
