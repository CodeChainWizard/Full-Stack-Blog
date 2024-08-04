// import { useEffect, useState } from "react";
// import { Button, Spinner } from "flowbite-react";
// import { Link, useParams } from "react-router-dom";
// import CallToAction from "../components/CallToAction";
// import CommentSection from "../components/CommentSection";
// import PostCard from "../components/PostCard";
// import { RxResume } from "react-icons/rx";
// import { CiPause1 } from "react-icons/ci";

// export default function PostPage() {
//   const { postSlug } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [post, setPost] = useState(null);
//   const [recentPosts, setRecentPosts] = useState([]);
//   const [articleLines, setArticleLines] = useState([]);
//   const [currentLineIndex, setCurrentLineIndex] = useState(0);
//   const [isReading, setIsReading] = useState(false);
//   const [selectedVoice, setSelectedVoice] = useState(null);
//   const [voices, setVoices] = useState([]);
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme);
//   }, [theme]);

//   const handleThemeToggle = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme);
//   };

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
//         if (!res.ok) throw new Error("Failed to fetch post");
//         const data = await res.json();
//         setPost(data.posts[0]);
//       } catch (err) {
//         setError("Failed to load post");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPost();
//   }, [postSlug]);

//   useEffect(() => {
//     const fetchRecentPosts = async () => {
//       try {
//         const res = await fetch(`/api/post/getposts?limit=3`);
//         if (!res.ok) throw new Error("Failed to fetch recent posts");
//         const data = await res.json();
//         setRecentPosts(data.posts);
//       } catch (err) {
//         console.error("Failed to fetch recent posts:", err.message);
//       }
//     };
//     fetchRecentPosts();
//   }, []);

//   useEffect(() => {
//     const fetchVoices = () => {
//       const voicesList = speechSynthesis.getVoices();
//       if (voicesList.length > 0) {
//         setVoices(voicesList);
//         const defaultVoice = voicesList.find(
//           (voice) =>
//             voice.lang.startsWith("en") && voice.name.includes("Female")
//         );
//         setSelectedVoice(defaultVoice || voicesList[0]);
//       }
//     };

//     fetchVoices();
//     if (speechSynthesis.onvoiceschanged !== undefined) {
//       speechSynthesis.onvoiceschanged = fetchVoices;
//     }
//   }, []);

//   const handleReadSummary = async () => {
//     try {
//       const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
//       if (!res.ok) throw new Error("Failed to fetch article");
//       const data = await res.json();
//       const articleContent = data.posts[0]?.content;

//       if (!articleContent) throw new Error("Article summary not found");

//       const tempDiv = document.createElement("div");
//       tempDiv.innerHTML = articleContent;
//       const plainText = tempDiv.innerText;
//       const sentences = plainText.split(/(?:[.!?]\s+)/).slice(0, 5); // Get the first 5 sentences for the summary

//       setArticleLines(sentences);
//       setCurrentLineIndex(0);
//       setIsReading(true);
//       setError(null);
//     } catch (err) {
//       console.error("Error reading article:", err);
//       setError(err.message);
//     }
//   };

//   const handleReadArticle = async () => {
//     try {
//       const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
//       if (!res.ok) throw new Error("Failed to fetch article");
//       const data = await res.json();
//       const articleContent = data.posts[0]?.content;

//       if (!articleContent) throw new Error("Article content not found");

//       const tempDiv = document.createElement("div");
//       tempDiv.innerHTML = articleContent;
//       const plainText = tempDiv.innerText;
//       const sentences = plainText.split(/(?:[.!?]\s+)/);

//       setArticleLines(sentences);
//       setCurrentLineIndex(0);
//       setIsReading(true);
//       setError(null);
//     } catch (err) {
//       console.error("Error reading article:", err);
//       setError(err.message);
//     }
//   };

//   const readNextLine = (lines, index) => {
//     if (index < lines.length) {
//       const utterance = new SpeechSynthesisUtterance(lines[index]);
//       if (selectedVoice) {
//         utterance.voice = selectedVoice;
//       }

//       utterance.onend = () => {
//         readNextLine(lines, index + 1);
//         setCurrentLineIndex(index + 1);
//       };

