import { getProductIdentifier } from '@xsite-ui/fintech.utils';

export const sortByApr = (a, b) => {
  return a.offerData?.apr - b.offerData?.apr;
};

export const getProducts = (products) => {
  return products?.map((product) => {
    return {
      ...product,
      productIdentifier: getProductIdentifier(product),
    };
  });
};