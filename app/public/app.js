const modal = document.getElementById("skillModal");
const skillForm = document.getElementById("skillForm");

const openButtons = [
document.getElementById("openModalBtn"),
document.getElementById("heroOfferBtn"),
document.getElementById("sectionOfferBtn"),
document.getElementById("emptyOfferBtn")
];

const closeModalBtn =
document.getElementById("closeModalBtn");

const cancelBtn =
document.getElementById("cancelBtn");


function openModal() {
modal.classList.add("active");
}


function closeModal() {
modal.classList.remove("active");
}


openButtons.forEach(button => {
button.addEventListener("click", openModal);
});


closeModalBtn.addEventListener(
"click",
closeModal
);


cancelBtn.addEventListener(
"click",
closeModal
);


modal.addEventListener("click", event => {

if (event.target === modal) {
closeModal();
}

});


skillForm.addEventListener("submit", event => {

event.preventDefault();

console.log(
"Form submitted. Database connection comes next."
);

});