import React from 'react';
import PropTypes from 'prop-types';
import { Image, List } from 'semantic-ui-react';

const CartAlbumItem = (props) => {
  const {album} = props;

  return (
    <div>
      <List.Item>
        <Image size='tiny' src={album.image} />
        <List.Content>
          {album.name}
        </List.Content>
        <List.Content floated='right'>
          {album.displayPrice}
        </List.Content>
      </List.Item>
    </div>
  );
};

export default CartAlbumItem;
