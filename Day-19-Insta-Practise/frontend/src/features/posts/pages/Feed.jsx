import Post from "../components/Post";
import "../style/feed.scss";
import { usePost } from "../hooks/usePost";
import { useEffect } from "react";

function Feed() {
  const { loading, feed, handleGetFeed } = usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading || !feed) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  console.log(feed);

  return (
    <main className="feed-page">
      {feed.map(function (elem, idx) {
        return <Post key={idx} user={elem.user} post={elem} />;
      })}
    </main>
  );
}

export default Feed;
