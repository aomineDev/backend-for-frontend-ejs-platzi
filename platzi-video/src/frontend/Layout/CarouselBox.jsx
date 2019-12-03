import React from 'react';

import Categories from './Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';

const CarouselBox = ({ myList, trends, originals }) => (
  <>
    {myList.length !== 0 && (
      <Categories title='Mi lista'>
        <Carousel>
          {myList.map((item) => <CarouselItem key={item.id} {...item} isMyList />)}
        </Carousel>
      </Categories>
    )}

    {trends.length !== 0 && (
      <Categories title='Tendencias'>
        <Carousel>
          {trends.map((item) => <CarouselItem key={item.id} {...item} />)}
        </Carousel>
      </Categories>
    )}

    {originals.length !== 0 && (
      <Categories title='Originales de Platzi Video'>
        <Carousel>
          {originals.map((item) => <CarouselItem key={item.id} {...item} />)}
        </Carousel>
      </Categories>
    )}
  </>
);

export default CarouselBox;
