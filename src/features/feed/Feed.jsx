import './feed.css';
import feedMockup from './feedMockup.json';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {selectFeed, addToFeed} from "../../store/feedSlice.js";
import FeedPost from "../../components/feedPost/FeedPost";

export default function Feed() {

    const dispatch = useDispatch();
    const feed = useSelector(selectFeed);

    //load feed from mockup -> to be changed with API call
    useEffect(() => {
        if (feed.length === 0 && Array.isArray(feedMockup.feed.items)) {
            feedMockup.feed.items.forEach(item => {
                dispatch(addToFeed(item));
            });
        }
    }, [dispatch, feed.length]);

    return (
       <main>
            <h1>Feed</h1>
           {
               feed.map((post) =>
                     <FeedPost post={post} key={post.id} />
               )
           }
       </main>
    )
}