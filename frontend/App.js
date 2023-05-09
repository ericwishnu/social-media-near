import 'regenerator-runtime/runtime';
import React from 'react';

// import './assets/global.css';

import { AddPost, AllPosts, PostsByTag } from './ui-components';
import Navigation from './components/Navigation';
import Header from './components/Header';
import FeaturedArticle from './components/FeaturedArticle';
import FeaturedArticleTwoColumn from './components/FeaturedArticleTwoColumn';
import ArticleList from './components/ArticleList';
import RightSidebar from './components/RightSidebar';
import Footer from './components/Footer';
// import SignInPrompt from './components/SignInPrompt';
import "bootstrap/dist/css/bootstrap.min.css";
import "./blog.css";

export default function App({ isSignedIn, contract, wallet,SignInPrompt }) {
  const [valueFromBlockchain, setValueFromBlockchain] = React.useState();
  const [uiPleaseWait, setUiPleaseWait] = React.useState(true);
  const [allPosts, setAllPosts] = React.useState([]);

  React.useEffect(() => {
    contract.get_all_posts()
      .then(setAllPosts)
      .catch(alert)
      .finally(()=> {
        setUiPleaseWait(false);
      });
  },[]);

  /// If user not signed-in with wallet - show prompt
  if (!isSignedIn) {
    
    // Sign-in flow will reload the page later
    return <SignInPrompt greeting={valueFromBlockchain} onClick={() => wallet.signIn()}/>;
  }


  return (
    <>
      <main className={uiPleaseWait ? 'please-wait' : ''}>
        <div className='container'>
          <Header wallet={wallet}/>
          <Navigation />
        </div>
        <div className='container'>
          <FeaturedArticle allPosts={allPosts} setUiPleaseWait={setUiPleaseWait} 
                setAllPosts={setAllPosts} contract={contract}/>
          <FeaturedArticleTwoColumn allPosts={allPosts} setUiPleaseWait={setUiPleaseWait} 
                setAllPosts={setAllPosts} contract={contract}/>
          <div className="row g-5">
            <ArticleList allPosts={allPosts} setUiPleaseWait={setUiPleaseWait} 
                setAllPosts={setAllPosts} contract={contract}/>
          
            <RightSidebar/>
          </div>
          
          <PostsByTag setUiPleaseWait={setUiPleaseWait} contract={contract}
         setAllPosts={setAllPosts} />

        
        <AddPost contract={contract} seeAllPosts={setAllPosts}/>
        <Footer/>
        </div>
        
        <br/> <br/>
      </main>


        
    </>
  );
}
