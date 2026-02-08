import React, { useState, useCallback, useEffect } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });
  const [strength, setStrength] = useState({ text: "N/A", score: 0 });
  const [showNotification, setShowNotification] = useState(false);

  const CHAR_SETS = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+~`|}{[]\\:;?><,./-=",
  };

  const calculateStrength = useCallback((pass) => {
    let score = 0;
    if (pass.length > 12) score++;
    if (pass.length > 20) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    let text = "VULNERABLE";
    if (score >= 5) text = "UNBREAKABLE";
    else if (score >= 3) text = "SECURE";

    setStrength({ text, score });
  }, []);

  const generatePassword = useCallback(() => {
    let charset = "";
    if (options.uppercase) charset += CHAR_SETS.uppercase;
    if (options.lowercase) charset += CHAR_SETS.lowercase;
    if (options.numbers) charset += CHAR_SETS.numbers;
    if (options.symbols) charset += CHAR_SETS.symbols;

    if (charset === "") {
      setPassword("SELECT_OPTION");
      setStrength({ text: "N/A", score: 0 });
      return;
    }

    let generated = "";
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      generated += charset[array[i] % charset.length];
    }

    setPassword(generated);
    calculateStrength(generated);
  }, [length, options, calculateStrength]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = async () => {
    if (!password || password === "SELECT_OPTION") return;
    try {
      await navigator.clipboard.writeText(password);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const handleOptionChange = (key) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getStrengthColor = () => {
    if (strength.score < 3) return "#ff4d4d";
    if (strength.score < 5) return "#fff200";
    return "#00f2ff";
  };

  return (
    <div className="app-wrapper">
      <div className="background-effects">
        <div className="blob"></div>
        <div className="blob"></div>
        <div className="grid"></div>
      </div>

      <main className="container">
        <header>
          <div className="status-bar">
            <span className="pulse"></span>
            <span className="status-text">SYSTEM_ONLINE</span>
          </div>
          <h1 className="main-title">
            NEURAL_GEN <span className="version">v1.0</span>
          </h1>
          <p className="subtitle">Secure entropy generation protocol</p>
        </header>

        <section className="display-card">
          <div className="password-display-wrapper">
            <input
              className="password-input"
              type="text"
              readOnly
              value={password}
              placeholder="P4S$W0RD_H3R3"
            />
            <button
              onClick={copyToClipboard}
              className="icon-btn"
              title="Copy to terminal"
            >
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path
                  fill="currentColor"
                  d="M16,1H4C2.9,1,2,1.9,2,3v14h2V3h12V1z M19,5H8C6.9,5,6,5.9,6,7v14c0,1.1,0.9,2,2,2h11c1.1,0,2-0.9,2-2V7C21,5.9,20.1,5,19,5z M19,21H8V7h11V21z"
                />
              </svg>
            </button>
          </div>
          <div className="strength-meter">
            <div className="bar-bg">
              <div
                className="bar-fill"
                style={{
                  width: `${(strength.score / 6) * 100}%`,
                  backgroundColor: getStrengthColor(),
                  boxShadow: `0 0 10px ${getStrengthColor()}`,
                }}
              ></div>
            </div>
            <span className="strength-text">STRENGTH: {strength.text}</span>
          </div>
        </section>

        <section className="controls-card">
          <div className="control-group">
            <div className="label-row">
              <label>KEY_LENGTH</label>
              <span className="length-value">{length}</span>
            </div>
            <input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
          </div>

          <div className="options-grid">
            {Object.keys(options).map((key) => (
              <label key={key} className="checkbox-container">
                <input
                  type="checkbox"
                  checked={options[key]}
                  onChange={() => handleOptionChange(key)}
                />
                <span className="checkmark"></span>
                <span className="label-text">{key.toUpperCase()} [{key === 'symbols' ? '!@#' : key === 'numbers' ? '0-9' : key === 'uppercase' ? 'A-Z' : 'a-z'}]</span>
              </label>
            ))}
          </div>

          <button onClick={generatePassword} className="primary-btn">
            <span className="btn-text">INITIALIZE_GEN</span>
            <span className="glitch-effect"></span>
          </button>
        </section>

        <footer>
          <div className="footer-line"></div>
          <p>&copy; 2026 NEURAL_GEN // PASSWORD_GENERATOR_PROTOCOL</p>
        </footer>
      </main>

      <div className={`notification ${showNotification ? "show" : ""}`}>
        COPIED_TO_CLIPBOARD
      </div>
    </div>
  );
}

export default App;
