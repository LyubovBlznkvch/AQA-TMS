import { PAGES } from "../types/types";
import { HomePage } from "./homePage";
import { BonusPage } from "./bonusPage";

export class PageFactory {
    static getPage(pageName: PAGES) {
        switch (pageName) {
            case PAGES.HOME:
                return new HomePage();
                    case PAGES.BONUS:
                        return new BonusPage();                 
                    default:
                        return new HomePage();
        }
    }
}