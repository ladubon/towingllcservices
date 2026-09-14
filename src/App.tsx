import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import towingHeader from './assets/cabrera_header.png'
import cabreraLogo from './assets/cabrera_logo.png'

//slideshow images
import work1 from './assets/work_1.png'
import work2 from './assets/work_2.png'
import work3 from './assets/work_3.png'
import work4 from './assets/work_4.png'
import work5 from './assets/work_5.png'
import work6 from './assets/work_6.png'
import work7 from './assets/work_7.png'
import work8 from './assets/work_8.png'
import './App.css'

const phoneDisplay = '(773) 647-2002'
const phoneNumber = '7736472002'
const workImages = [work1, work2, work3, work4, work5, work6, work7, work8]

function PhoneIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.7 2.4 9.4 7c.3.6.2 1.2-.3 1.7l-1.4 1.4a14.8 14.8 0 0 0 6.2 6.2l1.4-1.4c.5-.5 1.1-.6 1.7-.3l4.6 2.7c.5.3.8.9.7 1.5l-.3 2.1c-.1.7-.7 1.2-1.4 1.2C10.3 22 2 13.7 2 3.4 2 2.7 2.5 2.1 3.2 2l2.1-.3c.6-.1 1.1.2 1.4.7Z" /></svg>
}

type FieldName = 'name' | 'phone' | 'service' | 'location'
type FieldIconName = FieldName | 'details'

const iconPaths: Record<FieldIconName, string> = {
  name: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8c.7-4 3-6 7-6s6.3 2 7 6',
  phone: 'M6.7 2.4 9.4 7c.3.6.2 1.2-.3 1.7l-1.4 1.4a14.8 14.8 0 0 0 6.2 6.2l1.4-1.4c.5-.5 1.1-.6 1.7-.3l4.6 2.7c.5.3.8.9.7 1.5l-.3 2.1c-.1.7-.7 1.2-1.4 1.2C10.3 22 2 13.7 2 3.4 2 2.7 2.5 2.1 3.2 2l2.1-.3c.6-.1 1.1.2 1.4.7Z',
  service: 'M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.5 2.5-3-3 2.5-2.5Z',
  location: 'M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Zm-8-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
  details: 'M4 4h16v13H8l-4 4V4Zm4 5h8m-8 4h5',
}

function FieldIcon({ name }: { name: FieldIconName }) {
  return <svg className="field-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={iconPaths[name]} /></svg>
}

