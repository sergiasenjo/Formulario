/*jslint
    node: true,
    browser: true,
    unparam: true,
    regexp: true
*/

"use strict";

function $(id) {
    return document.getElementById(id);
}

var ns = function (ns) {
    ns.FULLNAME_RE = /^[a-zñ\-\'\.]+(?:\s[a-zñ\-\'\.]+)+$/i;
    ns.EMAIL_RE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,4}))$/i;
    ns.PASSWORD_RE = /^.*(?=.{6,})(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\@\#\$\%\^\&\*\(\)\-\=\¡\£\_\+\`\~\.\,\<\>\/\?\;\:\'\"\\\|\[\]\{\}]).*$/;
    ns.URL_RE = /^[a-z]{2,}:([0-9]+|\/\/){1}[^\s-]*$/i;
    ns.COUNTRIES = ["España", "Francia", "Italia", "Portugal", "Inglaterra"];
    ns.POSTALCODE_RE = /^([0-4][0-9]{4}|[5][0-2][0-9]{3})$/;
    ns.ERROR_MSG = "Por favor, rellene bien los campos";
    ns.checkPattern = function (pattern, input) {
        var valid = pattern.test(input.value),
            flag = false;

        if(input.value === "") {
            input.className = "white";
        } else {
            if (valid) {
                input.className = "green";
                flag = true;
            } else {
                input.className = "red";
            }
        }
        return flag;
    };
    return ns;
}({});

function checkName() {
    var re = ns.FULLNAME_RE,
        full_name = $("full_name");
    return ns.checkPattern(re, full_name);
}

function checkEmail() {
    var re = ns.EMAIL_RE,
        email = $("email");
    return ns.checkPattern(re, email);
}

function checkPass() {
    var re = ns.PASSWORD_RE,
        pass = $("password");
    return ns.checkPattern(re, pass);
}

function checkPassConf() {
    var password = $("password").value,
        password_conf = $("password_conf").value,
        flag = false;
    if (password === password_conf) {
        $("password_conf").style.backgroundColor = "lightgreen";
        flag = true;
    } else {
        if (password_conf.length === 0) {
            $("password_conf").style.backgroundColor = "white";
        } else {
            $("password_conf").style.backgroundColor = "#F78181";
        }
    }
    return flag;
}

function checkConditions() {
    return $("conditions").checked;
}

function checkCountry() {
    var country = $("country").value;
    if(country === "España") {
        $("postal_code").style.display = "inline";
    } else {
        $("postal_code").style.backgroundColor = "white";
        $("postal_code").style.display = "none";
        $("postal_code").value = "";
    }
}

function checkUrl() {
    var re = ns.URL_RE,
        url = $("url");
    return ns.checkPattern(re, url);
}

function checkPostalCode() {
    var re = ns.POSTALCODE_RE,
        postalcode = $("postal_code");
    return ns.checkPattern(re, postalcode);
}

function generateError() {
    var h4 = document.createElement("h4"),
        texth4 = document.createTextNode(ns.ERROR_MSG),
        div = document.createElement("div");
    div.id = "errordiv";
    h4.appendChild(texth4);
    h4.id = "error";
    $("form").appendChild(div);
    $("errordiv").appendChild(h4).className = "error";
}

function checkFields(e) {
    e.preventDefault();
    if(checkName() && checkEmail() && checkPass() && checkPassConf() && checkConditions()) {
        if(($("url").value !== "" && !checkUrl()) || ($("postal_code").value !== "" && !checkPostalCode())) {
            generateError();
        } else {
            document.forms[1].submit();
        }
    } else {
        if(!$("error")) {
            generateError();
        }
    }
}

function appendSelectCountry() {
    var optionTitle = document.createElement("option"),
        textTitle = textEmpty = document.createTextNode("Selecciona tu país"),
        optionEmpty = document.createElement("option"),
        textEmpty = document.createTextNode("Ninguno");

    optionTitle.appendChild(textTitle);
    optionTitle.setAttribute("disabled", "true");
    optionTitle.setAttribute("selected", "true");
    $("country").appendChild(optionTitle);

    optionEmpty.appendChild(textEmpty);
    $("country").appendChild(optionEmpty);

    ns.COUNTRIES.forEach(function (x) {
        var option = document.createElement("option"),
            country = document.createTextNode(x);
        option.appendChild(country);
        option.value = x;
        $("country").appendChild(option);
    });
}

function resetForm() {
    $("full_name").value = "";
    $("email").value = "";
    $("password").value = "";
    $("password_conf").value = "";
    $("conditions").checked = false;
    $("url").value = "";
    $("address").value = "";
    $("postal_code").value = "";
    $("comments").value = "";
    if($("form").children.length === 15) {
        $("form").removeChild($("errordiv"));
    }    
}

function rmMsgCookies() {
    document.body.removeChild($("box-cookies"));
}

function events() {
    appendSelectCountry();
    $("full_name").addEventListener("keyup", checkName, false);
    $("email").addEventListener("keyup", checkEmail, false);
    $("password").addEventListener("keyup", checkPass, false);
    $("password_conf").addEventListener("keyup", checkPassConf, false);
    $("country").addEventListener("change", checkCountry, false);
    $("url").addEventListener("keyup", checkUrl, false);
    $("postal_code").addEventListener("keyup", checkPostalCode, false);
    $("send").addEventListener("click", checkFields, false);
    $("accept-cookies").addEventListener("click", rmMsgCookies, false);
}

window.onload = events;