import fetch from 'cross-fetch';

//FUNCTIONS FOR REUSE
export const fetchPosts = url => fetch(url)
  .then( response => response.json() )
  .then( response => deleteKeysFromPosts( response.data ));

export const delay = duration => {
  const promise = new Promise( resolve => {
    setTimeout( () => resolve( true ), duration)
  })
  return promise;
};

export const deleteKeysFromPosts =  data   => {
  const posts =  data.children.map( post => {
    return {
      id: post.data.id,
      title: post.data.title,
      author: post.data.author,
      createdAt: post.data.created_utc,
      commentsUrl: post.data.url,
      permalink: post.data.permalink,
      thumbnail: post.data.thumbnail === 'self' ? null :  post.data.thumbnail,
      thumbnailHeight: post.data.thumbnail_height,
      thumbnailWidth: post.data.thumbnail_width
    };
  });
  return { posts, before: data.before, after: data.after };
}