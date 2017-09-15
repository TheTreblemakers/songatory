import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Image, Card, Icon } from 'semantic-ui-react';

const ArtistCard = (props) => {
  const artist = props.artist;
  const imgUrl = 'http://via.placeholder.com/300x300';
  const artistUrl = `/artist/${artist.id}`;
  return (
    <Card key={props.key} raised>
      <Image src={imgUrl} as={Link} to={artistUrl} />
      <Card.Content>
        <Card.Header>{artist.name}</Card.Header>
        <Card.Meta>Artist Blurb Goes Here</Card.Meta>
        <Card.Description>{artist.bio.split('.')[0]}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="right chevron" />
        <Link to={artistUrl}>See More</Link>
      </Card.Content>
    </Card>
  );
};

export default withRouter(ArtistCard);
