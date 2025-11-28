import './feed.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {selectFeed, selectFeedStatus} from "../../store/feedSlice.js";
import {fetchFeed} from "../../store/feedSlice.js";
import FeedPost from "../../components/feedPost/FeedPost";
import { useParams } from 'react-router-dom';

export default function Feed() {
    const dispatch = useDispatch();
    const feed = useSelector(selectFeed);
    const {isLoading, hasError} = useSelector(selectFeedStatus);
    const { author } = useParams(); // ← preso dalla route /authors/:author

    useEffect(() => {
        if (feed.length === 0) {
            dispatch(fetchFeed('pics'));
        }
    }, [dispatch, feed.length]);

    const visiblePosts = author
        ? feed.filter((post) => post.author === author)
        : feed;

    return (
        <main>
            <h1>
                {author ? `Post di ${author}` : 'Feed'}
            </h1>

            {isLoading && <p>Caricamento feed da Reddit...</p>}
            {hasError && <p>Errore nel caricamento del feed 😢</p>}

            {visiblePosts.map((post) => (
                <FeedPost post={post} key={post.id} />
            ))}

            {!isLoading && !hasError && visiblePosts.length === 0 && (
                <p>Nessun post trovato per questo autore.</p>
            )}
        </main>
    );
}
