import { Story } from '@storybook/react';
import { StepAnswers } from '@xsite-ui/common.questionnaire-manager';
import { INPUT_TYPES } from '@xsite-ui/prequal-funnels.constants';
import React, { useState } from 'react';

import questionProps from '../../mocks/home-insurance-address.json';
import Address from '../../src/address';
import { QuestionProps } from '../../src/types';
import { getPixelLabel } from '../../src/utils';
import { useInvalidContext } from '../hooks/use-invalid-context';
import { StyledCta } from '../styles';

const HomeInsuranceAddress: Story<QuestionProps> = () => {
  const { isInvalid, isInvalidTimeOut, isInvalidHandler } = useInvalidContext();
  const { questions } = questionProps;
  const { config, id = '' } = questions[0];
  const { profileKey = '' } = config ?? {};

  const [answer, setAnswer] = useState<StepAnswers>({});

  const onBlurInput = (answer: StepAnswers) => {
    setAnswer(answer);
  };

  const ctaHandler = () => {
    if (!answer?.[id]?.isValid) {
      isInvalidHandler(true);
      return;
    }

    console.log(answer);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Address {...questionProps} isInvalid={isInvalid} onBlur={onBlurInput} />
      <StyledCta
        variant="contained"
        color="primary"
        size="large"
        onClick={ctaHandler}
        data-pixel-label={getPixelLabel(
          profileKey ?? '',
          (answer?.[id]?.value as string) ?? '',
          INPUT_TYPES.free_input,
        )}
        data-testid="dropdown-cta"
        mt={7}
        isInvalid={isInvalidTimeOut}
      >
        Next
      </StyledCta>
    </div>
  );
};

export default HomeInsuranceAddress;
