import { Demo } from "./components/Demo"
import { Features } from "./components/Features"
import Footer from "./components/Footer"
import ContactForm from "./components/Form"
import { Hero } from "./components/Hero"
import {Investment} from "./components/investment"
import { ProblemSolution } from "./components/ProblemSolution"
import { Steps } from "./components/Steps"
import { Testimonials } from "./components/Testimonials"


function App() {

  return (
    <>
      <Hero />
      <ProblemSolution />
      <Features />
      <Steps />
      <Investment />
      <ContactForm />
      <Testimonials />
      <Demo />
      <Footer />
    </>
  )
}

export default App
