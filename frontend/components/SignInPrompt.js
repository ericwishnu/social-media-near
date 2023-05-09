import '../signin.css';

const SignInPrompt = ({greeting, onClick}) => {
  return (
    
    <main className="form-signin w-100 m-auto">
    <form>
    <a className="blog-header-logo text-dark" href="#">RECO</a>
      <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

      
      <button className='w-100 btn btn-lg btn-primary' onClick={onClick}>Sign in with NEAR Wallet</button>
      
    </form>
  </main>
  

  )
}

export default SignInPrompt