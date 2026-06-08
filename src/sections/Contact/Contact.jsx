import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiSend, FiCheck } from 'react-icons/fi';

const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com/abhishek-kumar', icon: FiGithub, color: '#fff' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/abhishek-kumar', icon: FiLinkedin, color: '#0A66C2' },
  { name: 'Twitter', url: 'https://twitter.com/abhishek_kumar', icon: FiTwitter, color: '#1DA1F2' },
  { name: 'Email', url: 'mailto:abhishek@example.com', icon: FiMail, color: '#00E5FF' },
];

const Contact = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Invalid email';
    if (!formData.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus('sending');

    // Simulate send
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setStatus('sent');
    setFormData({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => setStatus('idle'), 4000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label">Get In Touch</div>
          <h2 className="section-title">
            Let's{' '}
            <span className="gradient-text">Connect</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Whether it's a project, internship opportunity, or just a chat about tech — I'm always open to connecting.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
          {/* LEFT — Info */}
          <div className="flex flex-col gap-8">
            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl"
              style={{
                background: 'rgba(0,229,255,0.05)',
                border: '1px solid rgba(0,229,255,0.15)',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: 'rgba(0,229,255,0.1)' }}
                >
                  ✉️
                </div>
                <div>
                  <h3
                    className="font-bold"
                    style={{ fontFamily: 'var(--font-grotesk)' }}
                  >
                    Open to Opportunities
                  </h3>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    Actively looking for internships
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                I'm currently available for{' '}
                <strong style={{ color: 'var(--primary)' }}>software engineering internships</strong>,
                part-time contracts, and freelance projects. Response time: usually within 24 hours.
              </p>
            </motion.div>

            {/* Contact details */}
            <div className="flex flex-col gap-3">
              {[
                { icon: '📧', label: 'Email', value: 'abhishek@example.com', href: 'mailto:abhishek@example.com' },
                { icon: '📍', label: 'Location', value: 'India', href: null },
                { icon: '⏰', label: 'Response Time', value: 'Within 24 hours', href: null },
              ].map(({ icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-4 rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <span className="text-xl">{icon}</span>
                  <div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-medium hover:text-cyan-400 transition-colors"
                        style={{ color: 'var(--primary)', cursor: 'none' }}
                      >
                        {value}
                      </a>
                    ) : (
                      <div className="text-sm font-medium">{value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p
                className="text-xs font-mono uppercase tracking-widest mb-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                Find me online
              </p>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map(({ name, url, icon: Icon, color }) => (
                  <motion.a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'var(--text-secondary)',
                      cursor: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = color;
                      e.currentTarget.style.background = `${color}15`;
                      e.currentTarget.style.borderColor = `${color}40`;
                      e.currentTarget.style.boxShadow = `0 8px 25px ${color}25`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl flex flex-col gap-5"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
              }}
              noValidate
            >
              <h3
                className="text-xl font-bold mb-2"
                style={{ fontFamily: 'var(--font-grotesk)' }}
              >
                Send a Message
              </h3>

              {/* Name & Email row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-xs font-mono uppercase tracking-wider mb-2"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Abhishek Kumar"
                    className="form-input"
                    style={{
                      borderColor: errors.name ? 'rgba(239,68,68,0.5)' : undefined,
                    }}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400 mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-xs font-mono uppercase tracking-wider mb-2"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="hello@example.com"
                    className="form-input"
                    style={{
                      borderColor: errors.email ? 'rgba(239,68,68,0.5)' : undefined,
                    }}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  className="block text-xs font-mono uppercase tracking-wider mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Internship Opportunity / Project Collaboration"
                  className="form-input"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  className="block text-xs font-mono uppercase tracking-wider mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hi Abhishek, I'd love to discuss..."
                  rows={5}
                  className="form-input resize-none"
                  style={{
                    borderColor: errors.message ? 'rgba(239,68,68,0.5)' : undefined,
                  }}
                />
                {errors.message && (
                  <p className="text-xs text-red-400 mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full justify-center py-4 text-base"
                style={{ cursor: 'none' }}
              >
                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <FiSend size={16} />
                      <span>Send Message</span>
                    </motion.span>
                  )}
                  {status === 'sending' && (
                    <motion.span
                      key="sending"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <div
                        className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
                        style={{ borderColor: '#050816 transparent #050816 #050816' }}
                      />
                      <span>Sending...</span>
                    </motion.span>
                  )}
                  {status === 'sent' && (
                    <motion.span
                      key="sent"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <FiCheck size={16} />
                      <span>Message Sent! 🎉</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <p className="text-xs text-center" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
                I typically respond within 24 hours
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
