import React from 'react';
import '../App.css';
import { distanceInWordsToNow } from 'date-fns';

export const Post = props => {
  return (
    <div className="post">
      <article>
        <section className="post-item">
          <span className="post-item-space post-item-author">{`Posted by ${
            props.author
          }`}</span>
          <span className="">
            {distanceInWordsToNow(new Date(props.createdAt * 1000))}
          </span>

          <h1 className="post-item-space">{props.title}</h1>
          <a className="link permalink" href={props.permalink}>
            {props.permalink}
          </a>
        </section>
        <section className="post-image">
          {props.thumbnail && (
            <img
              src={props.thumbnail}
              alt={props.title}
              style={{ width: props.width, height: props.height }}
            />
          )}
        </section>
        <section>
          <a className="link" href={props.commentsUrl}>
            {' '}
            <span> Comments </span>{' '}
          </a>
        </section>
      </article>
    </div>
  );
};
