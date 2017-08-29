import React from 'react';

import Preview from './Preview';

const Home = ({posts}) =>
    <div>
        <i>Страницы</i>
        {// eslint-disable-next-line
            posts && posts.filter(p => p.postType=="page").map(p =>
                <div key={p.id}>
                    <Preview text={p.content} title={p.title} date={new Date(p.date)} />
                </div>
        )}
        <hr/>
        <i>Посты</i>
        {// eslint-disable-next-line
            posts && posts.filter(p => p.postType=="post").map(p =>
                <div key={p.id}>
                    <Preview text={p.content} title={p.title} date={new Date(p.date)} />
                </div>
        )}
    </div>;

export default Home;
