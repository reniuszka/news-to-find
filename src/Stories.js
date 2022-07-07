import React from 'react';
import { useGlobalContext } from './context';

const Stories = () => {
  // const state= useGlobalContext();
  const { isLoading, hits, removeStory } = useGlobalContext();

  //multiple returns
  if (isLoading) {
    console.log(isLoading, 'status of loading');
    return <div className='loading'></div>;
  }
  return (
    <section className='stories'>
      {hits.map((story) => {
        console.log(story);
        const { objectID, title, num_comments, url, author, points } = story;
        return (
          <article className='story' key={objectID}>
            <h4 className='title'>{title}</h4>
            {/* {' } is extra spacja */}
            <p className='info'>
              {points} points by <span>{author} | </span> {num_comments}{' '}
              comments
            </p>
            <div>
              <a
                href={url}
                className='read-link'
                target='_blank'
                rel='noopener nreferrer'
              >
                read more
              </a>
              <button
                className='remove-btn'
                onClick={() => removeStory(objectID)}
              >
                remove
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Stories;
