// Using html2js preprocessor
var HTMLFile = __html__['index.html'],
    body = HTMLFile.split(RegExp("<body>|</body>"))[1];

document.body.innerHTML = body;

events();

// BDD
chai.should();

describe('Form', function() {  
        

    context('Correct values in Form', function() {

        afterEach(function() {
            resetForm();
        });

        // Campos que requieren validación y que son correctos
        it('Full Name should show true', function() {
            $("full_name").value = "Sergio Asenjo";
            var check = ns.checkPattern(ns.FULLNAME_RE, $("full_name"));          
            check.should.be.equal(true);
        });
        it('Email should show true', function() {
            $("email").value = "sergio@gmail.com";
            var check = ns.checkPattern(ns.EMAIL_RE, $("email"));          
            check.should.be.equal(true);
        }); 
        it('Password should show true', function() {
            $("password").value = "=Sergio0";
            var check = ns.checkPattern(ns.PASSWORD_RE, $("password"));          
            check.should.be.equal(true);
        });
        it('Password Confirmation should show true', function() {
            $("password").value = "=Sergio0";
            $("password_conf").value = "=Sergio0";
            var check = false;
            if($("password").value === $("password_conf").value) {
                check = true;
            }
            check.should.be.equal(true);
        });
        it('Conditions should show true', function() {
            $("conditions").checked = true;
            var check = checkConditions();          
            check.should.be.equal(true);
        });
        it('Url should show be true', function() {
            $("url").value = "http://www.sergio.com";
            var check = ns.checkPattern(ns.URL_RE, $("url"));          
            check.should.be.equal(true);
        });
        it('Postal Code should show true', function() {
            $("country").value = "España";
            $("postal_code").value = "28100";
            var check = ns.checkPattern(ns.POSTALCODE_RE, $("postal_code"));          
            check.should.be.equal(true);
        });
    });

    context('Incorrect values in Form', function() {
        afterEach(function() {
            resetForm();
        });

        // Campos que requieren validación y que son incorrectos
        it('Full Name should show false', function() {
            $("full_name").value = "Sergio";
            var check = ns.checkPattern(ns.FULLNAME_RE, $("full_name"));          
            check.should.be.equal(false);
        });
        it('Email should show false', function() {
            $("email").value = "sergio@";
            var check = ns.checkPattern(ns.EMAIL_RE, $("email"));          
            check.should.be.equal(false);
        }); 
        it('Password should show false', function() {
            $("password").value = "=Sergio";
            var check = ns.checkPattern(ns.PASSWORD_RE, $("password"));          
            check.should.be.equal(false);
        });
        it('Password Confirmation should show false', function() {
            $("password").value = "=Sergio0";
            $("password_conf").value = "=Sergio";
            var check = false;
            if($("password").value === $("password_conf").value) {
                check = true;
            }
            check.should.be.equal(false);
        });
        it('Conditions should show false', function() {
            $("conditions").checked = false;
            var check = checkConditions();          
            check.should.be.equal(false);
        });
        it('Url should show false', function() {
            $("url").value = "http";
            var check = ns.checkPattern(ns.URL_RE, $("url"));          
            check.should.be.equal(false);
        });
        it('Postal Code should show false', function() {
            $("country").value = "España";
            $("postal_code").value = "66100";
            var check = ns.checkPattern(ns.POSTALCODE_RE, $("postal_code"));          
            check.should.be.equal(false);
        });

        /*
        *   Comprobaciones para ver si sale el mensaje de error
        *   estando alguno o algunos de los campos mal
        */
        it('Form should show an error', function() {
            $("full_name").value = "Sergio";
            $("email").value = "sergio@gmail.com";
            $("password").value = "=Sergio0";
            $("password_conf").value = "=Sergio0";
            $("conditions").checked = true;
            $("send").click();
            var e = $("form").children.length;
            e.should.be.equal(15);
        });

        it('Form should show an error', function() {
            $("full_name").value = "Sergio Asenjo";
            $("email").value = "sergio@";
            $("password").value = "=Sergio0";
            $("password_conf").value = "=Sergio0";
            $("conditions").checked = true;
            $("send").click();
            var e = $("form").children.length;
            e.should.be.equal(15);
        });

        it('Form should show an error', function() {
            $("full_name").value = "Sergio Asenjo";
            $("email").value = "sergio@gmail.com";
            $("password").value = "=Sergio";
            $("password_conf").value = "=Sergio";
            $("conditions").checked = true;
            $("send").click();
            var e = $("form").children.length;
            e.should.be.equal(15);
        });

        it('Form should show an error', function() {
            $("full_name").value = "Sergio Asenjo";
            $("email").value = "sergio@gmail.com";
            $("password").value = "=Sergio0";
            $("password_conf").value = "=Sergio0";
            $("conditions").checked = false;
            $("send").click();
            var e = $("form").children.length;
            e.should.be.equal(15);
        });

        it('Form should show an error', function() {
            $("full_name").value = "Sergio Asenjo";
            $("email").value = "sergio@gmail.com";
            $("password").value = "=Sergio0";
            $("password_conf").value = "=Sergio0";
            $("conditions").checked = false;
            $("send").click();
            var e = $("form").children.length;
            e.should.be.equal(15);
        });
    });
});