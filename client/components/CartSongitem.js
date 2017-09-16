import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'semantic-ui-react';

  const CartSongItem = (props) => {
    const {song, handleSongDelete} = props;
    return (
      <Table.Row>
        <Table.Cell> {song.name}</Table.Cell>
        <Table.Cell> {song.album.name}</Table.Cell>
        <Table.Cell>{song.trackNumber}</Table.Cell>
        <Table.Cell>{song.displayPrice}</Table.Cell>
        <Button value={song.id} onClick={handleSongDelete}>Remove From Cart</Button>
      </Table.Row>
    );
  };

export default CartSongItem;

