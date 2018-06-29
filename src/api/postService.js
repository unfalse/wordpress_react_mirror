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
                    return {
                        posts: newPosts,
                        status: 200
                    };
                }
            )
            .catch(() => ({
                posts: [],
                status: 500
            }));

const getPagesAndPosts = (url) =>
         Promise.all([
            getPosts(url + '/wp-json/wp/v2/pages', 'page'),
            getPosts(url + '/wp-json/wp/v2/posts', 'post')
        ])
        .then(data => {
            // debugger;
            const status = data[0].status === 200 && data[1].status === 200 ? 'OK' : 'ERROR';
            return {
                url,
                status,
                posts: [ ...data[0].posts, ...data[1].posts ]
            };
        });

export default getPagesAndPosts;
