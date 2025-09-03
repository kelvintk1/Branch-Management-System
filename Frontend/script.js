const API_URL = "http://localhost:5000/api/branches";
const form = document.getElementById("branchForm");
const branchesList = document.getElementById("branchesList");

let editingBranchId = null;

async function renderBranches() {
  try {
    const res = await fetch(API_URL);
    const branches = await res.json();

    if (branches.length === 0) {
      branchesList.innerHTML = '<div class="empty-state">No branches registered yet. Add your first branch above!</div>';
      return;
    }

    branchesList.innerHTML = branches.map(branch => `
      <div class="branch-item">
        <div class="branch-info">
          <div><strong>ID:</strong> ${branch.branchId}</div>
          <div><strong>Name:</strong> ${branch.branchName}</div>
          <div><strong>Location:</strong> ${branch.location}</div>
          <div><strong>Contact:</strong> ${branch.contact}</div>
          <div class="actions">
            <button class="btn" onclick="editBranch('${branch._id}')">Edit</button>
            <button class="btn btn-danger" onclick="deleteBranch('${branch._id}')">Delete</button>
          </div>
          </div>
      </div>
    `).join('');
  } catch (err) {
    console.error("Error loading branches:", err);
    showMessage("Error loading branches", "error");
  }
}

async function handleSubmit(e) {
  e.preventDefault();

const branchData = {
  branchId: document.getElementById('branchId').value,
  branchName: document.getElementById('branchName').value,
  location: document.getElementById('location').value,
  contact: Number(document.getElementById('contact').value) // <-- FIXED
};


  try {
    if (editingBranchId) {
      await fetch(`${API_URL}/${editingBranchId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(branchData)
      });
      showMessage("Branch updated successfully!", "success");
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(branchData)
      });
      showMessage("Branch added successfully!", "success");
    }

    cancelEdit();
    renderBranches();
  } catch (err) {
    console.error("Error in handleSubmit:", err);
    showMessage("Error saving branch", "error");
  }
}

async function deleteBranch(id) {
  if (confirm("Are you sure you want to delete this branch?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    showMessage("Branch deleted successfully!", "success");
    renderBranches();
  }
}

function cancelEdit() {
  editingBranchId = null;
  document.getElementById("form-title").textContent = "Add New Branch";
  document.getElementById("submit-btn").textContent = "Add Branch";
  form.reset();
  document.querySelector(".form-section").style.display = "none";
}

form.addEventListener("submit", handleSubmit);
document.addEventListener("DOMContentLoaded", renderBranches);

function showMessage(message, type = "info") {
  const messageBox = document.getElementById("messageBox");

  if (!messageBox) {
    alert(message);
    return;
  }

  messageBox.textContent = message;
  messageBox.className = `message ${type}`;
  messageBox.style.display = "block";

  setTimeout(() => {
    messageBox.style.display = "none";
  }, 3000);
}

async function editBranch(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const branch = await res.json();

    document.getElementById('branchId').value = branch.branchId;
    document.getElementById('branchName').value = branch.branchName;
    document.getElementById('location').value = branch.location;
    document.getElementById('contact').value = branch.contact;

    editingBranchId = id;
    document.getElementById("form-title").textContent = "Edit Branch";
    document.getElementById("submit-btn").textContent = "Update Branch";

    document.querySelector(".form-section").style.display = "block";
  } catch (err) {
    console.error("Error fetching branch for edit:", err);
    showMessage("Error loading branch for edit", "error");
  }
}

document.getElementById("add-icon").addEventListener("click", () => {
  const formSection = document.querySelector(".form-section");
  formSection.style.display = 
    formSection.style.display === "none" || formSection.style.display === ""
      ? "block" 
      : "none";
});

document.getElementById("cancel-btn").addEventListener("click", () => {
  cancelEdit();
});

// okay