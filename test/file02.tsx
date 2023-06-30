import PoweredByGoogleIcon from '@xsite-ui/prequal-funnels.assets/powered-by-google';
import { INPUT_TYPES } from '@xsite-ui/prequal-funnels.constants';
import React, {
  ChangeEventHandler,
  FocusEventHandler,
  useCallback,
  // useEffect,
  useState,
} from 'react';

import { TEXT_INPUT_ILLEGAL_CHARACTERS, TEXT_INPUT_MIN_LENGTH } from '../../../input/constants';
import {
  Container,
  ErrorLabelStyle,
  InfoLabelStyle,
  PlaceHolder,
  StyledInput,
} from '../../../input/styles';
import { PoweredByGoogle } from './styles';

const FullAddress = ({ onBlur, question, stepAnswers }) => {
  const { answers, config, id: questionId } = question;
  const { profileKey = '' } = config ?? {};
  const answer = answers?.[0] ?? {};
  const { data, id: answerId } = answer;
  const { errorText } = data ?? {};

  const [isClicked, setIsClicked] = useState(false);
  const [inputValue, setInputValue] = useState((stepAnswers?.[questionId]?.value as string) ?? '');
  const [isInputFilled, setIsInputFilled] = useState(
    Boolean(stepAnswers?.[questionId]?.value as string),
  );
  const [isInvalid, setIsInvalid] = useState(false);

  const clickHandler = () => {
    if (isClicked) {
      return;
    }

    setIsClicked(true);
  };

  const inputHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value = '' } = e?.target ?? {};

    if (value && !TEXT_INPUT_ILLEGAL_CHARACTERS.test(value)) {
      return;
    }

    setInputValue(value);
  };

  const isInputValid = useCallback((value: string) => value.length >= TEXT_INPUT_MIN_LENGTH, []);

  const triggerOnBlurMethod = useCallback(
    (isValid: boolean) => {
      onBlur?.(
        {
          [questionId]: {
            answerId,
            displayValue: inputValue,
            isValid,
            key: profileKey,
            value: inputValue,
          },
        },
        INPUT_TYPES.free_input,
      );
    },
    [inputValue],
  );

  const onBlurHandler: FocusEventHandler<HTMLInputElement> = () => {
    setIsClicked(false);
    setIsInputFilled(Boolean(inputValue));
    const isValid = isInputValid(inputValue as string);
    setIsInvalid(!isValid);
    triggerOnBlurMethod(isValid);
  };

  return (
    <>
      <Container data-role="question" onClick={clickHandler}>
        <StyledInput
          isClicked={isClicked}
          isInputFilled={isInputFilled}
          isInvalid={isInvalid}
          onBlur={onBlurHandler}
          onInput={inputHandler}
          placeholder=""
          value={inputValue}
          error={isInvalid}
          errorMessage={errorText || 'Please enter a valid address'}
          errorCss={ErrorLabelStyle}
          data-testid="address"
          infoCss={InfoLabelStyle}
          name={profileKey}
          tx="input"
          variant="outline"
        />

        <PlaceHolder as="label" isClicked={isClicked} isInputFilled={isInputFilled}>
          Address
        </PlaceHolder>
        {/* {showLoadingAnimation && <LoadingAnimationContainer />} */}
      </Container>
      <PoweredByGoogle data-testid="powered-by-google-icon">
        <PoweredByGoogleIcon />
      </PoweredByGoogle>
    </>
  );
};

export default FullAddress;