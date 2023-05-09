import About from "./About"
import ContactUs from "./ContactUs"

const RightSidebar = () => {
  return (
    
        <div className="col-md-4">
            <div className="position-sticky" style={{top: '2rem'}}>
                <About/>
                <ContactUs />
            </div>  
        </div>
    
  )
}

export default RightSidebar