import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Table, Image, List, Button } from 'semantic-ui-react';

const CartAlbumItem = (props) => {
  const { isCheckout, album, handleAlbumDelete, isLoggedIn } = props;

  return (
    <Table.Row>
      <Table.Cell>
        <Image src={album.image} size="mini" />
      </Table.Cell>
      <Table.Cell> {album.name}</Table.Cell>
      <Table.Cell> {album.year}</Table.Cell>
      <Table.Cell>{album.artist.name}</Table.Cell>
      <Table.Cell>$ {album.displayPrice}</Table.Cell>
      <Table.Cell>
        {!isCheckout && <Button icon="remove" onClick={() => handleAlbumDelete(album.id, isLoggedIn)} />}
      </Table.Cell>
    </Table.Row>
  );
};

export default CartAlbumItem;
