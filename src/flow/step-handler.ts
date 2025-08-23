import { Browser, BrowserContext, chromium, Locator, Page } from 'playwright';
import path, { dirname, join, resolve } from 'node:path';
import { waitForNotEmptyList } from './utils';
import { ApplicantInfo, Dependent, Step } from './type';
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';

export class StepHandler {

  private applicantInfo: ApplicantInfo;
  private context: BrowserContext;
  private browser: Browser;
  private page: Page;

  public getPage = (): Page => this.page;

  constructor(applicantInfo: ApplicantInfo, context: BrowserContext, browser: Browser, page: Page) {
    this.applicantInfo = applicantInfo;
    this.context = context;
    this.browser = browser;
    this.page = page;
  }

  public async executeStep(step: Step) {
    switch (step) {
      case Step.EmptyPage:
        await this.emptyPageHandler();
        break;
      case Step.InitialPage:
        await this.initialPageHandler();
        break;
      case Step.ChoseAuthMethod:
        await this.choseAuthMethodHandler();
        break;
      case Step.FileKey:
        await this.fileKeyHandler(this.applicantInfo.fileName, this.applicantInfo.password);
        break;
      case Step.UserHomePage:
        await this.userHomePageHandler();
        break;
      case Step.Visit:
        await this.visitHandler();
        break;
      case Step.ApplicantInfo:
        await this.applicantInfoHandler(this.applicantInfo.day, this.applicantInfo.monthOrderNumber, this.applicantInfo.year, this.applicantInfo.isWomen);
        break;
      case Step.Location:
        await this.locationHandler(this.applicantInfo.location, this.applicantInfo.institution);
        break;
      case Step.ApplicantPersonDetermination:
        await this.applicantPersonDeterminationAndServiceSelector(this.applicantInfo.service, this.applicantInfo.visitForApplicant, this.applicantInfo.dependents);
        break;
      case Step.DateSelector:
        await this.dateSelectorHandler();
        break;
      default:
        throw Error('unknown step type');
    }
  }


  public static async INIT(applicantInfo: ApplicantInfo): Promise<StepHandler> {

    let attempt = 5;
    let context;
    let browser;
    let page;

    while (attempt > 0) {
      try {

        browser = await chromium.connectOverCDP('http://localhost:9222', { slowMo: 500 });
        context = browser.contexts()[0];
        page = context.pages()[0];

        if (!context || !browser || !page) {
          attempt--;
          throw new Error('some of !context && !browser && !page are undefined');
        } else {
          break;
        }


      } catch (e) {
        StepHandler.LUNCHCHROME();
      }
    }

    return new StepHandler(applicantInfo, context, browser, page);
  }

  static async LUNCHCHROME(chromePath?: string, applicantInfo?: ApplicantInfo) {
    chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    const rootPath = resolve(join('..','..','browsers'));
    const folder = applicantInfo
      ? join(rootPath, applicantInfo.year + applicantInfo.monthOrderNumber + applicantInfo.day)
      : join(rootPath, 'general');

    const pathToFile = join(folder, 'Default', 'Preferences', 'com.google.Chrome.json');
    const pathToDir = dirname(pathToFile);


    if (!existsSync(pathToDir)) {
      mkdirSync(pathToDir, { recursive: true });
    }


// 1) ensure that the **directory** exists
//     if (!existsSync(pathToDir)) {
//       mkdirSync(pathToDir, { recursive: true });
//     }

// // 2) write the prefs file if it doesn’t already exist
//     if (!existsSync(pathToFile)) {
//       writeFileSync(
//         pathToFile,
//         JSON.stringify({
//           // disable the built-in password manager UI:
//           credentials_enable_service: false,
//           profile: {
//             password_manager_enabled: false,
//           },
//           // set Google as your default search provider
//           default_search_provider: {
//             name: 'Google',
//             keyword: 'google.com',
//             search_url: 'https://www.google.com/search?q={searchTerms}',
//             suggest_url:
//               'https://www.google.com/complete/search?output=chrome&q={searchTerms}',
//           },
//         }, null, 2)
//         , 'utf-8',
//       );
//     }


    const args = [
      `--user-data-dir=${folder}`,
      '--remote-debugging-port=9222',
      '--no-first-run',
      '--no-default-browser-check',
      '--default-search-provider-name="Google"',
    ];

    const child = spawn(chromePath, args, {
      detached: true,    // make it its own process group
      stdio: 'ignore',    // ignore stdio – so Node won’t wait on any of its streams
    });

    child.unref();
  }

