import * as React from 'react';

export default function Modal({ image, close, flipKey, parent }) {
  const modalRef = React.useRef(null);

  React.useLayoutEffect(() => {
    const [source, modal] = parent.current.querySelectorAll(
      `[data-flip-key='${flipKey}']`
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
    modalRef.current.focus();
  }, []);

  return (
    <div className="modal-container" onClick={close}>
      <div ref={modalRef} className="modal" data-flip-key={flipKey}>
        <img src={image.src} alt={image.alt} />
      </div>
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
            justify-content: center;
            align-items: center;
            background-color: rgba(76, 104, 119, 0.7);
          }

          .modal {
            max-width: 95%;
            height: 80%;
            border-radius: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #41535d;
            transform-origin: 0 0;
            transform: var(--transform);
            animation: show 0.5s cubic-bezier(0.5, 0, 0.5, 1) forwards;
          }

          @keyframes show {
            to {
              transform: translateX(0) translateY(0) scaleX(1) scaleY(1);
            }
          }

          @media (min-width: 801px) {
            .modal {
              flex-direction: row;
            }

            .modal > * {
              flex: 1 0 50%;
              height: 100%;
            }
          }

          .modal img {
            width: 50%;
            height: auto;
            max-height: 80vh;
            object-fit: scale-down;
          }
        `}
      </style>
    </div>
  );
}
