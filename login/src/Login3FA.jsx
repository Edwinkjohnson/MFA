import { useState } from "react";

const correctPassword = "Admin@123";
const securityAnswer = "blue";

export default function Login3FA() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");

  // STEP 1: PASSWORD + EMAIL
  const verifyPassword = async () => {
    if (password !== correctPassword) {
      setMessage("❌ Wrong password");
      return;
    }

    setMessage("📩 Sending OTP to your email...");

    const res = await fetch("http://localhost:5000/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setStep(2);
      setMessage("");
    } else {
      setMessage("❌ Failed to send OTP");
    }
  };

  // STEP 2: VERIFY OTP
  const verifyOtp = async () => {
    const res = await fetch("http://localhost:5000/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    if (res.ok) {
      setStep(3);
      setMessage("");
    } else {
      setMessage("❌ Invalid OTP");
    }
  };

  // STEP 3: SECURITY QUESTION
  const verifyAnswer = () => {
    if (answer.toLowerCase() === securityAnswer) {
      setStep(4);
    } else {
      setMessage("❌ Wrong answer");
    }
  };

  return (
    <div style={styles.container}>
      <h2>🔐 3-Factor Authentication Login</h2>

      {step === 1 && (
        <>
          <input
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={verifyPassword}>Send OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}

      {step === 3 && (
        <>
          <p><b>Security Question:</b> What is your favorite color?</p>
          <input
            type="text"
            placeholder="Your Answer"
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button onClick={verifyAnswer}>Verify</button>
        </>
      )}

      {step === 4 && <h3>✅ Login Successful!</h3>}

      <p style={{ color: "red" }}>{message}</p>
    </div>
  );
}

const styles = {
  container: {
    width: "320px",
    margin: "100px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    textAlign: "center",
  },
};
