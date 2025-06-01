// src/components/ContactForm.tsx
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { Mail, X } from "lucide-react";

export default function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  // Form errors
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  // Initialize modal root element
  useEffect(() => {
    if (typeof document !== 'undefined') {
      let modalContainer = document.getElementById('modal-root');
      if (!modalContainer) {
        modalContainer = document.createElement('div');
        modalContainer.id = 'modal-root';
        modalContainer.style.position = 'fixed';
        modalContainer.style.top = '0';
        modalContainer.style.left = '0';
        modalContainer.style.right = '0';
        modalContainer.style.bottom = '0';
        modalContainer.style.pointerEvents = 'none';
        modalContainer.style.zIndex = '10000';
        document.body.appendChild(modalContainer);
      }
      setModalRoot(modalContainer);
    }
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Validate the form
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    // Name validation
    if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    } else {
      newErrors.name = "";
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    } else {
      newErrors.email = "";
    }
    
    // Subject validation
    if (formData.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters";
      isValid = false;
    } else {
      newErrors.subject = "";
    }
    
    // Message validation
    if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      isValid = false;
    } else {
      newErrors.message = "";
    }
    
    setErrors(newErrors);
    return isValid;
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Send data to Formspree
      const response = await fetch("https://formspree.io/f/xanqrjry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      // Show success message with Sonner
      toast.success("Message sent!", {
        description: "Thank you for reaching out. I'll get back to you soon."
      });
      
      // Reset the form and close dialog
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setIsOpen(false);
    } catch (error) {
      // Show error message if something goes wrong
      toast.error("Something went wrong", {
        description: "Your message couldn't be sent. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button 
        className="contact-form-trigger"
        onClick={() => {
          console.log('Contact button clicked');
          setIsOpen(true);
        }}
      >
        <span className="contact-btn-text">Contact Me</span>
        <Mail className="contact-btn-icon" />
      </button>

      {/* Custom Modal */}
      {isOpen && modalRoot && createPortal(
        <div 
          className="contact-modal-overlay"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="contact-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="contact-modal-close"
              onClick={() => setIsOpen(false)}
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div className="contact-modal-header">
              <h2>Get in Touch</h2>
              <p>Fill out this form to send me a message.</p>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                />
                {errors.name && <p className="form-error">{errors.name}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                />
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input"
                />
                {errors.subject && <p className="form-error">{errors.subject}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="form-textarea"
                />
                {errors.message && <p className="form-error">{errors.message}</p>}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="contact-submit-btn"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>,
        modalRoot
      )}
    </>
  );
}