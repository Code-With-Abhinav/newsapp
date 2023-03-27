import React  from 'react'

const NewsItem = (props)=> {

        let { title, description, imageurl, newsUrl, author, date, source } = props;
        return (
            <div className='my-3'>
                <div className="card">
                    <div style={{    display: 'flex',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: '0',
    marginTop: '3px',
    marginRight: '3px'}}>
                        
                    <span className=" badge rounded-pill bg-danger">
                            {source}
                            <span className="visually-hidden">unread messages</span>
                        </span>
                    </div>
                    <img src={!imageurl ? "https://img.etimg.com/thumb/msid-98767778,width-1070,height-580,overlay-economictimes/photo.jpg" : imageurl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} published on {new Date(date).toUTCString()}</small></p>
                        <a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
}

export default NewsItem 
