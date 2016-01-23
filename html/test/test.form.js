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

        it('should show be true', function() {
            $("full_name").value = "Sergio Asenjo";
            var check = ns.checkPattern(ns.FULLNAME_RE, $("full_name"));          
            check.should.be.equal(true);
        });
        it('should show be true', function() {
            $("email").value = "sergio@gmail.com";
            var check = ns.checkPattern(ns.EMAIL_RE, $("email"));          
            check.should.be.equal(true);
        }); 
        it('should show be true', function() {
            $("password").value = "=Sergio0";
            var check = ns.checkPattern(ns.PASSWORD_RE, $("password"));          
            check.should.be.equal(true);
        });
        it('should show be true', function() {
            $("password").value = "=Sergio0";
            $("password_conf").value = "=Sergio0";
            var check = false;
            if($("password").value === $("password_conf").value) {
                check = true;
            }
            check.should.be.equal(true);
        });        
    });

    context('Incorrect values in Form', function() {
        afterEach(function() {
            resetForm();
        });

        it('should show an error', function() {
            $("full_name").value = "Sergio";
            $("email").value = "sergio@gmail.com";
            $("password").value = "=Sergio0";
            $("password_conf").value = "=Sergio0";
            $("conditions").checked = true;
            $("send").click();
            var e = $("form").children.length;
            e.should.be.equal(15);
        });

        it('should show an error', function() {
            $("full_name").value = "Sergio Asenjo";
            $("email").value = "sergio@";
            $("password").value = "=Sergio0";
            $("password_conf").value = "=Sergio0";
            $("conditions").checked = true;
            $("send").click();
            var e = $("form").children.length;
            e.should.be.equal(15);
        });

        it('should show an error', function() {
            $("full_name").value = "Sergio Asenjo";
            $("email").value = "sergio@gmail.com";
            $("password").value = "=Sergio";
            $("password_conf").value = "=Sergio";
            $("conditions").checked = true;
            $("send").click();
            var e = $("form").children.length;
            e.should.be.equal(15);
        });

        it('should show an error', function() {
            $("full_name").value = "Sergio Asenjo";
            $("email").value = "sergio@gmail.com";
            $("password").value = "=Sergio0";
            $("password_conf").value = "=Sergio0";
            $("conditions").checked = false;
            $("send").click();
            var e = $("form").children.length;
            e.should.be.equal(15);
        });

        it('should show an error', function() {
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