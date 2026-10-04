# Campus Dating & Matchmaking Web Platform

[![JavaScript](https://img.shields.io/badge/Language-JavaScript%20(ES6%2B)-yellow.svg)](https://developer.mozilla.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-green.svg)](https://nodejs.org/)
[![HTML5 & CSS3](https://img.shields.io/badge/Frontend-HTML5%20%7C%20CSS3-orange.svg)]()
[![IIT Bombay](https://img.shields.io/badge/IIT%20Bombay-CS108%20Software%20Systems-red.svg)](https://www.cse.iitb.ac.in/)

> **Academic Affiliation**: Course Project for **CS 108: Software Systems Lab (SSL)**, IIT Bombay  
> **Author**: **Dheeraj Kumar Maradana** ([@dheerajkumar2005](https://github.com/dheerajkumar2005))

---

## 📌 Executive Summary

This repository contains a full-stack campus dating and matchmaking web application developed from scratch as part of the Software Systems Lab at IIT Bombay. 

The platform connects university students through profile discovery, dynamic interest-based filtering, and a multi-factor compatibility recommendation algorithm, providing an interactive, mobile-responsive user experience with both card-swiping and infinite scroll layouts.

---

## 🏗️ Architecture & Matching Flow

```mermaid
flowchart TD
    User["Student User"] --> Auth["Authentication & Registration<br/>(login.html / register.html)"]
    Auth --> Session["Session Verification (server.js)"]
    
    Session --> Discovery["Profile Discovery Engine"]
    Discovery --> ModeA["1. Card Swipe Mode (scroll_or_swipe.html)<br/>Tinder-style swipe gestures"]
    Discovery --> ModeB["2. Grid Scroll Mode (dating.html)<br/>Browse profiles with dynamic filters"]
    
    ModeA --> Engine["Compatibility Recommendation Engine<br/>- Department, Year, Shared Interests, Age<br/>- Multi-factor Euclidean / Cosine Score"]
    ModeB --> Engine
    
    Engine --> Match["Match Notification & Profile Exchange (match.html)"]
```

---

## 🔬 Core Features & Modules

* **User Authentication & Profiles (`login.html`, `register.html`, `forgot.html`)**:
  * Form validation, password recovery, and secure local session handling.
* **Dual Interaction Modes**:
  * **Swipe Interface (`scroll_or_swipe.html`)**: Interactive JavaScript gestures simulating mobile-style swipe cards.
  * **Browse & Filter Interface (`dating.html`)**: Real-time attribute filtering by department, age, hobbies, and year of study.
* **Compatibility Scoring (`script.js`, `server.js`)**:
  * Ranks student profiles based on overlapping interests and user-specified preference weights.
* **Lightweight Node.js Backend (`server.js`)**:
  * REST API routing for profile retrieval, filter queries, and registration persistence.

---

## 📁 Repository Structure

```
├── server.js                   # Node.js backend server handling HTTP endpoints and auth
├── script.js                   # Client-side UI interactions, card swipe physics, and filter logic
├── dating.html / match.html    # Profile feed and matching screens
├── login.html / register.html  # Authentication interfaces
├── scroll_or_swipe.html        # Interactive card-swipe discovery view
├── style.css                   # Global responsive styling and animations
├── students.json               # Seed student profiles and metadata
└── report.pdf                  # Complete project design and testing report
```

---

## 🚀 Getting Started

### 1. Prerequisites
* [Node.js](https://nodejs.org/) (`>= 16.x`)
* npm

### 2. Installation & Launch
```bash
# Clone the repository
git clone https://github.com/dheerajkumar2005/Campus-Dating-Web-App.git
cd Campus-Dating-Web-App

# Install dependencies
npm install

# Start the web server
node server.js
```

Open `http://localhost:3000` (or the configured port in `server.js`) in your browser to launch the web platform.
