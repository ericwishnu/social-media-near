import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import Article from "./Article";

const ArticleList = ({ allPosts, setUiPleaseWait, setAllPosts, contract }) => {
  return (
    <>
    
        <div className="col-md-8">
            <h3 className="pb-4 mb-4 fst-italic border-bottom">
                From Reco Blockchain
            </h3>   
        
        {
              allPosts ? allPosts.map((post,index) =>{               
                if(post[1]){
                    post = post[1]
                }
                
                return (
                <Article post={post} setUiPleaseWait={setUiPleaseWait} setAllPosts={setAllPosts} contract={contract}/>
                )
              }): "No Posts"
        }
    </div>
    
    </>
  
  )
}


export default ArticleList