//       utterance.onerror = () => {
//         setError("Speech synthesis error");
//         setIsReading(false);
//       };

//       speechSynthesis.speak(utterance);
//     } else {
//       setIsReading(false);
//     }
//   };

//   const handlePauseResumeToggle = () => {
//     if (isReading) {
//       speechSynthesis.pause();
//       setIsReading(false);
//     } else if (speechSynthesis.paused) {
//       speechSynthesis.resume();
//       setIsReading(true);
//     } else if (articleLines.length > 0) {
//       readNextLine(articleLines, currentLineIndex);
//       setIsReading(true);
//     }
//   };

//   const handleVoiceChange = (e) => {
//     const voice = voices.find((v) => v.name === e.target.value);
//     setSelectedVoice(voice);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Spinner size="xl" />
//       </div>
//     );
//   }

//   return (
//     <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
//       <div className="flex flex-row justify-between items-center">
//         <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
//           {post?.title}
//         </h1>
//         <button onClick={handleThemeToggle} className="btn-toggle-theme">
//           Toggle Theme
//         </button>
//       </div>

//       <div className="flex flex-col lg:flex-row gap-10 mt-10">
//         <div className="w-full lg:w-1/2 border-2 p-4 rounded-lg">
//           <h2>Listening Summary of Article</h2>
//           <button
//             onClick={handleReadSummary}
//             className="flex items-center gap-1 mt-5"
//           >
//             Read Summary
//           </button>
//           <button
//             onClick={handlePauseResumeToggle}
//             className="flex items-center gap-1 mt-5"
//           >
//             {isReading ? <CiPause1 size={24} /> : <RxResume size={24} />}
//             {isReading ? "Pause" : "Resume"}
//           </button>

//           {error && <div style={{ color: "red" }}>{error}</div>}

//           <div className="voice-selector mt-5">
//             <label htmlFor="voiceSelect">Choose a voice:</label>
//             <select
//               id="voiceSelect"
//               onChange={handleVoiceChange}
//               value={selectedVoice?.name || ""}
//               className="w-48 dark:text-white text-black rounded-md ml-2 bg-transparent"
//             >
//               {voices.map((voice) => (
//                 <option key={voice.name} value={voice.name}>
//                   {voice.name} ({voice.lang})
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="w-full lg:w-1/2 border-2 p-4 rounded-lg">
//           <h3 className="text-lg font-semibold">Reading Line:</h3>
//           <p>{articleLines[currentLineIndex]}</p>
//         </div>
//       </div>

//       <Link
//         to={`/search?category=${post?.category}`}
//         className="self-center mt-5"
//       >
//         <Button color="gray" pill size="xs">
//           {post?.category}
//         </Button>
//       </Link>
//       <img
//         src={post?.image}
//         alt={post?.title}
//         className="mt-10 p-3 max-h-[600px] w-full object-cover"
//       />

//       <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
//         <span>
//           {post?.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}
//         </span>
//         <span className="italic">
//           {post?.content
//             ? (post.content.length / 1000).toFixed(0) + " mins read"
//             : ""}
//         </span>
//       </div>

//       <div
//         className="p-3 max-w-2xl mx-auto w-full post-content"
//         dangerouslySetInnerHTML={{ __html: post?.content || "" }}
//       />

//       <div className="max-w-4xl mx-auto w-full">
//         <CallToAction />
//       </div>

//       <CommentSection postId={post?._id} />

//       <div className="flex flex-col justify-center items-center mb-5">
//         <h1 className="text-xl mt-5">Recent articles</h1>
//         <div className="flex flex-wrap gap-5 mt-5 justify-center">
//           {recentPosts.map((post) => (
//             <PostCard key={post._id} post={post} />
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }

