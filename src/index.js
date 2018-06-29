import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import App from './app/App';
import Home from './components/Home';
import Post from './components/Post';
import getPagesAndPosts from './api/postService';

// TODO: add rrm to all links, so links to posts will lead to mirror site
getPagesAndPosts('http://unfalsecoding.net')
  .then(data => {
    const onChange = (event) => {
        const url = event.target.value;
//        localStorage.setItem("currentURL", url);
        getPagesAndPosts(url)
            .then(newData => {
                if (newData.status === 'OK') renderDOM(newData);
                else renderDOM({ ...data, status: newData.status });
            });
    };

    const renderDOM = data => {
        const { posts } = data;
        ReactDOM.render(
            <Router>
                <App {...data} onChange={onChange}>
                <Switch>
                    <Route exact path="/"
                    render={() =>
                        <Home posts={ posts.map(p => ({...p, title: <Link to={`/posts/${p.id}`}>{p.title}</Link>}) ) } /> }
                    />
                    <Route exact path="/rrm"
                    render={() => <Home posts={ posts.map(p => ({...p, title: 
                                    <Link to={`/posts/${p.id}`}>{p.title}</Link>}) ) } /> }
                    />
                    <Route path="/posts/:postId"
                    render={m => <Post postData={ posts.find(p => p.id === +m.match.params.postId) }/> }
                    />
                </Switch>
                </App>
            </Router>,
            document.getElementById('root')
        );
    };

    renderDOM(data);
  });