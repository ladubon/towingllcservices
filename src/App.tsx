import { useState } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import towingHeader from './assets/towing_header.png'
import './App.css'

const phoneDisplay = '(773) 647-2002'
const phoneNumber = '7736472002'

function PhoneIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.7 2.4 9.4 7c.3.6.2 1.2-.3 1.7l-1.4 1.4a14.8 14.8 0 0 0 6.2 6.2l1.4-1.4c.5-.5 1.1-.6 1.7-.3l4.6 2.7c.5.3.8.9.7 1.5l-.3 2.1c-.1.7-.7 1.2-1.4 1.2C10.3 22 2 13.7 2 3.4 2 2.7 2.5 2.1 3.2 2l2.1-.3c.6-.1 1.1.2 1.4.7Z" /></svg>
}

function App() {
  const [urgent, setUrgent] = useState(true)
  const [formState, handleSubmit, resetForm] = useForm('xdeodlea', {
    data: {
      timing: () => urgent ? 'I need help now' : 'Schedule service',
      _subject: 'New towing service request',
      source: 'Cabrera Towing website',
    },
  })

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Cabrera Towing home"><span className="brand-mark">CT</span><span>Cabrera Towing <small>Inc.</small></span></a>
        <nav aria-label="Main navigation"><a href="#services">Services</a><a href="#request">Request service</a></nav>
        <a className="call-button compact" href={`tel:${phoneNumber}`}><PhoneIcon /> Call now</a>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <img className="hero-art" src={towingHeader} alt="Cabrera Towing service truck, junk car cash offers, and phone number 773-647-2002" />
          <div className="hero-overlay">
            <span className="eyebrow"><i /> Available 24/7 · Disponible 24/7</span>
            <h1 id="hero-title">Fast help.<br />Fair service.</h1>
            <p>Towing and junk car removal when you need it. Call or text for quick service and a free offer.</p>
            <div className="hero-actions">
              <a className="call-button" href={`tel:${phoneNumber}`}><PhoneIcon /> Call {phoneDisplay}</a>
              <a className="secondary-button" href="#request">Request service</a>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Service highlights">
          <div><strong>24/7</strong><span>Fast response</span></div><div><strong>Cash</strong><span>For junk cars</span></div>
          <div><strong>Any condition</strong><span>Running or not</span></div><div><strong>No obligation</strong><span>Free offer</span></div>
        </section>

        <section className="services section" id="services">
          <div className="section-heading"><span className="eyebrow dark">What we do</span><h2>Roadside help and a clear way forward.</h2><p>Whether you are stuck or ready to clear an unwanted vehicle, we make the next step simple.</p></div>
          <div className="service-grid">
            <article><span className="service-number">01</span><h3>Local towing</h3><p>Dependable vehicle transport with straightforward communication from pickup to drop-off.</p></article>
            <article><span className="service-number">02</span><h3>Junk car removal</h3><p>We buy unwanted cars in any condition—running or not, with or without a title.</p></article>
            <article><span className="service-number">03</span><h3>Free cash offer</h3><p>Tell us about your vehicle and get a no-obligation offer by phone or text.</p></article>
          </div>
        </section>

        <section className="request-section" id="request">
          <div className="request-copy">
            <span className="eyebrow">Need help?</span><h2>Tell us where you are.</h2>
            <p>Complete the form and we’ll receive your request by email. For an emergency, call directly.</p>
            <a className="phone-link" href={`tel:${phoneNumber}`}><PhoneIcon /><span><small>Call or text</small>{phoneDisplay}</span></a>
          </div>

          <form className="request-form" onSubmit={handleSubmit}>
            <div className="form-header"><div><span>Service request</span><h3>How can we help?</h3></div><span className="secure-note">Sent securely</span></div>
            {formState.succeeded ? (
              <div className="form-success" role="status">
                <span>✓</span><h3>Request received</h3><p>Thanks! We’ll contact you as soon as possible.</p>
                <button type="button" onClick={resetForm}>Send another request</button>
              </div>
            ) : <>
              <div className="urgency-toggle" aria-label="Request timing">
                <button type="button" className={urgent ? 'active' : ''} onClick={() => setUrgent(true)}>I need help now</button>
                <button type="button" className={!urgent ? 'active' : ''} onClick={() => setUrgent(false)}>Schedule service</button>
              </div>
              <div className="field-row">
                <label>Your name<input name="name" autoComplete="name" required placeholder="Full name" /><ValidationError field="name" errors={formState.errors} /></label>
                <label>Phone number<input name="phone" type="tel" autoComplete="tel" required placeholder="(773) 555-0123" /><ValidationError field="phone" errors={formState.errors} /></label>
              </div>
              <label>Email address <small>(optional)</small><input name="email" type="email" autoComplete="email" placeholder="you@example.com" /><ValidationError field="email" errors={formState.errors} /></label>
              <label>Service needed<select name="service" required defaultValue=""><option value="" disabled>Select a service</option><option>Local towing</option><option>Junk car removal / cash offer</option><option>Vehicle transport</option><option>Other roadside help</option></select><ValidationError field="service" errors={formState.errors} /></label>
              <label>Pickup location<input name="location" required placeholder="Address, intersection, or landmark" /><ValidationError field="location" errors={formState.errors} /></label>
              <label>Vehicle information<input name="vehicle" placeholder="Year, make, model, and color" /><ValidationError field="vehicle" errors={formState.errors} /></label>
              <label>Anything else?<textarea name="details" rows={3} placeholder="Where should it go? Is the vehicle accessible?" /><ValidationError field="details" errors={formState.errors} /></label>
              <ValidationError errors={formState.errors} className="error-message" />
              <button className="submit-button" type="submit" disabled={formState.submitting}>{formState.submitting ? 'Sending request…' : 'Send service request'} {!formState.submitting && <span>→</span>}</button>
              <p className="form-disclaimer">By submitting, you agree that Cabrera Towing may contact you about this request.</p>
            </>}
          </form>
        </section>
      </main>

      <footer><div className="brand"><span className="brand-mark">CT</span><span>Cabrera Towing <small>Inc.</small></span></div><p>Fast and reliable service · Servicio rápido y confiable</p><a href={`tel:${phoneNumber}`}>{phoneDisplay}</a></footer>
    </div>
  )
}

export default App
