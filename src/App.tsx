import { useState } from 'react'
import type { FormEvent } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import towingHeader from './assets/towing_header.png'
import './App.css'

const phoneDisplay = '(773) 647-2002'
const phoneNumber = '7736472002'

function PhoneIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.7 2.4 9.4 7c.3.6.2 1.2-.3 1.7l-1.4 1.4a14.8 14.8 0 0 0 6.2 6.2l1.4-1.4c.5-.5 1.1-.6 1.7-.3l4.6 2.7c.5.3.8.9.7 1.5l-.3 2.1c-.1.7-.7 1.2-1.4 1.2C10.3 22 2 13.7 2 3.4 2 2.7 2.5 2.1 3.2 2l2.1-.3c.6-.1 1.1.2 1.4.7Z" /></svg>
}

type FieldName = 'name' | 'phone' | 'email' | 'service' | 'location' | 'vehicle'
type FieldIconName = FieldName | 'details'

const iconPaths: Record<FieldIconName, string> = {
  name: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8c.7-4 3-6 7-6s6.3 2 7 6',
  phone: 'M6.7 2.4 9.4 7c.3.6.2 1.2-.3 1.7l-1.4 1.4a14.8 14.8 0 0 0 6.2 6.2l1.4-1.4c.5-.5 1.1-.6 1.7-.3l4.6 2.7c.5.3.8.9.7 1.5l-.3 2.1c-.1.7-.7 1.2-1.4 1.2C10.3 22 2 13.7 2 3.4 2 2.7 2.5 2.1 3.2 2l2.1-.3c.6-.1 1.1.2 1.4.7Z',
  email: 'M3 5h18v14H3V5Zm1 1 8 7 8-7',
  service: 'M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.5 2.5-3-3 2.5-2.5Z',
  location: 'M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Zm-8-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
  vehicle: 'M5 11l2-5h10l2 5m-14 0h14l2 3v5h-3v-2H6v2H3v-5l2-3Zm2 3h2m6 0h2',
  details: 'M4 4h16v13H8l-4 4V4Zm4 5h8m-8 4h5',
}

function FieldIcon({ name }: { name: FieldIconName }) {
  return <svg className="field-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={iconPaths[name]} /></svg>
}

