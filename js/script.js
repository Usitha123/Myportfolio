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

// Scroll effects: navbar shadow + active nav link + progress bars
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");
const navbar = document.querySelector(".navbar");
const progressBars = document.querySelectorAll(".progress");

function onScroll() {
  const scrollY = window.scrollY;

  // Navbar shadow
  navbar.classList.toggle("scrolled", scrollY > 50);

  // Active nav link
  let current = "";
  sections.forEach(section => {
    const top = section.offsetTop - 150;
    const bottom = top + section.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      current = section.getAttribute("id");
    }
  });

  navAnchors.forEach(anchor => {
    anchor.classList.toggle("active", anchor.getAttribute("href") === `#${current}`);
  });

  // Animate progress bars when skills section is visible
  const skillsSection = document.getElementById("skills");
  if (skillsSection) {
    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      progressBars.forEach(bar => {
        const w = bar.getAttribute("data-width") || bar.style.width;
        if (!bar.getAttribute("data-width")) {
          bar.setAttribute("data-width", bar.style.width);
        }
        bar.style.width = w;
      });
    } else {
      progressBars.forEach(bar => {
        bar.style.width = "0";
      });
    }
  }
}

window.addEventListener("scroll", onScroll);
onScroll();

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll("section").forEach(section => {
  section.classList.add("fade-in");
  observer.observe(section);
});

// WhatsApp
const WHATSAPP_NUMBER = "94755338765";

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
  const form = e.target;
  const name = form.querySelector("input[name='name']").value.trim();
  const email = form.querySelector("input[name='email']").value.trim();
  const message = form.querySelector("textarea[name='message']").value.trim();
  const recipient = "Usithakalyana@gmail.com";
  const subject = `Portfolio inquiry from ${name}`;
  const body = `Name: ${name}%0AEmail: ${email}%0A%0A${message}`;
  window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${body}`;
  form.reset();
});
