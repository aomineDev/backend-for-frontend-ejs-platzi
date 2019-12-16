import React from 'react';
import { create } from 'react-test-renderer';
import ProviderMock from '../../__mocks__/providerMock';
import CarouselItem from '../CarouselItem';

describe('Carousel Item component', () => {
  test('Match snapshot', () => {
    const carouselItem = create(
      <ProviderMock>
        <CarouselItem />
      </ProviderMock>,
    );
    expect(carouselItem.toJSON()).toMatchSnapshot();
  });
});
