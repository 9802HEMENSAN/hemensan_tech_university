document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (Storage.verifyAdmin(username, password)) {
                Storage.setAdminLogin(true);
                window.location.href = 'admin.html';
            } else {
                alert('Invalid credentials. Please try again.');
            }
        });
    }
    
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            Storage.setAdminLogin(false);
            window.location.href = 'login.html';
        });
    }
});