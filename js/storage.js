// ================================
// storage.js — localStorage Helpers
// Task 13.1 & 14.1
// ================================

const STORAGE_PREFIX = "finah_";

// Save any data to localStorage
function saveToStorage(key, data) {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
}

// Get data from localStorage with a fallback default
function getFromStorage(key, defaultValue = null) {
    const data = localStorage.getItem(STORAGE_PREFIX + key);
    return data ? JSON.parse(data) : defaultValue;
}

// Remove a specific key
function removeFromStorage(key) {
    localStorage.removeItem(STORAGE_PREFIX + key);
}

// Clear everything stored by this app
function clearStorage() {
    Object.keys(localStorage)
        .filter(key => key.startsWith(STORAGE_PREFIX))
        .forEach(key => localStorage.removeItem(key));
}

// ================================
// EXERCISE — storing objects
// ================================

// WRONG way — this just stores "[object Object]"
// localStorage.setItem("user", { name: "Finah" });

// RIGHT way — serialize to JSON first
const user = {
    name: "Finah Nyamwaya",
    age: 23,
    hobbies: ["coding", "watching movies"]
};

saveToStorage("user", user);
const retrieved = getFromStorage("user");
console.log("Retrieved user:", retrieved);
console.log("Name:", retrieved.name);
console.log("Hobbies:", retrieved.hobbies);

// ================================
// EXERCISE — settings with defaults
// ================================

saveToStorage("settings", { theme: "dark", fontSize: 16 });
const settings = getFromStorage("settings", { theme: "light", fontSize: 14 });
console.log("App settings:", settings);

// ================================
// SESSION STORAGE vs LOCAL STORAGE
// ================================

// sessionStorage — gone when tab closes
sessionStorage.setItem("tempCart", JSON.stringify([{ item: "Mandazi", qty: 2 }]));
console.log("Session cart:", JSON.parse(sessionStorage.getItem("tempCart")));

// localStorage — stays until you clear it
saveToStorage("permanentData", "This survives browser restarts");

// When to use which:
// sessionStorage: Form draft backup, temporary UI state
// localStorage: Theme preference, saved todos, cart data, recent searches

// ================================
// FORM AUTO-SAVE (Task 13.3)
// ================================

// This runs when dom-practice.html has a form
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const inputs = form.querySelectorAll("input, textarea");

    // Restore saved values on page load
    inputs.forEach(input => {
        const saved = sessionStorage.getItem(`form_${input.name}`);
        if (saved) {
            input.value = saved;
            console.log(`Restored ${input.name}: ${saved}`);
        }

        // Auto-save on every keystroke
        input.addEventListener("input", () => {
            sessionStorage.setItem(`form_${input.name}`, input.value);
        });
    });

    // Clear session storage on submit
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        inputs.forEach(input => {
            sessionStorage.removeItem(`form_${input.name}`);
        });
        console.log("Form submitted — session data cleared");
    });
});

// ================================
// DEBUGGING EXERCISE (Task 14.3)
// ================================

// Original buggy code — find and fix the bugs!
function calculateOrderTotal(items) {
    let total = 0;

    // BUG 1: i <= items.length should be i < items.length
    // BUG 2: item.quanity should be item.quantity
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        total += item.price * item.quantity; // fixed: quanity → quantity
    }

    if (total > 100) {
        total = total * 0.9; // 10% discount
    }

    return total;
}

const order = [
    { name: "Book", price: 15, quantity: 2 },
    { name: "Pen", price: 3, quantity: 5 },
    { name: "Notebook", price: 8, quantity: 3 }
];

// 15*2 + 3*5 + 8*3 = 30 + 15 + 24 = 69 — under 100 so no discount
console.log("Order total:", calculateOrderTotal(order)); // 69

// ================================
// CLEAN CODE EXAMPLES (Task 14.2)
// ================================

// BAD — magic numbers and vague names
// if (password.length < 8) { }
// setTimeout(callback, 86400000);

// GOOD — named constants and clear intent
const MIN_PASSWORD_LENGTH = 8;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const HTTP_NOT_FOUND = 404;

function isPasswordValid(password) {
    return password.length >= MIN_PASSWORD_LENGTH;
}

console.log("Password valid?", isPasswordValid("hello"));     // false
console.log("Password valid?", isPasswordValid("Finah2026")); // true

// BAD — does too many things in one function
// function processUser(userData) { validate, transform, save, email, update UI... }

// GOOD — one function does one thing
function validateUser(userData) {
    if (!userData.email.includes("@")) throw new Error("Invalid email");
    if (userData.age < 18) throw new Error("Must be 18 or older");
    return true;
}

function normalizeUser(userData) {
    return {
        ...userData,
        email: userData.email.toLowerCase().trim(),
        name: userData.name.trim()
    };
}

try {
    validateUser({ email: "finah@gmail.com", age: 23 });
    const clean = normalizeUser({ email: "  FINAH@gmail.com  ", name: "  Finah  ", age: 23 });
    console.log("Normalized user:", clean);
} catch (err) {
    console.error("Validation failed:", err.message);
}

// ================================
// UTILITY FUNCTIONS (Task 14.1)
// ================================

function formatDate(date) {
    return new Date(date).toLocaleDateString("en-KE", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function formatPrice(ksh) {
    return `KSh ${ksh.toLocaleString()}`;
}

console.log("Date:", formatDate(new Date()));
console.log("ID:", generateId());
console.log("Price:", formatPrice(1500));
