import { Contract } from 'near-api-js';
import React from 'react';

export function SignInPrompt({greeting, onClick}) {
  return (
    <main>
      <h1>
      Social Media Dapp
      </h1>
      
      <br/>
      <p style={{ textAlign: 'center' }}>
        <button onClick={onClick}>Sign in with NEAR Wallet</button>
      </p>
    </main>
  );
}

export function AddPost({ contract, seeAllPosts }){
  const [uiPleaseWait, setUiPleaseWait] = React.useState(true);

  function handlePostSubmission(e){
    e.preventDefault();
    setUiPleaseWait(true);

    
    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;
    var tags = document.getElementById('tags').value;
    var media = document.getElementById('media').value;
    //call function in near-interface.js
    contract.add_post(title, description, tags, media)
    .then(async() => { return contract.get_all_posts();})
    .then(seeAllPosts)
    .finally(() => {
      setUiPleaseWait(false)
    });

    
  }

  return (
    <>
      <h3>Add Post</h3>
      <form onSubmit={handlePostSubmission}>
        <label>Title</label><br/>
        <input placeholder="title" id="title"/><br/>
        <label>Description</label><br/>
        <input placeholder="description" id="description"/><br/>
        <label>Tags</label><br/>
        <input placeholder="tag1,tag2,tag3" id="tags"/><br/>
        <label>Media</label><br/>
        <input placeholder="media" id="media"/><br/>
        <button>Upload Post</button>
      </form>
    </>
  )
}
export function Post({ post, setUiPleaseWait, setAllPosts, contract}) {
  

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
    <h3>{ post.title }</h3>
    <p> { post.description }</p>
    <img src={ post.media } width="300"/>
    <p>Posted By: { post.owner_id}</p>
    <p>Likes: { post.users_who_liked.length }</p>
    {
      post.tags.map((tag, tagIndex)=>{
        return (
          <i key={tagIndex}>#{tag}</i>
        )
      })
    }
    <br/><br/>
    <button onClick={event => like_a_post(event,post.id)}>❤️ Like This Post</button>
    <br/>
    </>
  )
}

export function SignOutButton({accountId, onClick}) {
  return (
    <button style={{ float: 'right' }} onClick={onClick} className="btn btn-sm btn-outline-secondary">
      Sign out {accountId}
    </button>
  );
}

export function PostsByTag({ setUiPleaseWait, contract, setAllPosts }){

  const [ postByTag, setPostByTag] = React.useState([]);
function get_posts_by_tag(e){
  e.preventDefault();
  setUiPleaseWait(true);

  var tag = document.getElementById("tag").value;

  contract.get_posts_by_tag(tag)
    .then(setPostByTag)
    .finally( () =>{
      setUiPleaseWait(false);
    });
}

  return (
    <>
    <h2>Get Posts By Tag</h2>
    <form onSubmit={get_posts_by_tag}>
      <label>Tag</label><br/>
      <input placeholder='tag' id='tag'/>
      <button>Get Posts By Tag</button>
      <AllPosts allPosts={postByTag} setUiPleaseWait={setUiPleaseWait} 
        setAllPosts={setAllPosts} contract={contract}
      />
    </form>
    </>
  )
}

export function AllPosts({ allPosts, setUiPleaseWait, setAllPosts, contract }){
  return (
    <>
    <h2>All Posts</h2>
    { 
    
      allPosts ? allPosts.map((post,index) =>{
        if(post[1]){
          post = post[1]
        }
        return (
          <div key={index}>
            <Post post={post} setUiPleaseWait={setUiPleaseWait} 
            setAllPosts={setAllPosts} contract={contract}/>
          </div> 
        )
      })
      : "No Posts"
    }
    <br/><br/>
    </>
  )
}