import React from 'react';

const LeftMenuBlock = ({menuData}) => {
    const { blockTitle, blockType, posts } = menuData;
    return <div>
        <div className="left-menu-title">{blockTitle}</div>
        {// eslint-disable-next-line
            posts.filter(p => p.postType === blockType).map(p =>
                <div key={p.id} className="post-link">
                    {p.title}
                </div>
            )
        }
    </div>;
}

export default LeftMenuBlock;
