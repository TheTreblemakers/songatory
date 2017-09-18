import React from 'react';
import PropTypes from 'prop-types';
import { Table, Image, List, Button } from 'semantic-ui-react';

const CartAlbumItem = (props) => {
  const { album, handleAlbumDelete } = props;

  return (
    <Table.Row>
      <Table.Cell>
        <Image src={album.image} size="mini" />
      </Table.Cell>
      <Table.Cell> {album.name}</Table.Cell>
      <Table.Cell>{album.artist.name}</Table.Cell>
      <Table.Cell>{album.displayPrice}</Table.Cell>
      <Table.Cell>
        <Button icon="remove" value={album.id} onClick={handleAlbumDelete} />
      </Table.Cell>
    </Table.Row>
  );
};

export default CartAlbumItem;
