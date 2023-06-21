const infoButton = document.querySelector(".sidebar__infoicon");
const projectInfo = document.querySelector(".checklist__sidebar");

infoButton?.addEventListener("click", () => {
    projectInfo.classList.toggle("checklist__sidebar-active");
});
