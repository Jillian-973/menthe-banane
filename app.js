const questions = document.querySelectorAll(".faq-question");

questions.forEach(q => {
  q.addEventListener("click", () => {
    const item = q.parentElement;

    item.classList.toggle("active");
  });
});