function App() {
  const [urgent, setUrgent] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({})
  //Formspree format when forwarded towards set email params
  const [formState, handleSubmit, resetForm] = useForm('xdeodlea', {
    data: {
      timing: () => urgent ? 'I need help now' : 'Schedule service',
      _subject: 'New towing service request',
      source: 'Cabrera Towing website',
    },
  })

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((current) => (current + 1) % workImages.length)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [])

  function clearFieldError(field: FieldName) {
    setFieldErrors((current) => ({ ...current, [field]: undefined }))
  }

  function handleRequestSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    const errors: Partial<Record<FieldName, string>> = {}
    const required: FieldName[] = ['name', 'phone', 'service', 'location']

    required.forEach((field) => {
      if (!String(values.get(field) ?? '').trim()) errors[field] = 'Please fill out this field.'
    })

    //ensure all fields are filled out with somewhat accurate information before sending request
    const name = String(values.get('name') ?? '').trim()
    const rawPhone = String(values.get('phone') ?? '').trim()
    const phoneDigits = rawPhone.replace(/\D/g, '')
    const location = String(values.get('location') ?? '').trim()
    if (name && name.length < 2) errors.name = 'Invalid name.'
    if (rawPhone && (!/^[0-9()+.\-\s]+$/.test(rawPhone) || phoneDigits.length < 10 || phoneDigits.length > 15)) errors.phone = 'Please enter a valid phone number.'
    if (location && location.length < 3) errors.location = 'Invalid pickup location.'

    setFieldErrors(errors)
    const firstInvalid = required.find((field) => errors[field])
    if (firstInvalid) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    void handleSubmit(event)
  }

  
  return ( //page styling

    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Cabrera Towing home"><span className="brand-mark">CT</span><span>Cabrera Towing <small>Inc.</small></span></a>
        <nav aria-label="Main navigation"><a href="#services">Services · Servicios</a><a href="#request">Request · Solicitud</a></nav>
        <div className="top-actions">
          <a className="message-button compact" href={`sms:${phoneNumber}`}>Text Now / Mensaje Ahora</a>
          <a className="call-button compact" href={`tel:${phoneNumber}`}><PhoneIcon /> Call Now / Llame Ahora</a>
        </div>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-overlay">
            <span className="eyebrow"><i /> Available 24/7 · Disponible 24/7</span>
            <h1 id="hero-title">Fast roadside help.<small>Ayuda rápida en carretera.</small></h1>
            <p>Towing and roadside assistance when you need it.<br /><strong>Servicio de grúa y asistencia cuando la necesite.</strong></p>
            <p className="hours-line"><span>Hours / Horario</span> Open 24 hours, 7 days a week<br />Abierto las 24 horas, los 7 días</p>
          </div>
          <div className="hero-image-wrap"><img className="hero-art" src={towingHeader} alt="Cabrera Towing trucks and bilingual 24-hour roadside service information" /></div>
        </section>

        <section className="services section" id="services">
          <div className="section-heading"><span className="eyebrow dark">What we do · Lo que hacemos</span><h2>Roadside help and a clear way forward.</h2><p>Asistencia en carretera y una solución clara. Estamos listos para ayudarle en inglés o español.</p></div>
          <div className="service-grid">
            <article><h3>Local towing · Grúa local</h3><p>Dependable vehicle transport with clear communication. Transporte confiable con comunicación clara.</p></article>
            <article><h3>Roadside help · Asistencia</h3><p>Jump starts, tire changes, and lockout help. Arranque de batería, cambio de llanta y apertura de puertas.</p></article>
            <article><h3>Available 24/7 · 24 horas</h3><p>Call or text any time for quick assistance. Llame o mande mensaje en cualquier momento.</p></article>
          </div>
        </section>

        <section className="work-section" aria-labelledby="work-title">
          <div className="section-heading">
            <span className="eyebrow dark">Our work · Nuestro trabajo</span>
            <h2 id="work-title">Ready when you need us.</h2>
            <p>Reliable towing and roadside service throughout the community. Servicio confiable cuando más lo necesita.</p>
          </div>

          <div className="slideshow">
            <div className="slide-frame">
              {workImages.map((image, index) => (
                <img key={image} className={index === currentSlide ? 'work-slide active' : 'work-slide'} src={image} alt="Cabrera Towing service work" aria-hidden={index !== currentSlide} />
              ))}
              <button className="slide-arrow previous" type="button" onClick={() => setCurrentSlide((current) => (current - 1 + workImages.length) % workImages.length)} aria-label="Previous photo">‹</button>
              <button className="slide-arrow next" type="button" onClick={() => setCurrentSlide((current) => (current + 1) % workImages.length)} aria-label="Next photo">›</button>
            </div>
            <div className="slide-dots" aria-label="Choose a photo">
              {workImages.map((_, index) => <button key={index} type="button" className={index === currentSlide ? 'active' : ''} onClick={() => setCurrentSlide(index)} aria-label="View work photo" aria-current={index === currentSlide ? 'true' : undefined} />)}
            </div>
          </div>
        </section>

        <section className="request-section" id="request">
          <div className="request-copy">
            <span className="eyebrow">Need help? · ¿Necesita ayuda?</span><h2>Tell us where you are.<small>Díganos dónde está.</small></h2>
            <p>Send a quick request and we’ll contact you. Envíe una solicitud rápida y nos comunicaremos con usted.</p>
            <a className="phone-link" href={`tel:${phoneNumber}`}><PhoneIcon /><span><small>Call or text · Llame o mande mensaje</small>{phoneDisplay}</span></a>
            <div className="hours-card"><strong>Hours · Horario</strong><span>Open 24 hours · Abierto las 24 horas</span><span>Monday – Sunday · Lunes – Domingo</span></div>
          </div>

          <div className="request-form-wrap">
          <img className="form-logo" src={cabreraLogo} alt="Cabrera Towing logo" />
          <form className="request-form" onSubmit={handleRequestSubmit} noValidate>
            <div className="form-header"><div><span>Service request · Solicitud de servicio</span><h3>How can we help?<small>¿Cómo podemos ayudarle?</small></h3></div></div>
            {formState.succeeded ? (
              <div className="form-success" role="status">
                <span>✓</span><h3>Request received</h3><p>Thanks! We’ll contact you as soon as possible.<br />¡Gracias! Nos comunicaremos con usted lo antes posible.</p>
                <button type="button" onClick={resetForm}>Send another request · Enviar otra solicitud</button>
              </div>
            ) : <>
              <div className="urgency-toggle" aria-label="Request timing">
                <button type="button" className={urgent ? 'active' : ''} onClick={() => setUrgent(true)}>Help now · Ayuda ahora</button>
                <button type="button" className={!urgent ? 'active' : ''} onClick={() => setUrgent(false)}>Schedule · Programar</button>
              </div>
              <div className="field-row">
                <label>Your name · Su nombre <b aria-hidden="true">*</b><span className="field-control"><FieldIcon name="name" /><input name="name" autoComplete="name" required minLength={2} placeholder="Full name / Nombre completo" aria-invalid={Boolean(fieldErrors.name)} onChange={() => clearFieldError('name')} /></span>{fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}<ValidationError field="name" errors={formState.errors} /></label>
                <label>Phone number · Teléfono <b aria-hidden="true">*</b><span className="field-control"><FieldIcon name="phone" /><input name="phone" type="tel" inputMode="tel" autoComplete="tel" required minLength={10} maxLength={24} pattern="[0-9()+.\-\s]+" placeholder="(773) 555-0123" aria-invalid={Boolean(fieldErrors.phone)} onChange={() => clearFieldError('phone')} /></span>{fieldErrors.phone && <span className="field-error">{fieldErrors.phone}</span>}<ValidationError field="phone" errors={formState.errors} /></label>
              </div>
              <label>Service needed · Servicio necesario <b aria-hidden="true">*</b><span className="field-control"><FieldIcon name="service" /><select name="service" required defaultValue="" aria-invalid={Boolean(fieldErrors.service)} onChange={() => clearFieldError('service')}><option value="" disabled>Select a service / Seleccione un servicio</option><option>Local towing / Grúa local</option><option>Junk car removal / Retiro de auto chatarra</option><option>Vehicle transport / Transporte de vehículo</option><option>Other roadside help / Otra asistencia</option></select></span>{fieldErrors.service && <span className="field-error">{fieldErrors.service}</span>}<ValidationError field="service" errors={formState.errors} /></label>
              <label>Pickup location · Ubicación de recogida <b aria-hidden="true">*</b><span className="field-control"><FieldIcon name="location" /><input name="location" required minLength={3} placeholder="Address or landmark / Dirección o punto de referencia" aria-invalid={Boolean(fieldErrors.location)} onChange={() => clearFieldError('location')} /></span>{fieldErrors.location && <span className="field-error">{fieldErrors.location}</span>}<ValidationError field="location" errors={formState.errors} /></label>
              <label>Notes · Notas <small>(Optional / Opcional)</small><span className="field-control textarea-control"><FieldIcon name="details" /><textarea name="details" rows={3} placeholder="Explain what you need / Explique lo que necesita" /></span><ValidationError field="details" errors={formState.errors} /></label>
              <ValidationError errors={formState.errors} className="error-message" />
              <button className="submit-button" type="submit" disabled={formState.submitting}>{formState.submitting ? 'Sending · Enviando…' : 'Send request · Enviar solicitud'} {!formState.submitting && <span>→</span>}</button>
              <p className="form-disclaimer">By submitting, you agree that Cabrera Towing may contact you about this request.<br />Al enviar, acepta que Cabrera Towing se comunique con usted sobre esta solicitud.</p>
            </>}
          </form>
          </div>
        </section>
      </main>

      <footer><div className="brand"><span className="brand-mark">CT</span><span>Cabrera Towing <small>Inc.</small></span></div><p>Fast and reliable service · Servicio rápido y confiable</p><a href={`tel:${phoneNumber}`}>{phoneDisplay}</a></footer>
    </div>
  )
}

export default App