import { useEffect, useState } from "react";
import { Button, Spinner } from "flowbite-react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";
import { RxResume } from "react-icons/rx";
import { CiPause1 } from "react-icons/ci";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [articleLines, setArticleLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [voices, setVoices] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();
        setPost(data.posts[0]);
      } catch (err) {
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=3`);
        if (!res.ok) throw new Error("Failed to fetch recent posts");
        const data = await res.json();
        setRecentPosts(data.posts);
      } catch (err) {
        console.error("Failed to fetch recent posts:", err.message);
      }
    };
    fetchRecentPosts();
  }, []);

  useEffect(() => {
    const fetchVoices = () => {
      const voicesList = speechSynthesis.getVoices();
      if (voicesList.length > 0) {
        setVoices(voicesList);
        const defaultVoice = voicesList.find(
          (voice) =>
            voice.lang.startsWith("en") && voice.name.includes("Female")
        );
        setSelectedVoice(defaultVoice || voicesList[0]);
      }
    };

    fetchVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = fetchVoices;
    }
  }, []);

  const handleReadContent = async (type) => {
    try {
      const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
      if (!res.ok) throw new Error("Failed to fetch article");
      const data = await res.json();
      const articleContent = data.posts[0]?.content;

      if (!articleContent) throw new Error("Article content not found");

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = articleContent;
      const plainText = tempDiv.innerText;
      const sentences = plainText.split(/(?:[.!?]\s+)/);

      if (type === "summary") {
        setArticleLines(sentences.slice(0, 5)); // First 5 sentences for the summary
      } else {
        setArticleLines(sentences); // Full article
      }

      setCurrentLineIndex(0);
      setIsReading(true);
      setError(null);
    } catch (err) {
      console.error("Error reading article:", err);
      setError(err.message);
    }
  };

  const readNextLine = (lines, index) => {
    if (index < lines.length) {
      const utterance = new SpeechSynthesisUtterance(lines[index]);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onend = () => {
        readNextLine(lines, index + 1);
        setCurrentLineIndex(index + 1);
      };

      utterance.onerror = () => {
        setError("Speech synthesis error");
        setIsReading(false);
      };

      speechSynthesis.speak(utterance);
    } else {
      setIsReading(false);
    }
  };

  const handlePauseResumeToggle = () => {
    if (isReading) {
      speechSynthesis.pause();
      setIsReading(false);
    } else if (speechSynthesis.paused) {
      speechSynthesis.resume();
      setIsReading(true);
    } else if (articleLines.length > 0) {
      readNextLine(articleLines, currentLineIndex);
      setIsReading(true);
    }
  };

  const handleVoiceChange = (e) => {
    const voice = voices.find((v) => v.name === e.target.value);
    setSelectedVoice(voice);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
          {post?.title}
        </h1>
        <button onClick={handleThemeToggle} className="btn-toggle-theme">
          Toggle Theme
        </button>
      </div>

      <div className="w-full border-2 p-4 rounded-lg mt-10">
        <h2 className="text-lg font-semibold">Read the Article</h2>
        <div className="flex flex-col gap-4 mt-5">
          <button
            onClick={() => handleReadContent("summary")}
            className="flex items-center gap-1"
          >
            Read Summary
          </button>
          <button
            onClick={() => handleReadContent("full")}
            className="flex items-center gap-1"
          >
            Read Full Article
          </button>
          <button
            onClick={handlePauseResumeToggle}
            className="flex items-center gap-1 mt-5"
          >
            {isReading ? <CiPause1 size={24} /> : <RxResume size={24} />}
            {isReading ? "Pause" : "Resume"}
          </button>

          {error && <div style={{ color: "red" }}>{error}</div>}

          <div className="voice-selector mt-5">
            <label htmlFor="voiceSelect">Choose a voice:</label>
            <select
              id="voiceSelect"
              onChange={handleVoiceChange}
              value={selectedVoice?.name || ""}
              className="w-48 dark:text-white text-black rounded-md ml-2 bg-transparent"
            >
              {voices.map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>

          <div className="mt-5">
            <h3 className="text-lg font-semibold">Current Reading Line:</h3>
            <p>{articleLines[currentLineIndex]}</p>
          </div>
        </div>
      </div>

      <Link
        to={`/search?category=${post?.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {post?.category}
        </Button>
      </Link>
      <img
        src={post?.image}
        alt={post?.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />

      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>
          {post?.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}
        </span>
        <span className="italic">
          {post?.content
            ? (post.content.length / 1000).toFixed(0) + " mins read"
            : ""}
        </span>
      </div>

      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post?.content || "" }}
      />

      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>

      <CommentSection postId={post?._id} />

      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Recent articles</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {recentPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
