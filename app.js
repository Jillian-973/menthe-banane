const questions = document.querySelectorAll(".faq-question");

questions.forEach(q => {
  q.addEventListener("click", () => {
    const item = q.parentElement;

    item.classList.toggle("active");
  });
});


/*--------- CAROUSSEL ----------*/

const SLIDES = [
    {
      src:  "https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=600&q=80",
      href: "https://example.com/fraises",
      alt:  "Fraises fraîches"
    },
    {
      src:  "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&q=80",
      href: "https://example.com/smoothie",
      alt:  "Smoothie vert"
    },
    {
      src:  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80",
      href: "https://example.com/repas",
      alt:  "Repas sain"
    },
    {
      src:  "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600&q=80",
      href: "https://example.com/fruits",
      alt:  "Corbeille de fruits"
    },
    {
      src:  "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80",
      href: "https://example.com/salade",
      alt:  "Salade colorée"
    }
  ];
 
  /* ── Auto-play interval in ms (set to 0 to disable) ── */
  const AUTO_INTERVAL = 3500;
 
  /* ════════════════════════════════════════════ */
 
  const track = document.getElementById("carouselTrack");
  const dotsContainer = document.getElementById("carouselDots");
  let current = 0;
  let timer = null;
 
  /* Build slides */
  const slideEls = SLIDES.map((s, i) => {
    const a = document.createElement("a");
    a.className = "carousel-slide";
    a.href = s.href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("aria-label", s.alt);
    const img = document.createElement("img");
    img.src = s.src;
    img.alt = s.alt;
    a.appendChild(img);
    track.appendChild(a);
    return a;
  });
 
  /* Build dots */
  const dotEls = SLIDES.map((_, i) => {
    const btn = document.createElement("button");
    btn.className = "carousel-dot" + (i === 0 ? " active" : "");
    btn.setAttribute("aria-label", `Slide ${i + 1}`);
    btn.addEventListener("click", () => goTo(i));
    dotsContainer.appendChild(btn);
    return btn;
  });
 
  function getPos(i) {
    let diff = i - current;
    const n = SLIDES.length;
    // wrap around for shortest path
    if (diff > n / 2)  diff -= n;
    if (diff < -n / 2) diff += n;
    return diff;
  }
 
  function render() {
    slideEls.forEach((el, i) => {
      const pos = getPos(i);
      el.dataset.pos = Math.max(-3, Math.min(3, pos));
    });
    dotEls.forEach((d, i) => d.classList.toggle("active", i === current));
  }
 
  function goTo(index) {
    current = (index + SLIDES.length) % SLIDES.length;
    render();
    resetTimer();
  }
 
  document.getElementById("prevBtn").addEventListener("click", () => goTo(current - 1));
  document.getElementById("nextBtn").addEventListener("click", () => goTo(current + 1));
 
  /* Auto-play */
  function resetTimer() {
    if (!AUTO_INTERVAL) return;
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), AUTO_INTERVAL);
  }
 
  render();
  resetTimer();