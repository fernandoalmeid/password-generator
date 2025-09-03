import React, { useState } from "react";

const PasswordGenerator = () => {
    const [length, setLenght] = useState(12);
    const [includeUpper, setIncludeUpper] = useState(true);
    const [includeLower, setIncludeLower] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [password, setPassword] = useState("");
    const [strength, setStrength] = useState("");

    const upperCase = "ABCDEFGHIJKLMONOPQRSTUVXYZ";
    const lowerCase = "abcdefghijklmnopqrstuvxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    const generatePassword = () => {

        let chars="";
        if (includeUpper) chars += upperCase;
        if (includeLower) chars += lowerCase;
        if (includeNumbers) chars += numbers;
        if (includeSymbols) chars += symbols;

        if (!chars) {
            setPassword("Select at least on option");
            setStrength("")
            return;
        }

        let generated = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            generated += chars[randomIndex];
        }v
        setPassword(generated);
        checkStrength(generated)
    };

    const checkStrength = (pwd) => {
        let score = 0;
        if(pwd.length >= 8) score ++;
        if(pwd.length >= 12) score ++;
        if(/[A-Z]/.test(pwd)) score++;
        if(/[a-z]/.test(pwd)) score++;
        if(/\d/.test(pwd)) score++;
        if(/[^A-Za-z0-9]/.test(pwd)) score++;

        if (score <= 2) {
            setStrength("Weak");
        }else if (score <= 4) {
            setStrength("Medium");
        } else {
            setStrength("Strong");
        }
    };

    const copyToClipoboard = () => {
        navigator.clipboard.writeText(password);
        alert("Password copied!");
    };

    return (
        <div style={{ padding: "20px", maxWidth: "400px", margin: "auto"}}>

            <h2>Password generator</h2>

            <label>
                length: {length}
                <input type="range" min="4" max="32" value={length} onChange={(e) => setLength(e.target.value)} />
            </label>

            <div>
                <label >
                    <input type="checkbox" checked={includeUpper} onChange={() => setIncludeUpper(!includeUpper)} /> Uppercase
                </label>
                <label>
                    <input type="checkbox" checked={includeLower} onChange={() => setIncludeLower(!includeLower)} /> Lowercase
                </label>
                <label>
                    <input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} /> Numbers
                </label>
                <label>
                    <input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} /> Symbols
                </label>
            </div>

            <button onClick={generatePassword}>Generate</button>
            <div style={{ marginTop: "10px"}}>
                <input type="text" value={password} readOnly />
                <button onClick={copyToClipoboard}>Copy</button>
            </div>

            {strength &&(
                <p>
                    strength:{" "}
                    <span
                     style={{
                        color:
                         strength === " Weak"
                         ? "red"
                         : strength === "Medium"
                         ? "orange"
                         : "green",
                    fontWeight: "bold",
                         }}
                    >
                        {strength}
                    </span>
                </p>
            )}
        </div>
    );
};

export default PasswordGenerator;
