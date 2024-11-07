
// frontend/src/App.js
import React, { useState } from 'react';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';

function App() {
  const [refresh, setRefresh] = useState(0);

  const handlePostCreated = () => {
    setRefresh(prev => prev + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-center mb-8">Blog with Master-Slave DB</h1>
      <CreatePost onPostCreated={handlePostCreated} />
      <PostList refresh={refresh} />
    </div>
  );
}

export default App;