# Finah Nyamwaya — Week 07: JavaScript Best Practices

This week was about making code that lasts. Not just code that works — code that saves data, handles state cleanly, and doesn't embarrass you when someone else reads it.

## Live Demo

[View Live Site](https://Finah2.github.io/iyf-s11-week-07-Finah2)

> 🇰🇪 Main project: [Nairobi Street Market](https://Finah2.github.io/iyf-s11-week-07-Finah2/shop.html)
> 📚 Upgraded To-Do: [School Tasks](https://Finah2.github.io/iyf-s11-week-07-Finah2/todo.html)

## Features

- ✅ localStorage helpers with JSON serialization
- ✅ Nairobi Street Market shopping cart with persistence
- ✅ Upgraded school task manager — todos survive page refresh
- ✅ Centralized state management pattern
- ✅ sessionStorage form auto-save
- ✅ Clean code — named constants, single responsibility functions
- ✅ Debugging exercise — found and fixed 2 bugs in broken code
- ✅ All 5 daily challenges

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+) — localStorage, sessionStorage, State Management
- GitHub Pages

## Project Structure

```
iyf-s11-week-07-Finah2/
├── index.html
├── shop.html             (Nairobi Street Market)
├── todo.html             (Persistent school task manager)
├── about.html
├── projects.html
├── contact.html
├── styles.css
├── js/
│   └── storage.js        (localStorage helpers + clean code examples)
├── daily-challenges/
│   ├── day1-theme-persistence.html
│   ├── day2-recent-searches.html
│   ├── day3-form-autosave.html
│   ├── day4-refactor.html
│   └── day5-code-review.html
└── README.md
```

## What I Learned

The biggest thing this week was realising that localStorage only stores strings. You can't just throw an object in there — you have to `JSON.stringify()` it first and `JSON.parse()` it when you get it back. Once that clicked, everything else made sense.

The Nairobi Street Market was fun to build. It felt more real than anything I'd built before — actual products, actual cart logic, data that survives refresh. That's what a real e-commerce app does.

## Challenges Faced

**State management:** I kept having the UI and the data going out of sync. The solution was centralizing everything into one state object and making sure every change goes through `setState()` — which saves to localStorage AND re-renders. One function, everything stays in sync.

**sessionStorage vs localStorage:** I kept using them interchangeably at first. The key difference is sessionStorage disappears when you close the tab. That makes it perfect for form drafts but useless for cart data.

## Contact

- Email: finahnyamwaya062@gmail.com
- GitHub: [@Finah2](https://github.com/Finah2)
