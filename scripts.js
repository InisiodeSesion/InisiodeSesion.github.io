document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('registerModal');
    var btn = document.getElementById('registerButton');
    var span = document.getElementsByClassName('close')[0];

    btn.onclick = function() {
        modal.style.display = 'block';
    }

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    var loginForm = document.getElementById('loginForm');
    loginForm.onsubmit = function(event) {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        var usuarioRegistrado = checkRegisteredUser();

        if (!usuarioRegistrado) {
            alert('Debes registrarte primero para acceder.');
            modal.style.display = 'block'; 
            return false; 
        } else {
            var storedUserData = JSON.parse(localStorage.getItem('userData'));
            if (username === storedUserData.username && password === storedUserData.password) {
                window.location.href = 'https://iniciodesesion1.github.io';
                return false; 
            } else {
                alert('Credenciales incorrectas. Intenta de nuevo.');
                return false; 
            }
        }
    }

    var registerForm = document.getElementById('registerForm');
    registerForm.onsubmit = function(event) {
        event.preventDefault();
        
        var newUsername = document.getElementById('new-username').value;
        var email = document.getElementById('email').value;
        var newPassword = document.getElementById('new-password').value;
        var confirmPassword = document.getElementById('confirm-password').value;

        if (newPassword !== confirmPassword) {
            alert('Las contraseñas no coinciden. Intenta de nuevo.');
            return false;
        }

        if (newPassword.length > 15) {
            alert('La contraseña debe tener un máximo de 15 caracteres.');
            return false;
        }

        var userData = {
            username: newUsername,
            email: email,
            password: newPassword
        };

        localStorage.setItem('userData', JSON.stringify(userData));

        window.location.href = 'https://iniciodesesion1.github.io';
        return false; 
    }

    function checkRegisteredUser() {
        var userDataString = localStorage.getItem('userData');
        if (userDataString) {
            var userData = JSON.parse(userDataString);
            return true; 
        }
        return false; 
    }
});
