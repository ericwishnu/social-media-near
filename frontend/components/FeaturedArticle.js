import { url } from "inspector";

const FeaturedArticle = ({ allPosts, setUiPleaseWait, setAllPosts,  contract}) => {
  let featuredPost;
  let isFeaturedPostSet=false;

  function loadFeaturedArticle(posts){
    if(posts.length>0){
      if(posts[0]){
        
        featuredPost = posts[0][1];
      }else{
        featuredPost = posts[0];
      }
      isFeaturedPostSet =true;
      
      return  (
        <div className="p-4 p-md-5 mb-4 rounded featured-post text-bg-dark"  style={{backgroundImage: `url(${featuredPost.media})`}}>
          <div className="col-md-6 px-0">
            <h1 className="display-4 fst-italic">{featuredPost.title}</h1>
            <p className="lead my-3">{featuredPost.description}</p>
            
            {/* <p className="lead mb-0"><a href="#" className="text-white fw-bold">Continue reading...</a></p> */}
          </div>
        </div>
      );
    }
    return '';
  }
 
  return (
    <>
    { post = loadFeaturedArticle(allPosts)}
    </>
  )
}

export default FeaturedArticle