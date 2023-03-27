import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=> {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalresults] = useState(0)
    
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const  updateNews = async()=> {
        props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(50);
        let parseddata = await data.json()
        props.setProgress(70);
        console.log(parseddata)
        setArticles(parseddata.articles)
        setTotalresults(parseddata.totalResults)
        setLoading(false)
        props.setProgress(100);
    }
    document.title = `${capitalizeFirstLetter(props.category)} - NewsHub`;

    useEffect(() =>{
        updateNews();
    }, [])

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`
        setPage(page + 1)
        let data = await fetch(url);
        let parseddata = await data.json()
        setArticles(articles.concat(parseddata.articles))
        setTotalresults(parseddata.totalResults)
    };
        return (
            <>
                <h1 className='text-center' style={{marginTop: '10vh'}}>NewsHub - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                {/* {state.loading && <Spinner />} */}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {articles.map((element) => {
                                const title = element.title ? element.title.slice(0, 48) : "";
                                const description = element.description ? element.description.slice(0, 77) : "";
                                return (
                                    <div className="col-md-4" key={element.url}>
                                        <NewsItem
                                            title={title}
                                            description={description}
                                            imageurl={element.urlToImage}
                                            newsUrl={element.url}
                                            author={element.author}
                                            date={element.publishedAt}
                                            source={element.source.name}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        </div>

                </InfiniteScroll>
            </>
        )

}


News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
