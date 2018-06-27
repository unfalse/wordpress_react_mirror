import React from 'react';
import { Link } from 'react-router-dom';

import LeftMenuBlock from './../components/LeftMenuBlock';

import './../styles/App.css';

const App = props => {
    const { posts=[] } = props;
    return (
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
                    {props.children}
                </div>

                <div className="col-sm-3">
                    <LeftMenuBlock menuData={{blockTitle:"Страницы", blockType:"page",
                                   posts: posts.map(p => ({ ...p,
                                        title: <Link to={`/posts/${p.id}`}>{p.title}</Link> })) }} 
                    />
                    
                    <hr/>

                    <LeftMenuBlock menuData={{blockTitle:"Посты", blockType:"post",
                                    posts: posts.map(p => ({ ...p,
                                        title: <Link to={`/posts/${p.id}`}>{p.title}</Link> })) }}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
