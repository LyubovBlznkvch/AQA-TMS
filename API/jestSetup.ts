/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
import Allure from "allure-js-commons";
import stripAnsi from "strip-ansi";
import { relative } from "path";

type Status = 'passed' | 'failed' | 'skipped' | 'pending';

declare namespace jasmine {
    function getEnv(): any;
    interface CustomReporter {
        jasmineStarted?(suiteInfo: any): void;
        suiteStarted?(result: CustomReporterResult): void;
        specStarted?(result: CustomReporterResult): void;
        specDone?(result: CustomReporterResult): void;
        suiteDone?(result: CustomReporterResult): void;
        jasmineDone?(runDetails: any): void;
    }
    interface CustomReporterResult {
        description: string;
        failedExpectations?: any[];
        fullName: string;
        id: string;
        passedExpectations?: any[];
        pendingReason?: string;
        status?: string;
    }
}

class JasmineAllureReporter implements jasmine.CustomReporter {
    private allure: Allure;

    constructor(allure: Allure) {
        this.allure = allure;
    }

    suiteStarted(suite?: jasmine.CustomReporterResult) {
        if (suite) {
            this.allure.startSuite(suite.fullName);
        } else {
            // case for tests without suite
            this.allure.startSuite(relative(process.cwd(), (expect as any).getState().testPath));
        }
    }

    jasmineDone() {
        if (this.allure.getCurrentSuite()) {
            this.allure.endSuite();
        }
    }

    suiteDone() {
        this.allure.endSuite();
    }

    specStarted(spec: jasmine.CustomReporterResult) {
        if (!this.allure.getCurrentSuite()) {
            this.suiteStarted();
        }
        this.allure.startCase(spec.description);
    }

    specDone(spec: jasmine.CustomReporterResult) {
        let error;
        if (spec.status === "pending") {
            error = { message: spec.pendingReason };
        }
        if (spec.status === "disabled") {
            error = { message: "This test was disabled" };
        }
        const failure = spec.failedExpectations && spec.failedExpectations.length ? spec.failedExpectations[0] : undefined;
        if (failure) {
            error = {
                message: stripAnsi(failure.message),
                stack: stripAnsi(failure.stack)
            };
        }

        this.allure.endCase(spec.status as Status, error);
    }
}

export function registerAllureReporter() {
    const allure = new Allure();
    allure.setOptions({ targetDir: "API/assets/allure-results" });
    jasmine.getEnv().addReporter(new JasmineAllureReporter(allure));
}

registerAllureReporter();