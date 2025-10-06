import './feedPost.css';
import {parseDateFromSeconds} from '../../utils/helpers.js';

export default function FeedPost({post}) {
    return (
        <div className="post-card" key={post.id}>
            <div className="votes">
                <div className="arrow up">▲</div>
                <div className="score">{post.score}</div>
                <div className="arrow down">▼</div>
            </div>

            <div className="post-content">
                <h3 className="title">
                    {post.title}
                </h3>

                <img
                    src={post.preview?.images[0].source.url}
                    alt="Wall of Death performance in Rajkot"
                    className="post-image"
                />

                <div className="post-footer">
                    <p className="meta">
                        Posted by <span className="author">{post.author}</span> · {parseDateFromSeconds(post.created_utc)}
                    </p>
                    <p className="comments">💬 {post.num_comments}</p>
                </div>
            </div>
        </div>
    )
}