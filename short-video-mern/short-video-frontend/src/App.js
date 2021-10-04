import React, { useState, useEffect } from 'react'
import './App.css';
import Video from './components/Video';
import axios from './components/axios';

function App() {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    async function fetchData() {
        const res = await axios.get("/v2/posts")
        setVideos(res.data)
        return res
    }
    fetchData()
  }, [])

  return (
    <div className="app">
      <div className="app__videos">
        {videos.map(({ url, channel, description, song, likes, shares, messages }) => (
            <Video 
              key={url} 
              url={url} 
              channel={channel} 
              description={description} 
              song={song} 
              likes={likes} 
              shares={shares} 
              messages={messages} 
            />
          ))}
      </div>
    </div>
  );
}
export default App;
