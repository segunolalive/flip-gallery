import * as React from 'react';

const loremText = `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  Provident incidunt expedita, quo perferendis optio necessitatibus molestias
  autem impedit. Commodi possimus, perferendis voluptas error eius consequatur
  excepturi nobis cupiditate velit saepe vitae minus adipisci animi repellat
  pariatur cumque aspernatur voluptatibus laudantium natus! Fugit quae, nesciunt
  consequatur, ab id aperiam incidunt error atque`;

export default function ModalContent() {
  return (
    <div className="content">
      <h1> Hello Weird world</h1>
      <p>{loremText}</p>
      <p>{loremText}</p>
      <p>{loremText}</p>
      <p>{loremText}</p>
      <p>{loremText}</p>
      <p>{loremText}</p>
      <p>{loremText}</p>
      <p>{loremText}</p>
      <style jsx>
        {`
          .content {
            background-color: white;
            color: #41535d;
            padding: 2rem;
            overflow: auto;
            flex: 1;
            z-index: -1;
            transform: translate(0, -200%);
            animation: slide-down var(--time) ease-out var(--time)
                forwards;
            }
          }

          h1 {
            font-size: 3rem;
            font-family: sans-serif;
          }

          p {
            font-size: 2rem;
          }

          @media (min-width: 801px) {
            .content {
              width: 100%;
              height: 100%;
              transform: translate(-100%, 0);
              animation: slide-right var(--time) cubic-bezier(0.5, 0, 0.5, 1) var(--time)
                forwards;
            }
          }

          @keyframes slide-right {
            to {
              transform: translateX(0%);
            }
          }

          @keyframes slide-down {
            to {
              transform: translateY(0%);
            }
          }
        `}
      </style>
    </div>
  );
}
