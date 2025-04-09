// This is just an example,
// so you can safely delete all default props below
import ruRU from "../ru-RU/index";
export default {
  "en-US": {
    welcome: "Welcome",
    registrationText: "Registration",
    enterName: "Enter your name",
    enterSecondName: "Enter your second name",
    enterEmail: "Enter your email",
    enterPassword: "Enter your password",
    registration: {
      button: "Register",
      accountText: "Do you have an account? Enter",
      carousel: {
        mail: {
          title: "Mail",
          text: ` The special character "@" must be present in the mail. Make sure
                that you have entered the correct and working email address.`,
        },
        password: {
          title: "Password",
          text: ` The password must consist of 6 characters with special characters.`,
        },
      },
    },
    authorization: {
      button: "Authorize",
    },
  },
  "ru-RU": ruRU,
};
