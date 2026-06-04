import "./Testimonial.css"

import john from "../assets/john.png"
import sarah from "../assets/sarah.png"
import abdul from "../assets/abdul.png"
import anas from "../assets/anas.png"

const testimonials = [

  {
    image: sarah,
    name: "Sarah W.",
    review:
      "E-learn reputation for high-quality content, paired with its flexible structure, made it possible for me to dive into data analytics while managing family, health, and everyday life"
  },

  {
    image: john,
    name: "John Doe",
    review:
      "E-learn rebuilt my confidence and showed me I could dream bigger. It wasn't just about gaining knowledge—it was about believing in my potential again.."
  },

  {
    image: abdul,
    name: "Abdullahi M.",
    review:
      "I now feel more prepared to take leI now feel more prepared to take on leadership roles and have already started mentoring some of my colleagues"
  },

  {
    image: anas,
    name: "Anas A.",
    review:
      "Learning with Coursera has expanded my professional expertise by giving me access to cutting-edge research, practical tools, and global perspectives."
  }

]

function Testimonial() {

  return (

    <section>

      <h2>Why people choose Coursera</h2>

      <div className="testimonial-container">

        {
          testimonials.map((item, index) => (

            <div className="testimonial-card" key={index}>

              <div className="testimonial-image">

                <img src={item.image} alt={item.name} />

                <h3>{item.name}</h3>

              </div>

              <p>{item.review}</p>

            </div>

          ))
        }

      </div>

    </section>

  )

}

export default Testimonial