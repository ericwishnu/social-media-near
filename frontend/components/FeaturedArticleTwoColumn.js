const FeaturedArticleTwoColumn = ({ allPosts, setUiPleaseWait, setAllPosts,  contract}) => {
  let featuredPostLeft;
  let featuredPostRight;
  let isFeaturedPostSet=false;

  function loadFeaturedArticle(posts){
    if(posts.length>0){
      if(posts[1]){
        
        featuredPostLeft = posts[1][1];
        featuredPostRight = posts[2][1];
      }else{
        featuredPostLeft = posts[1];
        featuredPostRight = posts[2];
      }
      isFeaturedPostSet =true;
      
      return  (
        <div className="row mb-2">
        <div className="col-md-6">
        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
            <strong className="d-inline-block mb-2 text-primary">World</strong>
            <h3 className="mb-0">{featuredPostLeft.title}</h3>
            {/* <div className="mb-1 text-muted">Nov 12</div> */}
            <p className="card-text mb-auto">{featuredPostLeft.description}</p>
            <a href="#" className="stretched-link">Continue reading</a>
            </div>
            <div className="col-auto d-none d-lg-block featured-post-2" style={{backgroundImage: `url(${featuredPostLeft.media})`}} >
              {/* <img className="bd-placeholder-img rounded mx-auto d-block"  src={featuredPostLeft.media} alt=""/> */}
            {/* <svg className="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
              <title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg> */}

            </div>
        </div>
        </div>
        <div className="col-md-6">
        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
            <strong className="d-inline-block mb-2 text-success">Design</strong>
            <h3 className="mb-0">{featuredPostRight.title}</h3>
            {/* <div className="mb-1 text-muted">Nov 11</div> */}
            <p className="mb-auto">{featuredPostRight.description}</p>
            <a href="#" className="stretched-link">Continue reading</a>
            </div>
            
            <div className="col-auto d-none d-lg-block featured-post-2" style={{backgroundImage: `url(${featuredPostRight.media})`}} >
            {/* <svg className="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg> */}
            {/* <img className="img-fluid bd-placeholder-img rounded mx-auto d-block"   src={featuredPostRight.media} alt=""/> */}
            </div>
        </div>
        </div>
    </div>
      );
    }
    return '';
  }

  return (
    loadFeaturedArticle(allPosts)
  )
}

export default FeaturedArticleTwoColumn