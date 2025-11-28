import './feedPost.css';
import {parseDateFromSeconds} from '../../utils/helpers.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, selectCommentsForPost } from '../../store/feedSlice.js';
import { useState } from 'react';

export default function FeedPost({ post }) {
    const dispatch = useDispatch();
    const [showComments, setShowComments] = useState(false);

    const { items: comments, isLoading, hasError } = useSelector((state) =>
        selectCommentsForPost(state, post.id)
    );

    const handleCommentsClick = () => {
        if (!comments || comments.length === 0) {
            dispatch(fetchComments({ postId: post.id, permalink: post.permalink }));
        }
        setShowComments((prev) => !prev);
    };

    return (
        <div className="post-card">
            <div className="votes">
                <div className="arrow up">▲</div>
                <div className="score">{post.score}</div>
                <div className="arrow down">▼</div>
            </div>

            <div className="post-content">
                <h3 className="title">
                    {post.title}
                </h3>

                {post.imageUrl && (
                    <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="post-image"
                    />
                )}

                <div className="post-footer">
                    <p className="meta">
                        Posted by <span className="author">{post.author}</span> · {parseDateFromSeconds(post.created_utc)}
                    </p>

                    <button
                        type="button"
                        className="comments-button"
                        onClick={handleCommentsClick}
                    >
                        💬 {post.num_comments}
                    </button>
                </div>

                {showComments && (
                    <div className="comments-section">
                        {isLoading && <p>Caricamento commenti...</p>}
                        {hasError && <p>Errore nel caricamento dei commenti 😢</p>}

                        {!isLoading && !hasError && comments && comments.length > 0 && (
                            <ul className="comments-list">
                                {comments.map((c) => (
                                    <li key={c.id} className="comment-item">
                                        <p className="comment-author">{c.author}</p>
                                        <p className="comment-body">{c.body}</p>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {!isLoading && !hasError && comments && comments.length === 0 && (
                            <p>Nessun commento da mostrare.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
