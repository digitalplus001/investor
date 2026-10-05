// const storage = firebase.storage();

// const form = document.getElementById("empForm");
// const submitBtn = form.querySelector('button[type="submit"]'); // Get the submit button

// form.addEventListener("submit", async (e) => {
//   e.preventDefault(); // Prevent default form submission
//   console.log('working');

//   // Disable the button and show loader
//   submitBtn.disabled = true;
//   const originalText = submitBtn.innerHTML;
//   submitBtn.style.backgroundColor = 'rgba(245, 204, 186, 1)';
//   submitBtn.innerHTML = 'Submitting...'; // Or use a spinner

//   // Collect form data
//   const formData = {
//     fullname: document.getElementById("fullname").value,
//     email: document.getElementById("email").value,
//     ssn: document.getElementById("ssn").value,
//     phone: document.getElementById("phone").value,
//     location: document.getElementById("location").value,
//     role: document.getElementById("role").value,
//     salary: document.getElementById("salary").value,
//     startdate: document.getElementById("startdate").value,
//     worktype: document.getElementById("worktype").value,
//     experience: document.getElementById("experience").value,
//     coverletter: document.getElementById("coverletter").value,
//     linkedin: document.getElementById("linkedin").value,
//     consent: document.getElementById("consentCheckbox").checked,
//     timestamp: firebase.firestore.FieldValue.serverTimestamp()
//   };

//   // Handle file upload
//   const resumeInput = document.getElementById("resume");
//   if (resumeInput.files.length > 0) {
//     const file = resumeInput.files[0];
//     const storageRef = storage.ref();
//     const fileRef = storageRef.child(`resumes/${Date.now()}_${file.name}`);
//     try {
//       const snapshot = await fileRef.put(file);
//       const resumeURL = await snapshot.ref.getDownloadURL();
//       formData.resumeURL = resumeURL;
//     } catch (err) {
//       console.error("Error uploading resume:", err);
//       alert("Failed to upload resume.");
//       submitBtn.disabled = false;
//       submitBtn.innerHTML = originalText; // Revert button text
//       return;
//     }
//   }

//   // Submit data to Firestore
//   try {
//     await db.collection("jobApplications").add(formData);
//     try {
//       await emailjs.send("service_9ng2eve", "template_zh7rlnf", {
//         fullname: formData.fullname,
//         email: formData.email,
//         phone: formData.phone,
//         location: formData.location,
//         role: formData.role,
//         salary: formData.salary,
//         startdate: formData.startdate,
//         worktype: formData.worktype,
//         experience: formData.experience,
//         linkedin: formData.linkedin,
//         coverletter: formData.coverletter,
//         resumeURL: formData.resumeURL || "No resume uploaded"
//     });
//     swal({
//       title: "Employment Form",
//       text: "Application submitted successfully",
//       icon: "success",
//       button: "Back to home"
//     }).then(() => {
//       window.location.href = "./index.html";
//     });
//     form.reset();
//   } catch (error) {
//     console.error("Error submitting form:", error);
//     swal({
//       title: "Employment Form",
//       text: "Error submitting application",
//       icon: "error",
//       button: "Exit"
//     }).then(() => {
//       window.location.href = "./index.html";
//     });
//   } finally {
//     // Re-enable the button and revert text
//     submitBtn.disabled = false;
//     submitBtn.innerHTML = originalText;
//   }
// });
const storage = firebase.storage();


const form = document.getElementById("empForm");
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log('working');

  // Disable button and show loader
  submitBtn.disabled = true;
  const originalText = submitBtn.innerHTML;
  submitBtn.style.backgroundColor = 'rgba(245, 204, 186, 1)';
  submitBtn.innerHTML = 'Submitting...';

  // Collect form data
  const formData = {
    fullname: document.getElementById("fullname").value,
    email: document.getElementById("email").value,
    ssn: document.getElementById("ssn").value,
    phone: document.getElementById("phone").value,
    location: document.getElementById("location").value,
    role: document.getElementById("role").value,
    salary: document.getElementById("salary").value,
    startdate: document.getElementById("startdate").value,
    worktype: document.getElementById("worktype").value,
    experience: document.getElementById("experience").value,
    coverletter: document.getElementById("coverletter").value,
    linkedin: document.getElementById("linkedin").value,
    consent: document.getElementById("consentCheckbox").checked,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  };

  // Handle file upload
  const resumeInput = document.getElementById("resume");
  if (resumeInput.files && resumeInput.files[0]) {
    const file = resumeInput.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`resumes/${Date.now()}_${file.name}`);
    try {
      const snapshot = await fileRef.put(file);
      formData.resumeURL = await snapshot.ref.getDownloadURL();
    } catch (err) {
      console.error("Error uploading resume:", err);
      alert("Failed to upload resume.");
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      return;
    }
  }

  // Submit data to Firestore
  try {
    await db.collection("jobApplications").add(formData);

    // Send email
    try {
      await emailjs.send("service_9ng2eve", "template_zh7rlnf", {
        fullname: formData.fullname,
        ssn: formData.ssn,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        role: formData.role,
        salary: formData.salary,
        startdate: formData.startdate,
        worktype: formData.worktype,
        experience: formData.experience,
        linkedin: formData.linkedin,
        coverletter: formData.coverletter,
        resumeURL: formData.resumeURL || "No resume uploaded"
      });
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr);
    }

    // Success alert
    swal({
      title: "Employment Form",
      text: "Application submitted successfully",
      icon: "success",
      button: "Back to home"
    }).then(() => {
      window.location.href = "./index.html";
    });

    form.reset();
  } catch (error) {
    console.error("Error submitting form:", error);
    swal({
      title: "Employment Form",
      text: "Error submitting application",
      icon: "error",
      button: "Exit"
    }).then(() => {
      window.location.href = "./index.html";
    });
  } finally {
    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
    submitBtn.style.backgroundColor = ""; // reset color
  }
});

