import Comment from "./Comment";
import NewComment from "./NewComment";
import { useState } from "react";
import { nanoid } from "nanoid";

function Comments({ currentUser }) {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);

  const createComment = async (text) => {
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleString(); // Customize the time format if needed
  
    return {
      content: text,
      createdAt: formattedTime,
      id: nanoid(),
      replies: [],
      user: currentUser,
    };
  };

  const addComment = (text) => {
    createComment(text).then((comment) => {
      setBackendComments([...backendComments, comment]);
    });
  };

  const deleteComment = (commentId) => {
    const updatedBackendComments = backendComments.filter(
      (backendComment) => backendComment.id !== commentId
    );
    setBackendComments(updatedBackendComments);
  };

  const updateComment = (text, commentId) => {
    const updatedBackendComments = backendComments.map((backendComment) => {
      if (backendComment.id === commentId) {
        return { ...backendComment, content: text };
      }
      return backendComment;
    });
    setBackendComments(updatedBackendComments);
    setActiveComment(null);
  };

  return (
    <section className="login-section">
      <div className="login-banner relative justify-center flex"></div>
      <main>
        {backendComments && Array.isArray(backendComments) && backendComments.map((comment) => (
          <Comment
            key={comment.id}
            currentUser={currentUser}
            replies={comment.replies}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            deleteComment={deleteComment}
            addComment={addComment}
            updateComment={updateComment}
            {...comment}
          />
        ))}
        <NewComment currentUser={currentUser} handleSubmit={addComment} initialText='' buttonText='send' />
      </main>
    </section>
  );
  
}

export default Comments;