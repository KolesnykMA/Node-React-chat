
import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import * as imageService from 'src/services/imageService';
// import ExpandedPost from 'src/containers/ExpandedPost';
// import Post from 'src/components/Post';
// import AddPost from 'src/components/AddPost';
// import SharedPostLink from 'src/components/SharedPostLink';
// import { Checkbox, Loader } from 'semantic-ui-react';
// import InfiniteScroll from 'react-infinite-scroller';
// import { loadPosts, loadMorePosts, likePost, toggleExpandedPost, addPost } from './actions';


// const postsFilter = {
//   userId: undefined,
//   from: 0,
//   count: 10
// };

const StartPage = ({
                       // userId,
                       // loadPosts: load,
                       // loadMorePosts: loadMore,
                       // posts = [],
                       // expandedPost,
                       // hasMorePosts,
                       // addPost: createPost,
                       // likePost: like,
                       // toggleExpandedPost: toggle
                   }) => {

    return (
        <div>
            This is private starting page with your chats
            {/* <div className={styles.addPostForm}>
        <AddPost addPost={createPost} uploadImage={uploadImage} />
      </div> */}
            {/* <div className={styles.toolbar}>
        <Checkbox
          toggle
          label="Show only my posts"
          checked={showOwnPosts}
          onChange={toggleShowOwnPosts}
        />
      </div> */}
            {/* <InfiniteScroll
        pageStart={0}
        loadMore={getMorePosts}
        hasMore={hasMorePosts}
        loader={<Loader active inline="centered" key={0} />}
      >
        {posts.map(post => (
          <Post
            post={post}
            likePost={like}
            toggleExpandedPost={toggle}
            sharePost={sharePost}
            key={post.id}
          />
        ))}
      </InfiniteScroll>
      {expandedPost && <ExpandedPost sharePost={sharePost} />}
      {sharedPostId && <SharedPostLink postId={sharedPostId} close={() => setSharedPostId(undefined)} />} */}
        </div>
    );
};

StartPage.propTypes = {
    // posts: PropTypes.arrayOf(PropTypes.object),
    // hasMorePosts: PropTypes.bool,
    // expandedPost: PropTypes.objectOf(PropTypes.any),
    // userId: PropTypes.string,
    // loadPosts: PropTypes.func.isRequired,
    // loadMorePosts: PropTypes.func.isRequired,
    // likePost: PropTypes.func.isRequired,
    // toggleExpandedPost: PropTypes.func.isRequired,
    // addPost: PropTypes.func.isRequired
};

StartPage.defaultProps = {
    // posts: [],
    // hasMorePosts: true,
    // expandedPost: undefined,
    // userId: undefined
};

const mapStateToProps = rootState => ({
    // posts: rootState.posts.posts,
    // hasMorePosts: rootState.posts.hasMorePosts,
    // expandedPost: rootState.posts.expandedPost,
    // userId: rootState.profile.user.id
});

const actions = {
    // loadPosts,
    // loadMorePosts,
    // likePost,
    // toggleExpandedPost,
    // addPost
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StartPage);