import React, { useState } from "react";

const PasswordGenerator = () => {
    const [length, setLenght] = useState(12);
    const [includeUpper, setIncludeUpper] = useState(true);
    const [includeLower, setIncludeLower] = useState(true);
    const [includeNumbers, setIncludeUNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [password, setPassword] = useState("");

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
            return;
        }

        let generated = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            generated += chars[randomIndex];
        }
        setPassword(generated);
    };

    const copuToClipoboard = () => {
        navigator.clipboard.writeText(password);
        alert("Password copied!");
    };



}
