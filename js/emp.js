
    // Conditional Logic: Show extra fields for developer roles
    document.getElementById("role").addEventListener("change", function () {
        const techFields = document.getElementById("tech-fields");
        if (this.value === "developer") {
            techFields.classList.remove("hidden");
        } else {
            techFields.classList.add("hidden");
        }
    });
