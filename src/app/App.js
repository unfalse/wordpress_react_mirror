import React from 'react';
import { Link } from 'react-router-dom';

import LeftMenuBlock from './../components/LeftMenuBlock';

import './../styles/App.css';

const App = props => {
    const { posts=[], onChange, status, url } = props;
    return (
        <div className="container-full">

            <div className="row site-title">
                <div className="col-sm-1">
                </div>
                <div className="col-sm-7">
                    <h1>
                        <table>
                            <tbody>
                                <tr>
                                    <td><Link to={`/`}>Welcome to wordpress blog on &nbsp;</Link></td>
                                    <td><input type="text" onChange={onChange} defaultValue={url}/>!</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <span className={
                                            status === 'OK'
                                                ? 'status-ok'
                                                : 'status-error'
                                            }
                                        >
                                            { status === 'OK' ? 'OK!' : 'ERROR!' }
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </h1>
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
