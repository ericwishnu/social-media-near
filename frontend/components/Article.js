const Article = ({ post, setUiPleaseWait, setAllPosts, contract}) => {
  
    function like_a_post(e, index){
        e.preventDefault();
        setUiPleaseWait(true);
    
        contract.like_a_post(index)
        .then(async() => {return contract.get_all_posts();})
        .then(setAllPosts)
        .finally( () => {
          setUiPleaseWait(false);
        });
      }
    
      return (
        <>
        <article className="blog-post">
            <h2 className="blog-post-title mv-1">{ post.title }</h2>
            <p className="blog-post-meta">by {post.owner_id}</p>
            <img className="img-fluid" src={ post.media }/>
            <p> { post.description }</p>
            <p>Likes: { post.users_who_liked.length }</p>
            {
            post.tags.map((tag, tagIndex)=>{
                return (
                <i key={tagIndex}>#{tag}</i>
                )
            })
            }
        <br/>
            <button className="btn btn-sm btn-primary" onClick={event => like_a_post(event,post.id)}>❤️ Like This Post</button>
        
        </article>
        </>
      )
}

export default Article