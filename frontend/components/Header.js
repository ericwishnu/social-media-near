import {SignOutButton}  from '../ui-components';

const Header = (wallet) => {
  return (
    <header className="blog-header lh-1 py-3">
        <div className="row flex-nowrap justify-content-between align-items-center">
          <div className="col-4 pt-1">
            {/* <a className="link-secondary" href="#">Subscribe</a> */}
          </div>
          <div className="col-4 text-center">
            <a className="blog-header-logo text-dark" href="#">RECO</a>
          </div>
          <div className="col-4 d-flex justify-content-end align-items-center">
            <a className="link-secondary" href="#" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" className="mx-3" role="img" viewBox="0 0 24 24"><title>Search</title><circle cx="10.5" cy="10.5" r="7.5"/><path d="M21 21l-5.2-5.2"/></svg>
            </a>

            <SignOutButton  accountId={wallet.accountId} onClick={() => wallet.signOut()}/>
          </div>
        </div>
      </header>
  )
}

export default Header