// Typing effect
const roles = ["Web Developer", "UI/UX Designer", "Creative Thinker"];
const typedText = document.getElementById("typedText");
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const current = roles[roleIndex];
  if (!isDeleting) {
    typedText.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
  } else {
    typedText.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();

// Theme toggle
const themeToggle = document.getElementById("themeToggle");
const icon = themeToggle.querySelector("i");

if (localStorage.getItem("theme") === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  icon.className = "fas fa-sun";
}

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  if (isDark) {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
    icon.className = "fas fa-moon";
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    icon.className = "fas fa-sun";
  }
});

// Hamburger menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("active"));
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll("section").forEach(section => {
  section.classList.add("fade-in");
  observer.observe(section);
});

const WHATSAPP_NUMBER = "94755338765";

// Send via WhatsApp button
document.getElementById("whatsappSend").addEventListener("click", () => {
  const form = document.getElementById("contactForm");
  const name = form.querySelector("input[name='name']").value.trim();
  const email = form.querySelector("input[name='email']").value.trim();
  const message = form.querySelector("textarea[name='message']").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields before sending via WhatsApp.");
    return;
  }

  const text = `Hello, I'm ${name}%0AEmail: ${email}%0A%0A${message}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
});

// Contact form (email)
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const btn = e.target.querySelector("button[type='submit']");
  const original = btn.textContent;
  btn.textContent = "Sending...";
  btn.disabled = true;

  const form = e.target;
  const data = new FormData(form);

  fetch("https://formspree.io/f/YOUR_FORM_ID", {
    method: "POST",
    body: data,
    headers: { "Accept": "application/json" }
  }).then(() => {
    btn.textContent = "Sent!";
    btn.style.background = "#00c9a7";
    form.reset();
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = "";
      btn.disabled = false;
    }, 2000);
  }).catch(() => {
    btn.textContent = "Error";
    btn.style.background = "#e74c3c";
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = "";
      btn.disabled = false;
    }, 2000);
  });
});
