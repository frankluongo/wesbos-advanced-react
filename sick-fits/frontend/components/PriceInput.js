import formatMoney from '@lib/formatMoney';
import styled from 'styled-components';

const PriceInputStyles = styled.div`
  .display {
    font-size: 1rem;

    pointer-events: none;
  }
`;

export default function PriceInput(props) {
  const { value } = props;
  const displayVal = formatMoney(value);
  return (
    <PriceInputStyles>
      <label htmlFor="price">
        <span className="label">Price: </span>
        <input type="number" name="price" id="price" {...props} />
        <span className="display">{displayVal}</span>
      </label>
    </PriceInputStyles>
  );
}
