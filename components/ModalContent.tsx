import * as React from 'react';

const loremText = `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  Provident incidunt expedita, quo perferendis optio necessitatibus molestias
  autem impedit. Commodi possimus, perferendis voluptas error eius consequatur
  excepturi nobis cupiditate velit saepe vitae minus adipisci animi repellat
  pariatur cumque aspernatur voluptatibus laudantium natus! Fugit quae, nesciunt
  consequatur, ab id aperiam incidunt error atque`;

export default function ModalContent({ closing }) {
  return (
    <div className="content" data-closing={closing}>
      <h1> Hello Weird World</h1>
      <p>
        This project was inspired by the amazing{' '}
        <a href="https://twitter.com/sarah_edo" target="_blank">
          Sara Drasner's
        </a>{' '}
        <a href="https://page-transitions.com" target="_blank">
          Page transitions project
        </a>. Code is hosted on{' '}
        <a href="https://github.com/segunolalive/flip-gallery" target="_blank">
          Github
        </a>. Images come from{' '}
        <a href="https://unsplash.com" target="_blank">
          Unsplash
        </a>
      </p>
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
          a {
            color: currentColor;
            display: inline-block;
            padding: 0 0.5rem;
          }

          a:hover,
          a:focus,
          a:active {
            background: #cde8ff;
          }

          .content {
            background-color: white;
            color: #41535d;
            padding: 2rem;
            overflow: auto;
            flex: 1;
            z-index: -1;
            transform: translate3d(0, -200%, 0);
          }

          @keyframes slide-in {
            to {
              transform: translateY(0%);
            }
          }

          @keyframes slide-out {
            to {
              transform: translateY(-200%);
            }
          }

          [data-closing='false'].content {
            animation: slide-in var(--time) cubic-bezier(0.5, 0, 0.5, 1)
              var(--time) forwards;
          }

          [data-closing='true'].content {
            transform: translateY(0%);
            animation: slide-out var(--time) cubic-bezier(0.5, 0, 0.5, 1)
              forwards;
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
            }

            [data-closing='true'].content {
              transform: translateX(0%);
            }

            @keyframes slide-in {
              to {
                transform: translateX(0%);
              }
            }

            @keyframes slide-out {
              to {
                transform: translateX(-200%);
              }
            }
          }
        `}
      </style>
    </div>
  );
}
