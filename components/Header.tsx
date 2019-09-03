import * as React from 'react';

export default function Header({ search }) {
  const [value, setValue] = React.useState('');

  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleSearch(event) {
    event.preventDefault();
    search(value);
  }

  return (
    <header className="header">
      <form action="" onSubmit={handleSearch} aria-label="search">
        <input
          type="search"
          inputMode="search"
          placeholder="search"
          value={value}
          onChange={handleChange}
          onBlur={handleSearch}
        />
        <button type="submit">submit</button>
      </form>
      <style jsx>
        {`
          .header {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 30rem;
            max-height: 30vh;
            background-color: rgba(113, 136, 150, 0.6);
            font-size: 2rem;
          }

          form {
            width: 95%;
            height: 5rem;
            display: flex;
            max-width: 900px;
            padding: 0 1rem;
          }

          input {
            flex: 1 1 2rem;
            border: none;
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.4rem;
            box-shadow: inset 0 0 0 0.2rem rgba(133, 213, 255, 0.9);
            padding: inherit;
            font-size: 1.8rem;
            transition: box-shadow calc(var(--time) * 0.6);
          }

          input:focus {
            box-shadow: inset 0 0 0 0.2rem rgba(133, 213, 255, 0.9),
              0 0 0.5rem 0.4rem rgba(0, 155, 236, 0.5);
            outline: none;
            border: none;
          }

          button {
            border-top-right-radius: 0.4rem;
            border-bottom-right-radius: 0.4rem;
            border-left: none;
            border: none;
            padding: 1rem;
            font-size: 1.8rem;
            color: #adbac2;
            background: #005988;
            transition: all calc(var(--time) * 0.6) ease-in-out;
            cursor: pointer;
          }
          button:hover,
          button:focus {
            background-color: #009bec;
            color: white;
            outline: none;
          }
        `}
      </style>
    </header>
  );
}
