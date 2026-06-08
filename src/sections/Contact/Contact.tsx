'use client';

import { useRef, useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiSend, FiCheck } from 'react-icons/fi';
import dynamic from 'next/dynamic';

const ContactScene3D = dynamic(() => import('@/components/three/ContactScene3D'), { ssr: false });

const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com/abhishek-kumar', icon: FiGithub, color: '#A855F7' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/abhishek-kumar', icon: FiLinkedin, color: '#FB923C' },
  { name: 'Twitter', url: 'https://twitter.com/abhishek_kumar', icon: FiTwitter, color: '#A855F7' },
  { name: 'Email', url: 'mailto:abhishek@example.com', icon: FiMail, color: '#FB923C' },
];

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const validate = () => {
    const errs: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Invalid email address';
    if (!formData.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus('sending');

    // Simulate sending message
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setStatus('sent');
    setFormData({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => setStatus('idle'), 3500);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="contact" className="section-padding relative">
      {/* Background neon light blur */}
      <div className="absolute bottom-[-10%] left-[20%] w-[350px] h-[350px] rounded-full bg-primary/10 blur-[130px] pointer-events-none" />

      <div className="section-container">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label">// TRANSMISSIONS</div>
          <h2 className="section-title">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="mt-4 text-sm md:text-base max-w-xl mx-auto text-text-secondary">
            Reach out for opportunities, internships, or just to chat about data structures and scalability.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 items-start">
          
          {/* LEFT PANEL: Info & WebGL Crystal */}
          <div className="flex flex-col gap-6">
            
            {/* Dispatch details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border border-white/5 bg-[#111111]/30 backdrop-blur-md"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-primary/10 border border-primary/20 text-primary-light">
                  ✉️
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Open to Opportunities</h3>
                  <p className="text-[10px] font-mono text-neutral-500">SYSTEM READY</p>
                </div>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                I am currently seeking software engineering internships, backend focus, and full-stack developer roles. Feel free to shoot me an email!
              </p>
            </motion.div>

            {/* Direct details */}
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: 'Direct Mail', value: 'abhishek@example.com', href: 'mailto:abhishek@example.com', icon: '📧' },
                { label: 'HQ Location', value: 'India', href: null, icon: '📍' },
              ].map((info) => (
                <div
                  key={info.label}
                  className="p-4 rounded-xl border border-white/5 bg-white/[0.01]"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base select-none">{info.icon}</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">{info.label}</span>
                  </div>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-xs font-semibold text-primary-light hover:text-white transition-colors cursor-none"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <span className="text-xs font-semibold text-white">{info.value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Online Social Handles */}
            <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
              <p className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 mb-3">// SOCIAL ROUTINGS</p>
              <div className="flex gap-2">
                {SOCIAL_LINKS.map(({ name, url, icon: Icon, color }) => (
                  <motion.a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/5 bg-white/[0.02] text-neutral-400 hover:text-white transition-all duration-300 cursor-none"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = color;
                      e.currentTarget.style.borderColor = `${color}35`;
                      e.currentTarget.style.background = `${color}05`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#A3A3A3';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                    }}
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Interactive 3D Refractive Crystal */}
            <div className="h-[220px] rounded-2xl border border-white/5 bg-[#111111]/15 overflow-hidden">
              <ContactScene3D />
            </div>

          </div>

          {/* RIGHT PANEL: Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="p-6 md:p-8 rounded-2xl border border-white/5 bg-card/25 backdrop-blur-md flex flex-col gap-4"
              noValidate
            >
              <h3 className="text-lg font-bold text-white tracking-wider uppercase font-mono mb-2">
                // SEND MESSAGE
              </h3>

              {/* Name & Email inputs */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-text-secondary mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Abhishek Kumar"
                    className="form-input"
                    style={{
                      borderColor: errors.name ? 'rgba(239, 68, 68, 0.4)' : undefined,
                    }}
                  />
                  {errors.name && (
                    <p className="text-[10px] text-red-400 mt-1 font-mono">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-text-secondary mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="hello@example.com"
                    className="form-input"
                    style={{
                      borderColor: errors.email ? 'rgba(239, 68, 68, 0.4)' : undefined,
                    }}
                  />
                  {errors.email && (
                    <p className="text-[10px] text-red-400 mt-1 font-mono">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-text-secondary mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Internship / Collaboration Details"
                  className="form-input"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-text-secondary mb-2">
                  Message Content *
                  </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hi Abhishek, let's connect..."
                  rows={4}
                  className="form-input resize-none"
                  style={{
                    borderColor: errors.message ? 'rgba(239, 68, 68, 0.4)' : undefined,
                  }}
                />
                {errors.message && (
                  <p className="text-[10px] text-red-400 mt-1 font-mono">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                whileHover={{ scale: status === 'idle' ? 1.01 : 1 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full justify-center py-3.5 text-xs font-bold font-mono tracking-widest uppercase cursor-none"
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
                      <FiSend size={13} />
                      <span>Transmit Message</span>
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
                      <div className="w-3.5 h-3.5 border-2 border-t-transparent rounded-full animate-spin border-white" />
                      <span>Transmitting...</span>
                    </motion.span>
                  )}
                  {status === 'sent' && (
                    <motion.span
                      key="sent"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-green-400"
                    >
                      <FiCheck size={14} />
                      <span>Transmission OK! 🎉</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
