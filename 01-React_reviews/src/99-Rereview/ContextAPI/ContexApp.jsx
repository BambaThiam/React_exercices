import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";


function createRandomPost() {
    return {
      title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
      body: faker.hacker.phrase(),
    };
  }

  
function Header({ posts, onClearPosts, searchQuery, setSearchQuery }) {
    return (
      <header className="header5">
        <div className="h1-5">
          <span className="span-5">⚛️</span>The Atomic Blog
        </div>
        <div className="headerdiv-5">
          <Results posts={posts} />
          <SearchPosts
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <button onClick={onClearPosts} className="headerbutton-5 button-5">Clear posts</button>
        </div>
      </header>
    );
  }
  
  function SearchPosts({ searchQuery, setSearchQuery }) {
    return (
      <input
      className="input-5"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search posts..."
      />
    );
  }
  
  function Results({ posts }) {
    return <p>🚀 {posts.length} atomic posts found</p>;
  }
  
  function Main({ posts, onAddPost }) {
    return (
      <main className="main-5">
        <FormAddPost onAddPost={onAddPost} />
        <Posts posts={posts} />
      </main>
    );
  }
  
  function Posts({ posts }) {
    return (

      <section className="section5">
        <List posts={posts} />
      </section>
    );
  }
  
  function FormAddPost({ onAddPost }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
  
    const handleSubmit = function (e) {
      e.preventDefault();
      if (!body || !title) return;
      onAddPost({ title, body });
      setTitle("");
      setBody("");
    };
  
    return (
      <form onSubmit={handleSubmit} className="form-5">
        <input
        className="input-5"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
        />
        <textarea
        className="textarea-5"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Post body"
        />
        <button className="button-5">Add post</button>
      </form>
    );
  }
  
  function List({ posts }) {
    return (
      <ul>
        {posts.map((post, i) => (
          <li key={i}>
            <h3 className="h3-5">{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    );
  }
  
  function Archive({ onAddPost }) {
    // Here we don't need the setter function. We're only using state to store these posts because the callback function passed into useState (which generates the posts) is only called once, on the initial render. So we use this trick as an optimization technique, because if we just used a regular variable, these posts would be re-created on every render. We could also move the posts outside the components, but I wanted to show you this trick 😉
    const [posts] = useState(() =>
      // 💥 WARNING: This might make your computer slow! Try a smaller `length` first
      Array.from({ length: 10000 }, () => createRandomPost())
    );
  
    const [showArchive, setShowArchive] = useState(false);
  
    return (
      <aside className="aside-5">
        <h2 className="h2-5">Post archive</h2>
        <button  onClick={() => setShowArchive((s) => !s)}  className="button-5">
          {showArchive ? "Hide archive posts" : "Show archive posts"}
        </button>
  
        {showArchive && (
          <ul>
            {posts.map((post, i) => (
              <li key={i}>
                <p>
                  <strong>{post.title}:</strong> {post.body}
                </p>
                <button onClick={() => onAddPost(post)} className="button-5">Add as new post</button>
              </li>
            ))}
          </ul>
        )}
      </aside>
    );
  }
  
  function Footer() {
    return <footer>&copy; by The Atomic Blog ✌️</footer>;
  }
const ContexApp = () => {
    const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isFakeDark, setIsFakeDark] = useState(false);

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
  useEffect(
    function () {
      document.documentElement.classList.toggle("fake-dark-mode");
    },
    [isFakeDark]
  );

  return (
    <section className="section5">
      <button
        onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
        className="btn-fake-dark-mode button-5"
      >
        {isFakeDark ? "☀️" : "🌙"}
      </button>

      <Header
      className="header5"
        posts={searchedPosts}
        onClearPosts={handleClearPosts}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Main posts={searchedPosts} onAddPost={handleAddPost} className="main-5"/>
      <Archive onAddPost={handleAddPost} />
      <Footer />
    </section>
  );
}

export default ContexApp