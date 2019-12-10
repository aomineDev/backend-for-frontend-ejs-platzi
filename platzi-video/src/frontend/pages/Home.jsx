import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { setMovies } from '../actions';
import useGetMovies from '../hooks/getMovies';

import Search from '../Layout/Search';
import Categories from '../Layout/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import CarouselBox from '../Layout/CarouselBox';

const Home = ({ setMovies, content, myList, trends, originals, results }) => {

  if (content.length === 0) {
    const response = useGetMovies();
    if (response.length > 0) setMovies(response);
  }

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
  content: state.content,
  myList: state.myList,
  trends: state.trends,
  originals: state.originals,
  results: state.results,
});

const mapDispatchToProps = {
  setMovies,
};

// export default connect(props, actions)(Home);
export default connect(mapStateToProps, mapDispatchToProps)(Home);
