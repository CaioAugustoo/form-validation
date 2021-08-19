const SHOW_MESSAGE_ERROR = "field-error";

interface ISelectors {
  form: string;
  password: string;
  confirmPassword: string;
}

class ValidationFormFields {
  private readonly form: HTMLFormElement;
  private readonly password: HTMLInputElement;
  private readonly confirmPassword: HTMLInputElement;

  constructor(selectors: ISelectors) {
    this.form = document.querySelector(selectors.form) as HTMLFormElement;
    this.password = document.querySelector(
      selectors.password
    ) as HTMLInputElement;
    this.confirmPassword = document.querySelector(
      selectors.confirmPassword
    ) as HTMLInputElement;

    this.bindEvents();
    this.events();
  }

  private hideMessage(field: HTMLInputElement): void {
    const messageElement = field.nextElementSibling as HTMLSpanElement;

    field.classList.remove(SHOW_MESSAGE_ERROR);
    messageElement.innerText = "";
    messageElement.style.display = "none";
  }

  private comparePasswords(): void {
    const messageElement = this.confirmPassword;

    if (this.password.value !== this.confirmPassword.value) {
      this.showMessage(messageElement, "Senhas não coincidem");
    }
  }

  private checkForEmptyValues(): void {
    const fields: NodeListOf<HTMLInputElement> =
      document.querySelectorAll(".form-fields input");

    fields.forEach(field => {
      if (!field.value.trim().length) {
        this.showMessage(field, "Campo não pode estar em branco");
      } else {
        this.hideMessage(field);
      }
    });
  }

  private showMessage(field: HTMLInputElement, message: string): void {
    const messageElement = field.nextElementSibling as HTMLSpanElement;

    field.classList.add(SHOW_MESSAGE_ERROR);
    messageElement.innerText = message;
    messageElement.style.display = "block";
  }

  private isFormValid(): boolean {
    const errors = [
      ...(document.querySelectorAll(
        ".form-fields .error-message"
      ) as any as Array<HTMLElement>),
    ];

    const containsErrors = errors.filter(el => el.innerText);
    if (!!containsErrors.length) return false;

    return true;
  }

  private submitForm(event: Event): void {
    event.preventDefault();

    this.checkForEmptyValues();
    this.comparePasswords();
    const isValid = this.isFormValid();
    if (!isValid) return;

    console.log("Formlulário enviado :)");
  }

  private bindEvents(): void {
    this.submitForm = this.submitForm.bind(this);
  }

  private events(): void {
    this.form.addEventListener("submit", event => this.submitForm(event));
  }
}

const validation = new ValidationFormFields({
  form: ".form",
  password: ".password",
  confirmPassword: ".password2",
});
