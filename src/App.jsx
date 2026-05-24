
import { motion } from 'framer-motion'

export default function App() {
  return (
    <div>

      <header className="header">
        <div className="container nav">
          <h2>INDIGO</h2>

          <nav className="menu">
            <a href="#about">About</a>
            <a href="#titles">Titles</a>
            <a href="#health">Health</a>
            <a href="#pedigree">Pedigree</a>
            <a href="#gallery">Gallery</a>
            <a href="#contact">Contact</a>
          </nav>

          <div>🇵🇱 🇬🇧 🇺🇦</div>
        </div>
      </header>

      <section className="hero">
        <img src="./photos/hero.jpg" alt="hero" />

        <div className="overlay"></div>

        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="hero-content"
        >
          <p>MULTI CHAMPION SAMOYED</p>

          <h1>INDIGO</h1>

          <p>
            Champion of Poland, Slovakia and Lithuania with an exceptional temperament,
            powerful structure and iconic Samoyed smile.
          </p>

          <br />

          <button className="btn">
            Contact About Puppies
          </button>
        </motion.div>
      </section>

      <section className="section container" id="about">
        <div className="grid">

          <img
            src="./photos/medal.jpg"
            style={{ width: '100%', borderRadius: '28px' }}
          />

          <div>
            <h2 className="title">About Indigo</h2>

            <p style={{ fontSize: '20px', lineHeight: '1.8' }}>
              Indigo is a Samoyed of exceptional character and striking beauty.
              As a Champion of Poland, Slovakia, and Lithuania, he has captivated
              judges across Central Europe with effortless movement and outstanding structure.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="titles" style={{ background: '#f7f7f7' }}>
        <div className="container">

          <h2 className="title">Titles & Achievements</h2>

          <div className="card-grid">

            <div className="card">
              <h3>🇵🇱 Champion of Poland</h3>
              <p>Awarded for excellence in structure, movement and temperament.</p>
            </div>

            <div className="card">
              <h3>🇸🇰 Champion of Slovakia</h3>
              <p>Awarded for excellence in structure, movement and temperament.</p>
            </div>

            <div className="card">
              <h3>🇱🇹 Champion of Lithuania</h3>
              <p>Awarded for excellence in structure, movement and temperament.</p>
            </div>

          </div>
        </div>
      </section>

      <section className="section container" id="health">
        <h2 className="title">Health & Genetics</h2>

        <div className="card-grid">
          <div className="card">✓ HD Clear</div>
          <div className="card">✓ ED Clear</div>
          <div className="card">✓ Eyes Passed</div>
        </div>
      </section>

      <section className="section" id="pedigree" style={{ background: '#f7f7f7' }}>
        <div className="container">

          <h2 className="title">Pedigree</h2>

          <div className="grid">
            <img src="./photos/pedigree-1.jpg" style={{ width: '100%', borderRadius: '24px' }} />
            <img src="./photos/pedigree-2.jpg" style={{ width: '100%', borderRadius: '24px' }} />
          </div>

        </div>
      </section>

      <section className="section container" id="gallery">

        <h2 className="title">Gallery</h2>

        <div className="gallery">
          <img src="./photos/show-1.jpg" />
          <img src="./photos/show-2.jpg" />
          <img src="./photos/gallery-1.jpg" />
          <img src="./photos/gallery-2.jpg" />
        </div>

      </section>

      <section className="section" id="contact" style={{ background: '#f7f7f7' }}>
        <div className="container">

          <h2 className="title">Contact</h2>

          <form className="contact-form">
            <input placeholder="Name" />
            <input placeholder="Email" />
            <textarea rows="6" placeholder="Message"></textarea>

            <button className="btn">
              Send Message
            </button>
          </form>

          <br />

          <p>
            samoyed.smiling.indigo@gmail.com
          </p>

        </div>
      </section>

      <footer className="footer">
        © 2026 Indigo Samoyed — Premium Landing Page
      </footer>

    </div>
  )
}
