import React from 'react';

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

export default Post;