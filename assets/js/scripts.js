window.addEventListener("DOMContentLoaded", (event) => {
  // Toggle the side navigation
  const sidebarToggle = document.body.querySelector("#sidebarToggle");
  if (sidebarToggle) {
    // Uncomment Below to persist sidebar toggle between refreshes
    if (localStorage.getItem("sb|sidebar-toggle") === "true") {
      document.body.classList.toggle("sb-sidenav-toggled");
    }
    sidebarToggle.addEventListener("click", (event) => {
      event.preventDefault();
      document.body.classList.toggle("sb-sidenav-toggled");
      localStorage.setItem(
        "sb|sidebar-toggle",
        document.body.classList.contains("sb-sidenav-toggled")
      );
    });
  }
});

const by = (selector) => document.querySelector(selector);
const $typingText = by(".typing-text");
const $cursor = by(".cursor");

const words = [
  "Software developer",
  "Full-stack developer",
  "Mobile app developer",
  "Web developer",
  "Front-end developer",
  "Back-end developer",
  "Freelancer",
];

const delay = {
  typing: 80,
  keeping: 1000,
  erasing: 100,
  word: 2000,
};
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const type = async (word) => {
  $cursor.classList.add("typing");
  for (const char of word) {
    $typingText.textContent += char;
    await sleep(delay.typing);
  }
  $cursor.classList.remove("typing");
  await sleep(delay.keeping);

  for (let i = 1; i <= word.length; i++) {
    $typingText.textContent = word.substring(0, word.length - i);
    await sleep(delay.erasing);
  }
};

const loop = async (wordIndex = 0) => {
  await type(words[wordIndex % words.length]);

  setTimeout(async () => {
    await loop(wordIndex + 1);
  }, delay.word);
};

document.addEventListener("DOMContentLoaded", () => {
  loop();
});
