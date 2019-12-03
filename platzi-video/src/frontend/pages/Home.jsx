import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import Search from '../Layout/Search';
import Categories from '../Layout/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';

import CarouselBox from '../Layout/CarouselBox';

const Home = ({ myList, trends, originals, results }) => {

  return (
    <>
      <Helmet bodyAttributes={{ style: 'background-color :#834DFB' }}>
        <title>Platzi Video | by aomine</title>
      </Helmet>

      <Search />

      {results.length !== 0 ?
        (
          <Categories title='Resultados'>
            <Carousel>
              {results.map((item) => <CarouselItem key={item.id} {...item} />)}
            </Carousel>
          </Categories>
        ) :
        (
          <CarouselBox myList={myList} trends={trends} originals={originals} />
        )}
    </>
  );
};

const mapStateToProps = (state) => ({
  myList: state.myList,
  trends: state.trends,
  originals: state.originals,
  results: state.results,
});

// export default connect(props, actions)(Home);
export default connect(mapStateToProps, null)(Home);
