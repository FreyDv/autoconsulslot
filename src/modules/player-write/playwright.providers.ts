import { Provider } from '@nestjs/common';
import { Browser, chromium } from 'playwright';
import { PLAYWRIGHT_BROWSER } from './playwright.constants';


export const browserProvider: Provider = {
  provide: PLAYWRIGHT_BROWSER,
  useFactory: async (): Promise<Browser> => {

    const browser = await chromium.connectOverCDP('http://localhost:9222', { slowMo: 500 });

    const context = browser.contexts()[0];

    return context.browser()!;
  },
};


// /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --user-data-dir=~/debug --remote-debugging-port=9222


/*
* <div role="presentation" class="MuiAutocomplete-popper css-1mtsuo7 MuiPopperUnstyled-root" width="640" style="position: absolute; inset: 0px auto auto 0px; width: 640px; margin: 0px; transform: translate3d(80px, 685px, 0px);" data-popper-placement="bottom-start"><div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiAutocomplete-paper css-qcozyl"><div class="jss335"><div class="MuiAutocomplete-listbox css-qwbe3" role="listbox" id="consularInstitution-listbox" aria-labelledby="consularInstitution-label" width="640" style="position: relative; height: 132px; width: 100%; overflow: auto; will-change: transform; direction: ltr;"><div style="height: 120px; width: 100%;"><li tabindex="-1" role="option" id="consularInstitution-option-0" data-option-index="0" aria-disabled="false" aria-selected="false" class="MuiAutocomplete-option jss241 Mui-focused" style="position: absolute; left: 0px; top: 6px; height: 40px; width: 100%;">Генеральне Консульство України в Едмонтоні</li><li tabindex="-1" role="option" id="consularInstitution-option-1" data-option-index="1" aria-disabled="false" aria-selected="false" class="MuiAutocomplete-option jss241" style="position: absolute; left: 0px; top: 46px; height: 40px; width: 100%;">Генеральне Консульство України в Торонто</li><li tabindex="-1" role="option" id="consularInstitution-option-2" data-option-index="2" aria-disabled="false" aria-selected="false" class="MuiAutocomplete-option jss241" style="position: absolute; left: 0px; top: 86px; height: 40px; width: 100%;">Посольство України в Канаді</li></div></div><div class="jss336" style="position: relative; top: -2px;"></div><div id="hiddenTextMeasure" style="position: fixed; top: -9999px; left: -9999px; width: 0px; height: 0px; overflow: hidden; visibility: hidden; pointer-events: none; z-index: -1;"></div></div></div></div>
* */