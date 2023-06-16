import { CdnDto } from '@xsite-ui/common.cdn';
import { buildImageSrc } from '@xsite-ui/common.image';
import { CrossOffersChart } from '@xsite-ui/common.rapido';
import { OfferProduct } from '@xsite-ui/fintech.shared-types';
import { getProductIdentifier, isApplicationEntityDataType } from '@xsite-ui/fintech.utils';

import { BucketProps } from '../types';

export function getOffersCrossChartProps(
  crossOffersChart: BucketProps['crossOffersChart'],
  cdnData: CdnDto,
) {
  const {
    title = '',
    secondTitle = '',
    subTitle = '',
    numOfOffers = 3,
    productListV3 = {},
  } = crossOffersChart || {};

  if (!isApplicationEntityDataType<CrossOffersChart>(crossOffersChart)) {
    return null;
  }

  const { products } = productListV3 as unknown as { products: OfferProduct[] };

  const offerProducts = products
    ?.map((product) => {
      return {
        ...product,
        productIdentifier: getProductIdentifier(product),
        logoPath: buildImageSrc({ src: product?.logoPath, cdn: cdnData }),
      };
    })
    .slice(0, numOfOffers);

  return {
    entityContent: {
      title,
      secondTitle,
      subTitle,
    },
    products: offerProducts,
  };
}