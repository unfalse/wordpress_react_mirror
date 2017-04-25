import React, { Component } from 'react';
import Preview from './Preview';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './App.css';

const Post = ({postData}) => {
    const { content, title, date } = postData;
    const postDate = new Date(date);
    console.log(date);
    console.log(postData);
    return <div>
        <h2>{title}</h2>
        <div><strong>{postDate.toLocaleString()}</strong></div>
        <p dangerouslySetInnerHTML={{ __html: content }}></p>
    </div>
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMainList: true
        };
    }

    render(){
        const { postsContents=[], pagesContents=[] } = this.props.posts;
//        const allPosts = postsContents.concat(pagesContents);
        let mainList = <div>
                <i>Страницы</i>
                {// eslint-disable-next-line
                    pagesContents.map(p =>
                        <div key={p.id}>
                            <Preview
                                text={p.content}
                                title={p.title}
                                date={new Date(p.date)}
                            />
                        </div>
                    )}
                <hr/>
                <i>Посты</i>
                {// eslint-disable-next-line
                    postsContents.map(p =>
                        <div key={p.id}>
                            <Preview
                                text={p.content}
                                title={p.title}
                                date={new Date(p.date)}
                            />
                        </div>
                    )
                }
            </div>;

        return (
            <Router>
                {mainList}
            </Router>
        )
    }
}

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
            postsContents: []
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
                    let postsContents = [];
                    // eslint-disable-next-line
                    obj.map(o => {
                        postsContents.push({
                            title: o.title.rendered,
                            content: o.content.rendered,
                            date: o.date_gmt,
                            id: o.id,
                            postType
                        })
                    });
                    console.log(obj);
                    if(postType==='page'){
                        this.setState({
                            pagesContents: [...postsContents]
                        });
                    }
                    if(postType==='post'){
                        this.setState({
                            postsContents: [...postsContents]
                        });
                    }
                }
            );
    }

    onClick() {
        console.log(this);
    }

    render() {
        const allPosts = this.state.postsContents.concat(this.state.pagesContents);
        const { postsContents=[], pagesContents=[] } = this.state;
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
                            <Route exact={true}
                                   path="/r"
                                   render={() =>
                                       <Home posts={this.state}/>
                                   }/>

                            <Route exact={true}
                                   path="/"
                                   render={() =>
                                       <Home posts={this.state}/>
                                   }/>

                            <Route path="/posts/:postId"
                                   render={m => {
                                       console.log('m = ', m);
                                       return <Post postData={allPosts.find(p => p.id === +m.match.params.postId)}/>
                                   }
                                   }
                            />
                        </div>

                        <div className="col-sm-3">
                            <div><div className="left-menu-title">Страницы</div>
                                {// eslint-disable-next-line
                                    pagesContents.map(p =>
                                        <div key={p.id} className="post-link">
                                            <Link to={`/posts/${p.id}`}>
                                                {p.title}
                                            </Link>
                                        </div>
                                    )
                                }
                            </div>

                            <hr/>

                            <div><div className="left-menu-title">Посты</div>
                                {// eslint-disable-next-line
                                    postsContents.map(p =>
                                        <div key={p.id} className="post-link">
                                            <Link to={`/posts/${p.id}`}>
                                                {p.title}
                                            </Link>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
  }
}

export default App;
/*
 <div dangerouslySetInnerHTML={{ __html: p.content }} />

 <Link to={`/posts/${p.id}`}>
 {p.title}
 </Link>
 */