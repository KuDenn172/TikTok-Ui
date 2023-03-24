import classNames from 'classnames/bind';
import { useEffect, useRef, useState, useCallback } from 'react';
import VideoItem from './VideoItem';
import styles from './Video.module.scss';

import Loading from '../../../components/Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getData } from '~/utils/data/datafollowers';

const cx = classNames.bind(styles);
function Video() {
    const [dataVideo, setDataVideo] = useState([]);
    const [moreData, setMoreData] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const videoItemRef = useRef();
    
    useEffect(() => {
        getData('followers')
            .then((data) => {
                setDataVideo(data.slice(0, 5));
                setMoreData(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const fetchMoreData = useCallback(() => {
        // Nếu người dùng lướt nhanh quá, hàm sẽ không thực hiện gì cả
        if (loading) {
            return;
        }
        setLoading(true); // đang tải dữ liệu mới
        if (dataVideo.length < moreData.length) {
            setTimeout(() => {
                setPage((prev) => prev + 1);
                setDataVideo([...moreData.slice(0, (page + 1) * 5)]);
                setLoading(false); // kết thúc tải dữ liệu mới
            }, 700);
        } else {
            setHasMore(false);
            setLoading(false); // kết thúc tải dữ liệu mới
        }
    }, [moreData, page, dataVideo, loading]);


    return (
        <div className={cx('wrapper')}>
            <InfiniteScroll
                dataLength={dataVideo.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<Loading />}
                endMessage={<p>You are all set!</p>}
                style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
            >
                {dataVideo.map((video, index) => (
                    <VideoItem ref={videoItemRef} key={video.id} data={video} />
                ))}
            </InfiniteScroll>
        </div>
    );
}

export default Video;
