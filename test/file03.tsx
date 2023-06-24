import { StepAnswers } from '@xsite-ui/common.questionnaire-manager';
import React from 'react';

import Input from '../../../input';
import { Container } from './styles';

const ManualAddress = ({ onBlur, questions, stepAnswers }) => {
  return (
    <Container>
      {questions.map((question, index) => {
        const { answers, config, data, id, type } = question;
        const questionProps = {
          answers,
          questionConfig: config,
          questionId: id,
          placeHolder: data.placeHolder,
        };
        const questionInfo = {
          questionId: id,
          questionType: type,
        };

        return (
          <Input
            {...questionProps}
            defaultValue={stepAnswers?.[id]?.value as string}
            key={`${id}-${index}`}
            onBlur={(answer: StepAnswers) => onBlur(answer, questionInfo)}
            // isInvalidQuestion={isInvalidQuestion}
          />
        );
      })}
    </Container>
  );
};

export default ManualAddress;