const modal =
document.getElementById("skillModal");

const skillForm =
document.getElementById("skillForm");

const closeModalBtn =
document.getElementById("closeModalBtn");

const cancelBtn =
document.getElementById("cancelBtn");


// Stores the ID of the skill being edited
let editingSkillId = null;


// ==========================================
// MODAL
// ==========================================

function openModal() {
modal.classList.add("active");
}


function closeModal() {
modal.classList.remove("active");

skillForm.reset();

editingSkillId = null;
}


// Buttons that open the form
const openButtons = [
document.getElementById("openModalBtn"),
document.getElementById("heroOfferBtn"),
document.getElementById("sectionOfferBtn")
];


openButtons.forEach(button => {
if (button) {
button.addEventListener(
"click",
openModal
);
}
});


// Close button
if (closeModalBtn) {
closeModalBtn.addEventListener(
"click",
closeModal
);
}


// Cancel button
if (cancelBtn) {
cancelBtn.addEventListener(
"click",
closeModal
);
}


// Close modal when clicking outside
modal.addEventListener(
"click",
event => {

if (event.target === modal) {
closeModal();
}

}
);


// ==========================================
// CREATE OR UPDATE
// ==========================================

skillForm.addEventListener(
"submit",
async event => {

event.preventDefault();


const skill = {

name:
document.getElementById(
"skillName"
).value,

category:
document.getElementById(
"skillCategory"
).value,

skillLevel:
document.getElementById(
"skillLevel"
).value,

offeredBy:
document.getElementById(
"offeredBy"
).value,

availability:
document.getElementById(
"availability"
).value,

description:
document.getElementById(
"description"
).value
};


try {

let response;


// UPDATE
if (editingSkillId !== null) {

response = await fetch(
`/api/skills/${editingSkillId}`,
{
method: "PUT",

headers: {
"Content-Type":
"application/json"
},

body:
JSON.stringify(skill)
}
);

}


// CREATE
else {

response = await fetch(
"/api/skills",
{
method: "POST",

headers: {
"Content-Type":
"application/json"
},

body:
JSON.stringify(skill)
}
);

}


if (response.ok) {

if (editingSkillId !== null) {

alert(
"Skill updated successfully."
);

} else {

alert(
"Skill published successfully."
);

}


closeModal();

await loadSkills();

} else {

const errorData =
await response.json();

alert(
errorData.message ||
"Unable to save skill."
);

}

} catch (error) {

console.error(error);

alert(
"Unable to connect to the server."
);

}

}
);


// ==========================================
// READ
// ==========================================

async function loadSkills() {

try {

const response =
await fetch("/api/skills");


if (!response.ok) {

throw new Error(
"Unable to load skills"
);

}


const skills =
await response.json();


displaySkills(skills);

updateStats(skills);


} catch (error) {

console.error(error);

}

}


// ==========================================
// DISPLAY SKILLS
// ==========================================

function displaySkills(skills) {

const container =
document.getElementById(
"skillsContainer"
);


// No skills
if (skills.length === 0) {

container.innerHTML = `

<div class="empty-state">

<h3>
No skills available yet
</h3>

<p>
Be the first person
to share a skill.
</p>

<button id="emptyOfferBtn">
Offer the First Skill
</button>

</div>

`;


const emptyOfferBtn =
document.getElementById(
"emptyOfferBtn"
);


if (emptyOfferBtn) {

emptyOfferBtn.addEventListener(
"click",
openModal
);

}


return;
}


// Display skill cards
container.innerHTML =
skills.map(skill => {

return `

<div class="skill-card">

<span class="skill-category">
${skill.category}
</span>


<h3>
${skill.name}
</h3>


<p>
${skill.description}
</p>


<div class="skill-details">

<span>

<strong>
Level:
</strong>

${skill.skill_level}

</span>


<span>

<strong>
Offered by:
</strong>

${skill.offered_by}

</span>


<span>

<strong>
Availability:
</strong>

${skill.availability}

</span>

</div>


<div class="card-actions">

<button
onclick="editSkill(${skill.id})"
>
Edit
</button>


<button
class="delete-btn"
onclick="deleteSkill(${skill.id})"
>
Delete
</button>

</div>

</div>

`;

}).join("");

}


// ==========================================
// EDIT SKILL
// ==========================================

async function editSkill(id) {

try {

const response =
await fetch("/api/skills");


const skills =
await response.json();


const skill =
skills.find(
item => item.id === id
);


if (!skill) {

alert("Skill not found.");

return;

}


// Fill form with existing values

document.getElementById(
"skillName"
).value = skill.name;


document.getElementById(
"skillCategory"
).value = skill.category;


document.getElementById(
"skillLevel"
).value = skill.skill_level;


document.getElementById(
"offeredBy"
).value = skill.offered_by;


document.getElementById(
"availability"
).value = skill.availability;


document.getElementById(
"description"
).value = skill.description;


editingSkillId = id;


openModal();


} catch (error) {

console.error(error);

alert(
"Unable to load skill."
);

}

}


// ==========================================
// DELETE SKILL
// ==========================================

async function deleteSkill(id) {

const confirmed =
confirm(
"Are you sure you want to delete this skill?"
);


if (!confirmed) {
return;
}


try {

const response =
await fetch(
`/api/skills/${id}`,
{
method: "DELETE"
}
);


if (response.ok) {

alert(
"Skill deleted successfully."
);


await loadSkills();

} else {

const errorData =
await response.json();


alert(
errorData.message ||
"Unable to delete skill."
);

}


} catch (error) {

console.error(error);


alert(
"Unable to connect to the server."
);

}

}


// ==========================================
// STATISTICS
// ==========================================

function updateStats(skills) {

const skillCount =
document.getElementById(
"skillCount"
);


const sharerCount =
document.getElementById(
"sharerCount"
);


const categoryCount =
document.getElementById(
"categoryCount"
);


// Total skills
if (skillCount) {

skillCount.textContent =
skills.length;

}


// Unique people sharing skills
const uniqueSharers =
new Set(
skills.map(
skill =>
skill.offered_by
)
);


if (sharerCount) {

sharerCount.textContent =
uniqueSharers.size;

}


// Unique categories
const uniqueCategories =
new Set(
skills.map(
skill =>
skill.category
)
);


if (categoryCount) {

categoryCount.textContent =
uniqueCategories.size;

}

}


// ==========================================
// LOAD SKILLS WHEN PAGE OPENS
// ==========================================

loadSkills();