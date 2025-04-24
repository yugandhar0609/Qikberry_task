import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../../redux/slices/postsSlice';

const Posts = () => {
  const dispatch = useDispatch();
  const { items: posts, status, error } = useSelector(state => state.posts);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-4">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Posts</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">{post.title}</h3>
            <p className="text-gray-600 mb-4">{post.body}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Post #{post.id}</span>
              <span className="text-sm text-gray-500">User #{post.userId}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts; 