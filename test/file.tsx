/** @jsxRuntime classic */
/** @jsx jsx */

import {jsx} from '@emotion/react';
import {Image} from '@xsite-ui/common.image';
import {useFilterContext} from '@xsite-ui/fintech.context-providers/filter-context';
import React from 'react';

import {Step} from '../step/step';
import {filtersContent, filtersStyle, imageStyle, titleStyle} from './styles';

interface FiltersContentProps {
  onInputChange?: () => void;
  isOpen?: boolean;
  isSticky?: boolean;
  maxWidth?: number;
  isMobile?: boolean;
}

function FiltersContent(props: FiltersContentProps) {
  const {onInputChange, isOpen = false, isSticky = false, maxWidth = 840, isMobile} = props;
  const {filters = []} = useFilterContext();
  const firstFilterData = filters[0]?.[0]?.data || {};
  const {title, image} = firstFilterData;
  const showImage = filters.length === 1 && image && !isMobile;

  return (
    <div css={filtersContent(isOpen, isSticky, maxWidth, showImage)}>
      {showImage && (
        <Image
          css={imageStyle}
          src={image?.url}
          alt={title || ''}
          attributes={{width: '60', height: '60'}}
        />
      )}
      {title && (
        <div
          css={titleStyle(showImage)}
          data-testid={isSticky ? 'sticky-filters-title' : 'filters-title'}
        >
          {title}
        </div>
      )}
      <div css={filtersStyle(showImage)}>
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

export {FiltersContent};