import styled from '@emotion/styled';
import { PropsWithFintechTheme } from '@xsite-ui/fintech.theme';

export const FeesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 266px;
  flex-shrink: 0;
`;

export const Title = styled.div<PropsWithFintechTheme>`
  font-weight: ${({ theme }) => theme?.fontWeights?.semiBold};
  line-height: 22px;
  margin-bottom: 8px;
`;

export const ReqularText = styled.div<PropsWithFintechTheme>`
  font-size: 14px;
  line-height: 24px;
`;

export const RowWrapper = styled.div`
  justify-content: space-between;
`;

export const BoldText = styled.div<PropsWithFintechTheme>`
  font-weight: ${({ theme }) => theme?.fontWeights?.semiBold};
  font-size: 14px;
  line-height: 24px;
`;

export const LenderRebate = styled.div`
  display: flex;
  align-items: center;
`;