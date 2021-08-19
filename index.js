"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var SHOW_MESSAGE_ERROR = "field-error";
var ValidationFormFields = /** @class */ (function () {
    function ValidationFormFields(selectors) {
        this.form = document.querySelector(selectors.form);
        this.password = document.querySelector(selectors.password);
        this.confirmPassword = document.querySelector(selectors.confirmPassword);
        this.bindEvents();
        this.events();
    }
    ValidationFormFields.prototype.hideMessage = function (field) {
        var messageElement = field.nextElementSibling;
        field.classList.remove(SHOW_MESSAGE_ERROR);
        messageElement.innerText = "";
        messageElement.style.display = "none";
    };
    ValidationFormFields.prototype.comparePasswords = function () {
        var messageElement = this.confirmPassword;
        if (this.password.value !== this.confirmPassword.value) {
            this.showMessage(messageElement, "Senhas não coincidem");
        }
    };
    ValidationFormFields.prototype.checkForEmptyValues = function () {
        var _this = this;
        var fields = document.querySelectorAll(".form-fields input");
        fields.forEach(function (field) {
            if (!field.value.trim().length) {
                _this.showMessage(field, "Campo não pode estar em branco");
            }
            else {
                _this.hideMessage(field);
            }
        });
    };
    ValidationFormFields.prototype.showMessage = function (field, message) {
        var messageElement = field.nextElementSibling;
        field.classList.add(SHOW_MESSAGE_ERROR);
        messageElement.innerText = message;
        messageElement.style.display = "block";
    };
    ValidationFormFields.prototype.isFormValid = function () {
        var errors = __spreadArray([], document.querySelectorAll(".form-fields .error-message"));
        var containsErrors = errors.filter(function (el) { return el.innerText; });
        if (!!containsErrors.length)
            return false;
        return true;
    };
    ValidationFormFields.prototype.submitForm = function (event) {
        event.preventDefault();
        this.checkForEmptyValues();
        this.comparePasswords();
        var isValid = this.isFormValid();
        if (!isValid)
            return;
        console.log("Formlulário enviado :)");
    };
    ValidationFormFields.prototype.bindEvents = function () {
        this.submitForm = this.submitForm.bind(this);
    };
    ValidationFormFields.prototype.events = function () {
        var _this = this;
        this.form.addEventListener("submit", function (event) { return _this.submitForm(event); });
    };
    return ValidationFormFields;
}());
var validation = new ValidationFormFields({
    form: ".form",
    password: ".password",
    confirmPassword: ".password2",
});