  private async emptyPageHandler() {
    await this.page.goto('https://canada.mfa.gov.ua/konsulski-pitannya/zapis-na-konsulskij-prijom');
  }

  private async initialPageHandler() {
    await this.page.click('//a[@href=\'https://id.e-consul.gov.ua/\']');
  }

  private async choseAuthMethodHandler() {
    await this.page.locator('(//button)[2]').click();
  }

  private async fileKeyHandler(fileName: string, password: string) {
    const filePath = path.resolve(join('..','..','data', fileName));
    await this.page.setInputFiles('input[type="file"][accept*=".pfx"]', filePath);
    await this.page.locator('//input[@id=\'id-app-login-sign-form-file-key-password\']').fill(password);
    
    await this.page.click('//button[@id="id-app-login-sign-form-file-key-sign-button"]');
  }

  private async userHomePageHandler() {
    await this.page.click('//a[@href=\'/visits\']');
  }

  private async visitHandler() {
    await this.page.click('text=Записатись на візит');
  }

  private async applicantInfoHandler(DayOfBd: string, monthOfBd: string, yearOfBd: string, isWomen: boolean) {
    await this.page.fill('input[id$="-birthDate-day"]', DayOfBd);
    await this.page.click('div[id$="-birthDate-month"]');
    await this.page.click(`li[data-value='${monthOfBd}']`);
    await this.page.fill('input[id$="-birthDate-year"]', yearOfBd);
    await this.page.click(`input[id$="${isWomen ? 'gender-Ж' : 'gender-Ч'}"]`);
    await this.page.click(`button[id$="next-step-button"]`);
  }

  private async locationHandler(country: string, institutionName: string) {
    await this.page.fill('input[id$="country"]', country);
    await this.page.click(`//li[normalize-space(text())='${country}']`);
    await this.page.click(`//input[@aria-labelledby='consularInstitution']`);

    const locatorListOfInstitution = this.page.locator('//input[@aria-labelledby="consularInstitution"]/following::li[@role="option"]');
    const listOfInstitution = await waitForNotEmptyList(locatorListOfInstitution);

    const institution = listOfInstitution.find(async l =>
      (await l.textContent())?.toLowerCase()?.includes(institutionName.toLowerCase()));

    if (!institution) {
      throw Error(`Cannot find institution ${institutionName} in ${country}`);
    }

    await institution.click();

    await this.page.click(`button[id$="next-step-button"]`);
  }

  private async applicantPersonDeterminationAndServiceSelector(serviceName: string, isApplicantAsVisitor: boolean, dependents?: Dependent[]) {
    await this.page.locator('//button[@title="Відкрити список"]').click();

    const listBox = this.page.locator('//div[@role="listbox" and @id="service-listbox"]');
    const locatorListOfService = listBox.locator('//li[@role="option" and contains(@id, "service-option-")]');


    const serviceList: Map<string, Locator> = new Map();

    let lastLength = 0;
    do {
      lastLength = serviceList.size;
      const li = await waitForNotEmptyList(locatorListOfService);
      for (const l of li) {
        const textContent = await l.textContent();
        if (textContent) {
          serviceList.set(textContent, l);
        }
        if (textContent === serviceName) {
          await l.click();
          break;
        } else {
          await listBox.evaluate((el) => {
            el.scrollBy(0, 40);
          });
        }
      }
    }
    while (!serviceList.has(serviceName) && serviceList.size - lastLength);

    if (isApplicantAsVisitor) {
      await this.page.click('//label[.//span[text()="Для себе"]]//input[@id="whoReceivesService"]');
    }

    if (dependents && dependents.length > 0 && dependents.length < 6) {
      await this.page.click('//label[.//span[text()="Для своєї дитини, підопічного"]]//input[@id="whoReceivesService"]');

      for (const dependent of dependents) {
        const index = dependents.indexOf(dependent);

        if (index !== 0) {
          await this.page.click('//button[@id="add-item-text"]');
        }

        await this.page.locator(`//input[contains(@id, "personArray-${index}-lastName")]`).fill(dependent.lastName);
        await this.page.locator(`//input[contains(@id, "personArray-${index}-firstName")]`).fill(dependent.firstName);
        
        if (dependent.middleName) {
          await this.page.locator(`//input[contains(@id,"personArray-${index}-middleName")]`).fill(dependent.middleName);
        } else {
          await this.page.click(`//input[@id="personArray-${index}-isNoMiddleName"]`);
        }
      }
    }

    await this.page.click(`button[id$="next-step-button"]`);
  }

  private async dateSelectorHandler() {

  }
}