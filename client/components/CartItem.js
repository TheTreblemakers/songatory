import React from 'react';
import PropTypes from 'prop-types';
import { Image, List } from 'semantic-ui-react';

const CartItem = (props) => {
  const {item} = props;

  return (
    <div>
      <List.Item>
        <Image avatar src={item.image} />
        <List.Content>
          {item.name}
        </List.Content>
        <List.Content floated='right'>
          {item.displayPrice}
        </List.Content>
      </List.Item>
    </div>
  );
};

export default CartItem;
/**
 * PROP TYPES
 */
CartItem.propTypes = {
  item: PropTypes.object.isRequired
};
