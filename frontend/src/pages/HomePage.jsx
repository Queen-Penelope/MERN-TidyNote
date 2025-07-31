import { useEffect, useState } from "react";
import RateLimiter from "../components/RateLimiter";
import api from "../lib/axios";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log("DATA:", res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("ERROR in fetchNotes:", error);
        console.log(error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load Notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes(); // MUST be called!
  }, []);

  return (
   <div className="min-h-screen">
    {isRateLimited && <RateLimiter />}

    <div className="max-w-7xl mx-auto p-4 mt-6">
      {loading ? (
        <Loading />
      ) : isRateLimited ? null : notes.length === 0 ? (
        <NotesNotFound />
      ) : (
        <div className="grid grid-cols-1 mid:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} setNotes={setNotes} />
          ))}
        </div>
      )}
    </div>
  </div>
  );
};

export default HomePage;
