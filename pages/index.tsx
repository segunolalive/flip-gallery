import * as React from 'react';
import axios from 'axios';
import { NextPage } from 'next';

import MasonryGrid from '../components/MasonryGrid';
import { API } from '../utils/constants';

import { Iimage } from '../interefaces';

type Props = {
  images: Iimage[];
};

export default function HomePage({ images = [] }) {
  return (
    <>
      <MasonryGrid images={images} columns={4} />
      <style jsx global>{`
        :root, body {
          width: 100%;
          min-height: 100vh;
          margin: 0;
          padding: 0;
          font-size: 62.5%;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
}

HomePage.getInitialProps = async function() {
  const page = 1;
  try {
    const data = await axios.get(`${API}/photos?_page=${page}&_limit=21`);
    const images = await data.data.map(image => {
      image.alt = image.user.name;
      image.src = image.url;
      return image;
    });
    return { images };
  } catch (error) {
    console.error(error);
    return {};
  }
};
