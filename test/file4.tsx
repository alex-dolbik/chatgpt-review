import { ProductCardOffersChart } from '@xsite-ui/fintech.product-card-desktop';
// eslint-disable-next-line no-restricted-imports
import {
  OFFERS_CONFIG_BY_TYPE,
  OFFERS_PARAMS_BY_TYPE,
} from '@xsite-ui/fintech.product-card-desktop/src/components/product-card-offers-chart/constants';
import isEmpty from 'lodash.isempty';
import React, { useEffect, useState } from 'react';

import { fetchOfferProdcuts } from './fetch-offer-products';
import { OffersCrossCharHeader } from './offers-cross-chart-header/offers-cross-chart-header';
import { OffersCrossChartWrapper, SecondTitle, SubTitle, Title } from './styles';

export interface OffersCrossChartProps {
  entityContent: {
    title: string;
    secondTitle: string;
    subTitle: string;
    numOfOffers: number;
    type: string;
  };
  domainProps: {
    host?: string;
    path?: string;
  };
}

export const OffersCrossChart = ({ domainProps, entityContent }: OffersCrossChartProps) => {
  const [products, setProducts] = useState([]);
  const { title, secondTitle, subTitle, numOfOffers = 3, type } = entityContent;
  const urlParams = OFFERS_PARAMS_BY_TYPE[type];
  const { productListId } = OFFERS_CONFIG_BY_TYPE[type] || {};
  const { host = '', path = '' } = domainProps;

  useEffect(() => {
    fetchOfferProdcuts(host, path, urlParams, productListId, setProducts, numOfOffers);
  }, [host, numOfOffers, path, productListId, urlParams]);

  if (isEmpty(entityContent)) {
    return null;
  }

  return (
    <OffersCrossChartWrapper>
      <Title as="h2" text={title} />
      <SecondTitle as="h2" text={secondTitle} />
      <SubTitle as="h3" text={subTitle} />
      <OffersCrossCharHeader />
      {products?.map((product, index) => (
        <ProductCardOffersChart
          key={`offer-product-card-${index}`}
          verticalName="mortgage-loans"
          product={product}
          useDefaultLoanData
        />
      ))}
    </OffersCrossChartWrapper>
  );
};

OffersCrossChart.displayName = 'OffersCrossChart';