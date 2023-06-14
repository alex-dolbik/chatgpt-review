/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from '@emotion/react';
import { useFilterContext } from '@xsite-ui/fintech.context-providers/filter-context';
import React from 'react';

import { Step } from '../step/step';
import { filtersContent, filtersStyle, titleStyle } from './styles';

interface FiltersContentProps {
  onInputChange?: () => void;
  isOpen?: boolean;
  isSticky?: boolean;
  maxWidth?: number;
}

function FiltersContent(props: FiltersContentProps) {
  const { onInputChange, isOpen = false, isSticky = false, maxWidth = 840 } = props;

  const { filters = [] } = useFilterContext();

  const firstFilterData = filters[0]?.[0]?.data || {};

  const { title } = firstFilterData;

  return (
    <div css={filtersContent(isOpen, isSticky, maxWidth)}>
      {title && (
        <div css={titleStyle} data-testid={isSticky ? 'sticky-filters-title' : 'filters-title'}>
          {title}
        </div>
      )}
      <div css={filtersStyle}>
        {filters.map((stepQuestions, index) => (
          <Step
            stepQuestions={stepQuestions}
            key={index}
            isChartPage
            onInputChange={onInputChange}
          />
        ))}
      </div>
    </div>
  );
}

export { FiltersContent };