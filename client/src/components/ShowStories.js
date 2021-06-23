import React from 'react';
import Story from './Story';
import useDataFetcher from '../hooks/dataFetcher';
// import Loader from './Loader';

const ShowStories = ({ type }) => {

    const { stories } = useDataFetcher(type ? type : 'top');

  return (
    <React.Fragment>

      <React.Fragment>
        {stories.map(
          ({ data: story }) => story && <Story key={story.id} story={story} />
        )}
      </React.Fragment>
    </React.Fragment>
  );
};

export default ShowStories;
// const { isLoading, stories } = useDataFetcher(type ? type : 'top');
  // <Loader show={isLoading}>Loading...</Loader>
