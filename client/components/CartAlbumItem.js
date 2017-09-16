import React from 'react';
import PropTypes from 'prop-types';
import { Image, List, Button } from 'semantic-ui-react';

const CartAlbumItem = (props) => {
  const {album, handleAlbumDelete} = props;

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
      <Button value={album.id} onClick={handleAlbumDelete}>Remove From Cart</Button>
    </div>
  );
};

export default CartAlbumItem;