function App() {
  const [urgent, setUrgent] = useState(true)
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [formState, handleSubmit, resetForm] = useForm('xdeodlea', {
    data: {
      timing: () => urgent ? 'I need help now' : 'Schedule service',
      _subject: 'New towing service request',
      source: 'Cabrera Towing website',
      form_language: 'English / Español',
    },
  })

  function clearFieldError(field: FieldName) {
    setFieldErrors((current) => ({ ...current, [field]: undefined }))
  }

  function handleRequestSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    const errors: Partial<Record<FieldName, string>> = {}
    const required: FieldName[] = ['name', 'phone', 'email', 'service', 'location', 'vehicle']

    required.forEach((field) => {
      if (!String(values.get(field) ?? '').trim()) errors[field] = 'Please fill out this field.'
    })

    const name = String(values.get('name') ?? '').trim()
    const phone = String(values.get('phone') ?? '').replace(/\D/g, '')
    const email = String(values.get('email') ?? '').trim()
    const location = String(values.get('location') ?? '').trim()
    const vehicle = String(values.get('vehicle') ?? '').trim()
    if (name && name.length < 2) errors.name = 'Invalid name.'
    if (phone && phone.length < 10) errors.phone = 'Invalid phone number.'
    if (email && !/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Invalid email address.'
    if (location && location.length < 3) errors.location = 'Invalid pickup location.'
    if (vehicle && vehicle.length < 3) errors.vehicle = 'Invalid vehicle information.'

    setFieldErrors(errors)
    const firstInvalid = required.find((field) => errors[field])
    if (firstInvalid) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    void handleSubmit(event)
  }

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

          <form className="request-form" onSubmit={handleRequestSubmit} noValidate>
            <div className="form-header"><div><span>Service request · Solicitud de servicio</span><h3>How can we help?<small>¿Cómo podemos ayudarle?</small></h3></div><span className="secure-note">Sent securely<br />Enviado de forma segura</span></div>
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
                <label>Phone number · Teléfono <b aria-hidden="true">*</b><span className="field-control"><FieldIcon name="phone" /><input name="phone" type="tel" autoComplete="tel" required minLength={10} placeholder="(773) 555-0123" aria-invalid={Boolean(fieldErrors.phone)} onChange={() => clearFieldError('phone')} /></span>{fieldErrors.phone && <span className="field-error">{fieldErrors.phone}</span>}<ValidationError field="phone" errors={formState.errors} /></label>
              </div>
              <label>Email address · Correo electrónico <b aria-hidden="true">*</b><span className="field-control"><FieldIcon name="email" /><input name="email" type="email" autoComplete="email" required placeholder="you@example.com" aria-invalid={Boolean(fieldErrors.email)} onChange={() => clearFieldError('email')} /></span>{fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}<ValidationError field="email" errors={formState.errors} /></label>
              <label>Service needed · Servicio necesario <b aria-hidden="true">*</b><span className="field-control"><FieldIcon name="service" /><select name="service" required defaultValue="" aria-invalid={Boolean(fieldErrors.service)} onChange={() => clearFieldError('service')}><option value="" disabled>Select a service / Seleccione un servicio</option><option>Local towing / Grúa local</option><option>Junk car removal / Retiro de auto chatarra</option><option>Vehicle transport / Transporte de vehículo</option><option>Other roadside help / Otra asistencia</option></select></span>{fieldErrors.service && <span className="field-error">{fieldErrors.service}</span>}<ValidationError field="service" errors={formState.errors} /></label>
              <label>Pickup location · Ubicación de recogida <b aria-hidden="true">*</b><span className="field-control"><FieldIcon name="location" /><input name="location" required minLength={3} placeholder="Address or landmark / Dirección o punto de referencia" aria-invalid={Boolean(fieldErrors.location)} onChange={() => clearFieldError('location')} /></span>{fieldErrors.location && <span className="field-error">{fieldErrors.location}</span>}<ValidationError field="location" errors={formState.errors} /></label>
              <label>Vehicle information · Información del vehículo <b aria-hidden="true">*</b><span className="field-control"><FieldIcon name="vehicle" /><input name="vehicle" required minLength={3} placeholder="Year, make, model, color / Año, marca, modelo, color" aria-invalid={Boolean(fieldErrors.vehicle)} onChange={() => clearFieldError('vehicle')} /></span>{fieldErrors.vehicle && <span className="field-error">{fieldErrors.vehicle}</span>}<ValidationError field="vehicle" errors={formState.errors} /></label>
              <label>Anything else? · ¿Algo más? <small>(Optional / Opcional)</small><span className="field-control textarea-control"><FieldIcon name="details" /><textarea name="details" rows={3} placeholder="Destination, access notes / Destino, notas de acceso" /></span><ValidationError field="details" errors={formState.errors} /></label>
              <ValidationError errors={formState.errors} className="error-message" />
              <button className="submit-button" type="submit" disabled={formState.submitting}>{formState.submitting ? 'Sending · Enviando…' : 'Send request · Enviar solicitud'} {!formState.submitting && <span>→</span>}</button>
              <p className="form-disclaimer">By submitting, you agree that Cabrera Towing may contact you about this request.<br />Al enviar, acepta que Cabrera Towing se comunique con usted sobre esta solicitud.</p>
            </>}
          </form>
        </section>
      </main>

      <footer><div className="brand"><span className="brand-mark">CT</span><span>Cabrera Towing <small>Inc.</small></span></div><p>Fast and reliable service · Servicio rápido y confiable</p><a href={`tel:${phoneNumber}`}>{phoneDisplay}</a></footer>
    </div>
  )
}

export default App
