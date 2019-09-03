import * as React from 'react';
import Header from '../components/Header';
import { NextPage } from 'next';

import { API } from '../utils/constants';

import { Iimage } from '../interfaces';
import PhotoGrid from '../components/PhotoGrid';

type Props = {
  images: Iimage[];
};

export default function HomePage({ images = [] }) {
  const [gallery, setGallery] = React.useState(images);

  async function handleSearch(query) {
    try {
      const response = await search(query);
      const images = response.data.results;
      setGallery(images);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main id="main">
      <Header search={handleSearch} />
      <PhotoGrid images={gallery} columns={5} />
      <style jsx global>{`
        :root,
        body {
          width: 100%;
          min-height: 100vh;
          margin: 0;
          padding: 0;
          font-size: calc(0.625rem + 0.3vmin);
          --time: 0.5s;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </main>
  );
}

async function search(query, pageSize = 50) {
  return await API.get(`/?page=1&query=${query}&per_page=${pageSize}`);
}

HomePage.getInitialProps = async function() {
  try {
    const response = await search('nigeria');
    const images = response.data.results;
    return { images };
  } catch (error) {
    console.error(error);
    return {};
  }
};
