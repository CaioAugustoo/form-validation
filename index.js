"use strict";
const SHOW_MESSAGE_ERROR = "field-error";
class ValidationFormFields {
    constructor(selectors) {
        this.form = document.querySelector(selectors.form);
        this.password = document.querySelector(selectors.password);
        this.confirmPassword = document.querySelector(selectors.confirmPassword);
        this.bindEvents();
        this.events();
    }
    hideMessage(field) {
        const messageElement = field.nextElementSibling;
        field.classList.remove(SHOW_MESSAGE_ERROR);
        messageElement.innerText = "";
        messageElement.style.display = "none";
    }
    comparePasswords() {
        const messageElement = this.confirmPassword;
        if (this.password.value !== this.confirmPassword.value) {
            this.showMessage(messageElement, "Senhas não coincidem");
        }
    }
    checkForEmptyValues() {
        const fields = document.querySelectorAll(".form-fields input");
        fields.forEach(field => {
            if (!field.value.trim().length) {
                this.showMessage(field, "Campo não pode estar em branco");
            }
            else {
                this.hideMessage(field);
            }
        });
    }
    showMessage(field, message) {
        const messageElement = field.nextElementSibling;
        field.classList.add(SHOW_MESSAGE_ERROR);
        messageElement.innerText = message;
        messageElement.style.display = "block";
    }
    isFormValid() {
        const errors = [
            ...document.querySelectorAll(".form-fields .error-message"),
        ];
        const containsErrors = errors.filter(el => el.innerText);
        if (!!containsErrors.length)
            return false;
        return true;
    }
    submitForm(event) {
        event.preventDefault();
        this.checkForEmptyValues();
        this.comparePasswords();
        const isValid = this.isFormValid();
        if (!isValid)
            return;
        console.log("Formlulário enviado :)");
    }
    bindEvents() {
        this.submitForm = this.submitForm.bind(this);
    }
    events() {
        this.form.addEventListener("submit", event => this.submitForm(event));
    }
}
const validation = new ValidationFormFields({
    form: ".form",
    password: ".password",
    confirmPassword: ".password2",
});
