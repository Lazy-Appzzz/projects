import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import "./EmailForm.css";

const EmailForm = ({ endpoint = "https://mail.api.lindocode.com/contact" }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    company: "",
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Valid email required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          message: formData.message,
          company: formData.company,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Submission failed");
      }

      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
        company: "",
      });

      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <section className="section-container email-section">
      <div className="email-shell">
        <div className="email-header">
          <motion.span
            className="email-eyebrow"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
          >
            Contact
          </motion.span>

          <div className="email-header-grid">
            <motion.h2
              className="email-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              viewport={{ once: true }}
            >
              Let’s build something that feels exceptional.
            </motion.h2>

            <motion.p
              className="email-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              viewport={{ once: true }}
            >
              Tell us about your product, your goals, or the challenge you are
              trying to solve. We will reply with clarity, direction, and a
              thoughtful next step.
            </motion.p>
          </div>
        </div>

        <div className="email-grid">
          <motion.div
            className="email-side-card"
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="email-side-card-inner">
              <span className="email-side-kicker">Start a conversation</span>

              <h3>
                Premium digital products begin with a clear, thoughtful brief.
              </h3>

              <p>
                Whether you need strategy, design, engineering, or a full
                product partner, we shape every engagement around quality,
                usability, and long-term value.
              </p>

              <div className="email-side-points">
                <div className="email-side-point">
                  <span>01</span>
                  <p>Clear discovery and aligned project direction</p>
                </div>

                <div className="email-side-point">
                  <span>02</span>
                  <p>Elegant design thinking with technical precision</p>
                </div>

                <div className="email-side-point">
                  <span>03</span>
                  <p>Fast, focused communication from first contact</p>
                </div>
              </div>

              <div className="email-side-badges">
                <span>Strategy</span>
                <span>Design</span>
                <span>Development</span>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="email-form-card"
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true }}
          >
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              autoComplete="off"
              tabIndex={-1}
              style={{ display: "none" }}
              aria-hidden="true"
            />

            <div className="email-form-grid">
              <div className="email-field">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? "has-error" : ""}
                  aria-invalid={!!errors.firstName}
                  aria-describedby={
                    errors.firstName ? "firstName-error" : undefined
                  }
                />
                {errors.firstName && (
                  <p id="firstName-error" className="email-error">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="email-field">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? "has-error" : ""}
                  aria-invalid={!!errors.lastName}
                  aria-describedby={
                    errors.lastName ? "lastName-error" : undefined
                  }
                />
                {errors.lastName && (
                  <p id="lastName-error" className="email-error">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="email-field">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "has-error" : ""}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="email-error">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="email-field">
              <label htmlFor="message">Project Details</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={7}
                className={errors.message ? "has-error" : ""}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                placeholder={
                  isMobile
                    ? "Tell us a bit about your project..."
                    : "Tell us about your goals, timeline, product idea, or what you would like to improve."
                }
              />
              {errors.message && (
                <p id="message-error" className="email-error">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="email-submit-btn"
            >
              {status === "submitting" ? (
                <>
                  <span className="email-form-spinner" />
                  Sending message
                </>
              ) : (
                "Send Message"
              )}
            </button>

            {status === "success" && (
              <p className="email-form-message success">
                Message sent successfully.
              </p>
            )}

            {status === "error" && (
              <p className="email-form-message error">
                Failed to send message. Please try again.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default EmailForm;
