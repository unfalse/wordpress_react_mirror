const getPosts = (url, postType) =>
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
                    return newPosts;
                }
            );

const getPagesAndPosts = () =>
         Promise.all([
            getPosts('https://unfalsecoding.net/wp-json/wp/v2/pages', 'page'),
            getPosts('https://unfalsecoding.net/wp-json/wp/v2/posts', 'post')
        ])
        .then(pagesAndPosts => [ ...pagesAndPosts[0], ...pagesAndPosts[1] ]);

export default getPagesAndPosts;
