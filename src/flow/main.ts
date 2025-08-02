import { ApplicantInfo, Step } from './type';
import { StepHandler } from './step-handler';
import { StepDetermination } from './stepDetermination';
import { sleep } from './utils';


const applicantInfo: ApplicantInfo = {
  isWomen: true,
  service: 'Оформлення закордонного паспорта',
  // fileName: 'pb_3579800598 (1).jks',
  // password: 'password from key',
  fileName: 'fileName.pfx',
  password: 'password from key#',
  day: '30',
  monthOrderNumber: '12',
  year: '1950',
  location: 'Канада',
  // institution: 'Генеральне Консульство України в Едмонтоні',
  // institution: 'Посольство України в Канаді',
  institution: 'Генеральне Консульство України в Торонто',
  visitForApplicant: true,
  // dependents: [
  //   { firstName: 'dependentName_1', lastName: 'dependentLastName_2' },
  //   { firstName: 'dependentName_2', lastName: 'dependentLastName_2', middleName: 'dependentLastName_3' },
  // ],
};


export async function main() {

  const stepHandler = await StepHandler.INIT(applicantInfo);

  const stepDetermination = new StepDetermination(stepHandler.getPage());

  const step = await stepDetermination.getStep();

  let unknownStateCounter = 0;
  let currentState: Step = Step.Unknown;

  let previousStep = Step.Unknown;

  while (currentState !== Step.DateSelector || unknownStateCounter === 5) {
    currentState = await stepDetermination.getStep();

    if (currentState === Step.Loading) {
      await sleep(5, 'Loading');
      continue;
    }

    if (currentState === Step.Unknown || previousStep === currentState) {
      unknownStateCounter++;
      await sleep(5, 'Step.Unknown');
    } else {
      await stepHandler.executeStep(currentState);
      await sleep(1, `Finished ${currentState}`);
      previousStep = currentState;
    }
  }
}


main();



