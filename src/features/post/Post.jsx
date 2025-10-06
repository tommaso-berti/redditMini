import './post.css'

export default function Post({ title, author, date, content }) {
    return (
        <article className="post">
            <h2 className="post-title">{title}</h2>
            <div className="post-meta">
                <span className="post-author">{author}</span>
                <span className="post-date">{date}</span>
            </div>
            <div className="post-content">{content}</div>
        </article>
    )
}