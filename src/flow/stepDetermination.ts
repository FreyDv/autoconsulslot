import { Page } from 'playwright';
import { Step } from './type';

export class StepDetermination {

  constructor(private readonly page: Page) {
  }

  public async getStep(): Promise<Step> {

    const results = await Promise.allSettled([
      this.isLoadingPageStep(),
      this.isEmptyPageStep(),
      this.isInitialPageStep(),
      this.isChoseAuthMethodStep(),
      this.isFileKeyStep(),
      this.isUserHomePageStep(),
      this.isVisitStep(),
      this.isApplicantInfoStep(),
      this.isLocationStep(),
      this.isApplicantPersonDeterminationStep(),
      this.isDataSelectorStep(),
    ]);

    const hitIndex = results.findIndex(r => r.status === 'fulfilled' && r.value);

    return hitIndex >= 0
      ? hitIndex as Step
      : Step.Unknown;
  }

  private async isLoadingPageStep(): Promise<boolean> {
    return await this.page.locator('img[alt="Loading..."]').isVisible();
  }

  private async isEmptyPageStep(): Promise<boolean> {
    return await this.page.locator('#oneGoogleBar').isVisible();
  }

  private async isInitialPageStep(): Promise<boolean> {
    return this.page.locator('//a[@href=\'https://id.e-consul.gov.ua/\']').isVisible();
  }

  private async isChoseAuthMethodStep(): Promise<boolean> {
    return this.page.getByText('Для авторизації виберіть один з доступних методів:').isVisible();
  }

  private async isFileKeyStep(): Promise<boolean> {
    return this.page.locator('//h4[contains(normalize-space(.),\'Увійдіть за допомогою особистого ключа\')]').isVisible();
  }

  private async isUserHomePageStep(): Promise<boolean> {
    const splitUrl = this.page.url().split('/');
    return splitUrl[splitUrl.length - 1] === 'messages';
  }

  private async isVisitStep(): Promise<boolean> {
    const splitUrl = this.page.url().split('/');
    return splitUrl[splitUrl.length - 1] === 'visits';
  }

  private async isApplicantInfoStep(): Promise<boolean> {
    const step1Indicator = this.page.locator('//span[text()="Крок 1 із 4"]');
    await step1Indicator.waitFor({ state: 'visible', timeout: 3000 });
    return step1Indicator.isVisible();
  }

  private async isLocationStep(): Promise<boolean> {
    const step2Indicator = this.page.locator('//span[text()="Крок 2 із 4"]');
    await step2Indicator.waitFor({ state: 'visible', timeout: 3000 });
    return step2Indicator.isVisible();
  }

  private async isApplicantPersonDeterminationStep(): Promise<boolean> {
    const step3Indicator = this.page.locator('//span[text()="Крок 3 із 4"]');
    await step3Indicator.waitFor({ state: 'visible', timeout: 3000 });
    return step3Indicator.isVisible();
  }

  private async isDataSelectorStep(): Promise<boolean> {
    const step1Indicator = this.page.locator('//h1[normalize-space(text())=\'Запис на візит\']');
    await step1Indicator.waitFor({ state: 'visible', timeout: 3000 });
    return step1Indicator.isVisible();
  }
}

