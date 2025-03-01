// src/components/ContactForm.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail } from "lucide-react";

export default function ContactForm() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
      // Send data to Formspree - REPLACE WITH YOUR ACTUAL FORMSPREE ENDPOINT
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
      setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="custom-contact-btn">
          <span className="hidden sm:inline sm:mr-3">Contact Me</span>
          <Mail className="h-4 w-4" />
        </button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px] contact-form-dialog">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-semibold">Get in Touch</DialogTitle>
          <DialogDescription className="text-base opacity-90">
            Fill out this form to send me a message. It makes it easier for me to respond as quickly as possible.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium block">
              Name
            </label>
            <Input
              id="name"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium block">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium block">
              Subject
            </label>
            <Input
              id="subject"
              name="subject"
              placeholder="What's this about?"
              value={formData.subject}
              onChange={handleChange}
              className="form-input"
            />
            {errors.subject && (
              <p className="text-sm text-red-500 mt-1">{errors.subject}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium block">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Your message here..."
              className="form-textarea min-h-[150px]"
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && (
              <p className="text-sm text-red-500 mt-1">{errors.message}</p>
            )}
          </div>
          
          <DialogFooter className="pt-4">
            <Button
              type="submit"
              className="w-full contact-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}