document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registration-form");
    const ticketContainer = document.createElement("div"); // Ticket wrapper
    ticketContainer.classList.add("ticket-container", "hidden");
    document.body.appendChild(ticketContainer); // Append to body
     
    const avatarInput = document.getElementById("avatar");
    const fileUploadBox = document.querySelector(".file-upload");
    const fileUploadText = document.getElementById("file");
    const fileUploadpic = document.querySelector(".upload-icon")
    // Event listener for file upload preview
    avatarInput.addEventListener("change", function () {
        const file = this.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                fileUploadBox.style.backgroundImage = `url(${e.target.result})`;
                fileUploadBox.style.backgroundSize = "100px";
                fileUploadBox.style.backgroundPosition = "center";
                fileUploadText.style.display = "none"; // Hide text when image is uploaded
                fileUploadpic.style.display = "none"; // Hide icon when image is uploaded
            };
            reader.readAsDataURL(file);
        }
    });


    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Fetch form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const github = document.getElementById("github").value.trim();
        const avatarInput = document.getElementById("avatar").files[0];

        // Basic validation
        if (!name || !email || !github) {
            alert("Please fill in all required fields.");
            return;
        }

        // Validate Email Format
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Read avatar file (if uploaded)
    let avatarURL = "default-avatar.png"; // Fallback avatar
    if (avatarInput) {
        const reader = new FileReader();
        reader.onload = function (e) {
            avatarURL = e.target.result;
            generateTicket(name, email, github, avatarURL);
            alert(`🎉 Ticket Generated Successfully!\n\nName: ${name}\nEmail: ${email}\nGitHub: ${github}`);
        };
        reader.readAsDataURL(avatarInput);
    } else {
        generateTicket(name, email, github, avatarURL);
    }
});

    // Function to validate email
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function generateTicket(name, email, github, avatar) {
        const currentDate = new Date();
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);

        const ticketNumber = Math.floor(100000 + Math.random() * 900000); // Random 6-digit number


        ticketContainer.innerHTML = `
            <div class="heading">
            <h1>Congrats, <span id="ticket-nameing">${name}!</span></h1>
            <h2>Your ticket is ready.</h2>
            </div>
            <div class="sub-heading">
            <p>We've emailed your ticket to</p>
            <h1 id="email-content"><span id="email-name">${email}</span> and will send updates in</h1>
            <p>the run-up to the event.</p>
            </div>
            <div class="ticket">
            <img src="asests/images/logo-full.svg" alt="Conference Logo" class="ticket-logo">
            <p class="Date">${formattedDate} / Jijo,RZ</p>
            <div class="ticket-number">
                <p id="ticketnumber">#${ticketNumber}</p> 
            </div>
            <div class="ticket-content">
                <img src="${avatar}" alt="Avatar" class="avatar">
                <div class="github-info">
                <p class="name-ticket">${name}</p>
                <div class="info">
                    <img src="asests/images/icon-github.svg" class="git-img" alt="GitHub Icon">
                    <p class="github-username">${github}</p>
                </div>
                </div>
            </div>
            </div>
            <div class="bottom-print">
            <button id="print-button">Print Ticket</button>
            </div>
        `;

        // Add event listener for print button
        document.getElementById("print-button").addEventListener("click", function () {
            const printContents = document.querySelector(".ticket").innerHTML;
            const originalContents = document.body.innerHTML;

            document.body.innerHTML = `
            <div class="ticket" style="background-image: url('assets/images/ticket-background.png'); background-size: cover;">
                ${printContents}
            </div>`;
            window.print();
            document.body.innerHTML = originalContents;
            location.reload(); // Reload the page to restore original content
        });
    


        // Hide the form and show the ticket
        document.querySelector(".container").classList.add("hidden");
        ticketContainer.classList.remove("hidden");
    }

    
});
