import React, { Component } from 'react';
import Preview from './Preview';
import { BrowserRouter as Router } from 'react-router-dom';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMainList: true
        };
    }

    render(){
        const posts = this.props.posts;
//        const allPosts = postsContents.concat(pagesContents);
        let mainList = <div>
            <i>Страницы</i>
            {// eslint-disable-next-line
                posts.filter(p => p.postType=="page").map(p =>
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
                posts.filter(p => p.postType=="post").map(p =>
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