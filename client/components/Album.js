import React from 'react';
import PropTypes from 'prop-types';
import { Image, Button, Item } from 'semantic-ui-react';

const Album = (props) => {
  const { albums } = props;

  return (
    <div>
      {albums.map((album) => {
        return (
          <Item key={album.id}>
            <Item.Image size="medium" src={album.image} />
            <Item.Content>
              <Item.Header>{album.name}</Item.Header>
              <Item.Meta>
                <span className="price">{album.displayPrice}</span>
              </Item.Meta>
              <Item.Description>{album.description}</Item.Description>
              <Button primary>Purchase Album</Button>
            </Item.Content>
          </Item>
        );
      })}
    </div>
  );
};

export default Album;
/**
 * PROP TYPES
 */
Album.propTypes = {
  albums: PropTypes.array.isRequired,
};
