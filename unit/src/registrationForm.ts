import { ERROR_MESSAGES } from "unit/utils/types";

 export class RegistrationForm {

    public setUserName (name: string) {
        if (name.length <= 25 && name.length >= 3) {
            return name;
        } else {
            throw new Error (ERROR_MESSAGES.INVALID_NAME_LENGTH);
        }
    };

    public setEmail (email: string) {
        const emailReg = /^([0-9a-zA-Z_\.\-])+\@([a-zA-Z]{2,15})+\.([a-zA-Z]{2,15})$/;
        if (emailReg.test(email)) {
            return email;
        } else {
            throw new Error (ERROR_MESSAGES.INVALID_EMAIL);
        }
    };

    public setPassword (password: string) {
        const passwordReg = /^(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*_]{8,}$/
        if (passwordReg.test(password)) {
                return password;
        } else {
            throw new Error (ERROR_MESSAGES.INVALID_PASSWORD)
        }
    }

    public setPasswordConfirmation(password: string, confirmPassword: string) {
       if (confirmPassword === this.setPassword(password)) {
        return true
       } else {
           throw new Error (ERROR_MESSAGES.PASSWORD_CONFIRMATION_FAILED);
       }   
    }
    }
