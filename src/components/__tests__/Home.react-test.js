// Home.react-test.js
import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';

import Home from './../Home';
import pages_and_posts from './test-json/pages-and-posts.json';

test('Creating snapshot for Home component testing', () => {
  const component = renderer.create(
    <Home
        posts={
            pages_and_posts.map(p => {
                return {
                    title: <a href={`/posts/${p.id}`}>{p.title.rendered}</a>,
                    content: p.content.rendered,
                    date: p.date_gmt,
                    id: p.id,
                    postType: p.postType
                };
            })
        }
    />,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Click on a first link', () => {
    const component = mount(
        <Home
            posts={
                pages_and_posts.map(p => {
                    return {
                        title: <a href={`/posts/${p.id}`}>{p.title.rendered}</a>,
                        content: p.content.rendered,
                        date: p.date_gmt,
                        id: p.id,
                        postType: p.postType
                    };
                })
            }
        />,
      );
    component.find('a')[0].simulate('click');
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();    
});
