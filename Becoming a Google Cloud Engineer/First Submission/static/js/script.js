document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var myModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    myModal.show();

    this.reset();
});