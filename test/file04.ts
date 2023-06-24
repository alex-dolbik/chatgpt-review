import styled from '@emotion/styled';
import { Theme } from '@xsite-ui/common.style';

export const Container = styled.div<{ theme?: Theme }>`
  display: grid;
  gap: ${({ theme }) => theme?.space?.[5] || 20}px;
  grid-template-columns: repeat(2, 1fr);

  & [data-role='question'] {
    grid-column: 1 / span 2;
  }

  & [data-role='question']:nth-of-type(4) {
    grid-column: 1;
  }

  & [data-role='question']:nth-of-type(5) {
    grid-column: 2;
  }

  margin-bottom: 36px;
`;