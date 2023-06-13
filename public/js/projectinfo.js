console.log("projectinfo.js loaded");

let infoButton = document.querySelector(".sidebar__infoicon");
let projectInfo = document.querySelector(".checklist__sidebar");
// let projectInfoShade = document.querySelector(".checklist__sidebar-active::before");

infoButton.addEventListener("click", () => {
    projectInfo.classList.toggle("checklist__sidebar-active");
});
// projectInfoShade.addEventListener("click", () => {
//     projectInfo.classList.remove("checklist__sidebar-active");
// });