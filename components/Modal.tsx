import * as React from 'react';
import ModalContent from './ModalContent';

export default function Modal({ image, flipKey, closing }) {
  const imageRef = React.useRef(null);

  React.useLayoutEffect(() => {
    const [source, image] = Array.from(
      document.querySelectorAll(`[data-flip-key='${flipKey}']`)
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
    <div className="modal-container" data-closing={closing}>
      <div className="modal">
        <img
          ref={imageRef}
          data-flip-key={flipKey}
          src={image.src}
          alt={image.alt}
        />
      </div>
      <ModalContent closing={closing} />
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
            background: rgba(76, 104, 119, 0.7);
          }

          .modal::before {
            position: absolute;
            content: '';
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background-color: rgb(17, 35, 45);
            transition: opacity calc(var(--time) * 0.6) var(--time);
          }

          [data-closing='true'] .modal::before {
            opacity: 0;
          }

          .modal {
            display: flex;
            max-height: 50%;
            position: relative;
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

          img {
            width: 100%;
            height: auto;
            max-height: 100%;
            object-fit: contain;
            transform-origin: 0 0;
            transform: var(--transform);
          }

          [data-closing='false'] img {
            animation: show var(--time) cubic-bezier(0.5, 0, 0.5, 1) forwards;
          }

          @keyframes closing {
            to {
              transform: var(--transform);
            }
          }

          [data-closing='true'] img {
            transform: translateX(0) translateY(0) scaleX(1) scaleY(1);
            animation: closing var(--time) cubic-bezier(0.5, 0, 0.5, 1)
              calc(var(--time) * 2) forwards;
          }
        `}
      </style>
    </div>
  );
}
