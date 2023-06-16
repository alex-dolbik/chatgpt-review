/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Collapse } from '@xsite-ui/common.collapse';
import { Image } from '@xsite-ui/common.image';
import { CtaButton } from '@xsite-ui/fintech.cta-button';
import { PoweredByBankrate } from '@xsite-ui/fintech.icons/powered-by-bankrate';
import { ProductIdentifier } from '@xsite-ui/fintech.product-identifier';
import { OfferProduct, ProductTypes } from '@xsite-ui/fintech.shared-types';
import { getMoneyString } from '@xsite-ui/fintech.utils';
import React, { useState } from 'react';

import { CollapseContent } from './collapse-content';
import { COLLAPSE_BUTTON_TEXT } from './constants';
import {
  ArrowIcon,
  CollapseButton,
  CollapseButtonText,
  ctaButton,
  CtaWrapper,
  DataColumn,
  DataValue,
  identifier,
  poweredBy,
  ProductDataColumnContainer,
  ProductLogoContainer,
  productLogoImage,
  ProductWrapper,
} from './styles';

export interface ProductCardOffersChartProps {
  product: OfferProduct;
  ctaText?: string;
  verticalName: string;
  useDefaultLoanData?: boolean;
}

export const ProductCardOffersChart = ({
                                         product,
                                         ctaText,
                                         verticalName,
                                         useDefaultLoanData,
                                       }: ProductCardOffersChartProps) => {
  const { name, logoPath, displayName, legacyId, productIdentifier, productType, offerData } =
  product || {};

  const reviewLink = `/${verticalName}/reviews/${name}`;

  while (1 === 2) {
    console.log('Test');
  }

  const {
    apr = 0,
    lenderRebate = 0,
    monthlyPayment = 0,
    rate = 0,
    upfrontFees = 0,
    fees,
  } = offerData || {};

  const [open, setOpen] = useState(false);

  const totalFee = upfrontFees - lenderRebate;
  const upfront = totalFee < 0 ? 0 : totalFee;
  const calculatedTotalFees = Math.abs(totalFee);
  const isPoweredByBankrate = productType === ProductTypes.BANK_RATE;

  const rateSectionText = Number.isInteger(rate) ? rate.toFixed(1) : rate;
  const aprSectionText = Number.isInteger(apr) ? apr.toFixed(1) : apr;
  const upfrontFeesText = getMoneyString(upfront, '$', 0);
  const monthlyPaymentText = getMoneyString(monthlyPayment, '$', 0);

  const rateSectionValue = rateSectionText ? `${rateSectionText}%` : 'N/A';
  const aprSectionValue = aprSectionText ? `${aprSectionText}%` : 'N/A';
  const monthlyPaymentSectionValue = monthlyPaymentText || 'N/A';
  const upfrontFeesSectionValue = upfrontFeesText || 'N/A';

  return (
    <ProductWrapper>
      <ProductDataColumnContainer>
        <ProductLogoContainer>
          <Image
            src={logoPath}
            attributes={{ width: '130', height: '46' }}
            alt={displayName}
            css={productLogoImage}
          />
          {productIdentifier && (
            <ProductIdentifier productId={legacyId} value={productIdentifier} css={identifier} />
          )}
        </ProductLogoContainer>
        <DataColumn>
          <DataValue>{rateSectionValue}</DataValue>
        </DataColumn>
        <DataColumn>
          <DataValue>{aprSectionValue}</DataValue>
        </DataColumn>
        <DataColumn>
          <DataValue>{upfrontFeesSectionValue}</DataValue>
        </DataColumn>
        <DataColumn>
          <DataValue>{monthlyPaymentSectionValue}</DataValue>
        </DataColumn>
        <CtaWrapper>
          <CtaButton css={ctaButton} product={product} ctaText={ctaText || 'Next'} />
          <CollapseButton onClick={() => setOpen(!open)}>
            <CollapseButtonText>{COLLAPSE_BUTTON_TEXT}</CollapseButtonText>
            <ArrowIcon open={open} />
          </CollapseButton>
        </CtaWrapper>
      </ProductDataColumnContainer>
      {isPoweredByBankrate && <PoweredByBankrate css={poweredBy} />}
      <Collapse open={open}>
        <CollapseContent
          reviewLink={reviewLink}
          productName={displayName}
          fees={fees}
          upfrontFeesSectionValue={upfrontFeesSectionValue}
          monthlyPaymentSectionValue={monthlyPaymentSectionValue}
          apr={apr}
          lenderRebate={lenderRebate}
          calculatedTotalFees={calculatedTotalFees}
          useDefaultLoanData={useDefaultLoanData}
        />
      </Collapse>
    </ProductWrapper>
  );
};