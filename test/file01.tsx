import { INPUT_TYPES } from '@xsite-ui/prequal-funnels.constants';
import React, { useState } from 'react';

import { AddressQuestionProps } from '../types';
import FullAddress from './components/full-address';
import ManualAddress from './components/manual-address';
import { Container, ToggleButton, ToggleContainer } from './styles';
import { getToggleCtaTextToRender, getToggleTextToRender } from './utils';

const Address = ({ onBlur, questions, stepAnswers }: AddressQuestionProps) => {
  const [isManualAddressQuestionsShown, setIsManualAddressQuestionsShown] = useState(false);
  const fullAddressQuestion = questions.find((question) => question.type === INPUT_TYPES.address);
  const manualAddressQuestions = questions.filter(
    (question) => question.type !== INPUT_TYPES.address,
  );
  console.log('manualAddressQuestions', manualAddressQuestions);
  return (
    <Container>
      {isManualAddressQuestionsShown ? (
        <ManualAddress
          onBlur={onBlur}
          questions={manualAddressQuestions}
          stepAnswers={stepAnswers}
        />
      ) : (
        <FullAddress onBlur={onBlur} question={fullAddressQuestion} stepAnswers={stepAnswers} />
      )}
      <ToggleContainer>
        {getToggleTextToRender(isManualAddressQuestionsShown)}
        <ToggleButton onClick={() => setIsManualAddressQuestionsShown((prevState) => !prevState)}>
          {getToggleCtaTextToRender(isManualAddressQuestionsShown)}
        </ToggleButton>
      </ToggleContainer>
    </Container>
  );
};

export default Address;