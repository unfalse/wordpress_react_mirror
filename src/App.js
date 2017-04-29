import React, { Component } from 'react';
import Home from './Home';
import Post from './Post';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './App.css';

/*
 <Link to={`/posts/${p.id}`}>
 {p.title}
 </Link>


 render={({ match }) =>
 <Post postData={allPosts.find(p => p.id === match.params.postId )}/>
 }
 */

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        console.log('componentDidMount!');
        // TODO: переделать чтобы промис дождался когда оба получат данные
        this.getPosts('http://unfalsecoding.net/wp-json/wp/v2/pages', 'page');
        this.getPosts('http://unfalsecoding.net/wp-json/wp/v2/posts', 'post');
    }

    getPosts(url, postType) {
        fetch(url)
            .then(response => response.json())
            .then(obj => {
                    let newPosts = [];
                    // eslint-disable-next-line
                    obj.map(o => {
                        newPosts.push({
                            title: o.title.rendered,
                            content: o.content.rendered,
                            date: o.date_gmt,
                            id: o.id,
                            postType
                        })
                    });
                    console.log('Received posts!');
                    console.log(obj);
                    // добавляем новый элемент в массив стейта
                    this.setState({
                        posts: this.state.posts.concat(newPosts)
                    });
                }
            );
    }

    onClick() {
        console.log(this);
    }

    render() {
        const { posts=[] } = this.state;

        console.log('render!');

        return (
            <Router>
                <div className="container-full">

                    <div className="row site-title">
                        <div className="col-sm-1">
                        </div>
                        <div className="col-sm-7">
                            <h1><Link to={`/`}>unfalsecoding.net wordpress mirror</Link></h1>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-1">
                        </div>
                        <div className="col-sm-7">

                            <Route path="/posts/:postId"
                                   render={
                                       m => {
                                           return <Post postData={posts.find(p => p.id === +m.match.params.postId)}/>
                                       }
                                   }
                            />

                            <Route exact={true}
                                   path="/rrm"
                                   render={() =>
                                       <Home posts={
                                           posts.map(p => ({
                                               ...p,
                                               title: <Link to={`/posts/${p.id}`}>{p.title}</Link>
                                           }))
                                       }/>
                                   }/>

                            <Route exact={true}
                                   path="/"
                                   render={() =>
                                       <Home posts={
                                           posts.map(p => ({
                                                   ...p,
                                                   title: <Link to={`/posts/${p.id}`}>{p.title}</Link>
                                           }))
                                       }/>
                                   }/>

                        </div>

                        <div className="col-sm-3">

                            <LeftMenuBlock
                                menuData={{blockTitle:"Страницы", blockType:"page",
                                    posts: posts.map(p => ({
                                        ...p,
                                        title: <Link to={`/posts/${p.id}`}>{p.title}</Link>
                                    }))
                                }} />

                            <hr/>

                            <LeftMenuBlock
                                menuData={{blockTitle:"Посты", blockType:"post",
                                    posts: posts.map(p => ({
                                        ...p,
                                        title: <Link to={`/posts/${p.id}`}>{p.title}</Link>
                                    }))
                                }} />

                        </div>
                    </div>
                </div>
            </Router>
        );
  }
}

/*



 <div>
 <div className="left-menu-title">Посты</div>
 {// eslint-disable-next-line
 posts.filter(p => p.postType=="post").map(p =>
 <div key={p.id} className="post-link">
 <Link to={`/posts/${p.id}`}>
 {p.title}
 </Link>
 </div>
 )
 }
 </div>

 */

const LeftMenuBlock = ({menuData}) => {
    const { blockTitle, blockType, posts } = menuData;
    console.log('LeftMenuBlock!');
    const output = <div>
        <div className="left-menu-title">{blockTitle}</div>
        {// eslint-disable-next-line
            posts.filter(p => p.postType==blockType).map(p =>
                <div key={p.id} className="post-link">
                    {p.title}
                </div>
            )
        }
    </div>;
    return output;
}

export default App;
/*
 <div dangerouslySetInnerHTML={{ __html: p.content }} />

 <Link to={`/posts/${p.id}`}>
 {p.title}
 </Link>
 */