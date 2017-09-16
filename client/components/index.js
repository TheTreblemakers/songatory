/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Main } from './Main';
export { default as UserHome } from './UserHome';
export { default as Navbar } from './Navbar';
export { default as Footer } from './Footer';
export { default as Albums } from './Albums';
export { default as Album } from './Album';
export { default as AlbumCard } from './AlbumCard';
export { default as Artists } from './Artists';
export { default as Artist } from './Artist';
export { default as ArtistCard } from './ArtistCard';
export { default as Landing } from './Landing';
export { default as SearchBar } from './SearchBar';
export { default as Splash } from './Splash';
export { default as Songs } from './Songs';
export { Login, Signup } from './AuthForm';
