import { useEffect, useState } from "react";

const EmailForm = ({ endpoint = "https://mail.api.lindocode.com/contact" }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    company: "", // honeypot field for bot protection
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
      newErrors.firstName = "First Name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
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

  const fieldStyle = (hasError) => ({
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: `1px solid ${hasError ? "#ff4444" : "#ddd"}`,
    fontSize: "1rem",
    transition: "all 0.3s ease",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    color: "black",
    boxSizing: "border-box",
  });

  return (
    <>
      <style>
        {`
          @keyframes emailFormSpin {
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes emailFormFadeIn {
            from {
              opacity: 0;
              transform: translateY(4px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .email-form-spinner {
            width: 20px;
            height: 20px;
            border: 2px solid rgba(255, 255, 255, 0.35);
            border-top-color: #fff;
            border-radius: 50%;
            animation: emailFormSpin 0.8s linear infinite;
          }

          .email-form-message {
            margin-top: 1rem;
            text-align: center;
            animation: emailFormFadeIn 0.3s ease;
          }
        `}
      </style>

      <form
        onSubmit={handleSubmit}
        style={{
          width: isMobile ? "90%" : "50%",
          maxWidth: "650px",
          margin: isMobile ? "20px" : "30px auto",
          padding: isMobile ? "1rem" : "2rem",
          borderRadius: "12px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        }}
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

        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="firstName"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "500",
              color: "#333",
            }}
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            style={fieldStyle(!!errors.firstName)}
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
          />
          {errors.firstName && (
            <p
              id="firstName-error"
              style={{
                color: "#ff4444",
                marginTop: "0.5rem",
                fontSize: "0.875rem",
              }}
            >
              {errors.firstName}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="lastName"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "500",
              color: "#333",
            }}
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            style={fieldStyle(!!errors.lastName)}
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
          />
          {errors.lastName && (
            <p
              id="lastName-error"
              style={{
                color: "#ff4444",
                marginTop: "0.5rem",
                fontSize: "0.875rem",
              }}
            >
              {errors.lastName}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="email"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "500",
              color: "#333",
            }}
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={fieldStyle(!!errors.email)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p
              id="email-error"
              style={{
                color: "#ff4444",
                marginTop: "0.5rem",
                fontSize: "0.875rem",
              }}
            >
              {errors.email}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <label
            htmlFor="message"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "500",
              color: "#333",
            }}
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            style={{
              ...fieldStyle(!!errors.message),
              resize: "vertical",
              minHeight: "120px",
            }}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p
              id="message-error"
              style={{
                color: "#ff4444",
                marginTop: "0.5rem",
                fontSize: "0.875rem",
              }}
            >
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#b88800",
            color: "white",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: status === "submitting" ? "not-allowed" : "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            opacity: status === "submitting" ? 0.7 : 1,
          }}
        >
          {status === "submitting" ? (
            <>
              <span className="email-form-spinner" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>

        {status === "success" && (
          <p className="email-form-message" style={{ color: "#28a745" }}>
            Message sent successfully!
          </p>
        )}

        {status === "error" && (
          <p className="email-form-message" style={{ color: "#ff4444" }}>
            Failed to send message. Please try again.
          </p>
        )}
      </form>
    </>
  );
};

export default EmailForm;
