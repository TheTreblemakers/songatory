import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_SONGS = 'GET_SONGS';
// const NEW_SONG = 'NEW_SONG';
// const UPDATE = 'UPDATE_SONG';
// const REMOVE_SONG = 'REMOVE_SONG';

/**
 * INITIAL STATE
 */
const defaultSongs = [];

/**
 * ACTION CREATORS
 */
const getSongs = songs => ({ type: GET_SONGS, songs });
// const newSong = song => ({ type: NEW_SONG, song });
// const removeSong = id => ({ type: REMOVE_SONG, id });
// const update = song => ({ type: UPDATE, song });

/**
 * THUNK CREATORS
 */
export const fetchSongs = () => dispatch => {
  axios.get('/api/songs')
    .then(res => {
      dispatch(getSongs(res.data || defaultSongs));
    })
    .catch(err => console.error('Fetching songs unsuccessful', err));
};

// export const fetchSong = id => dispatch => {
//   axios.get(`/api/songs/${id}`)
//     .then(res => 
//       dispatch(update(res.data)))
//     .catch(err => console.error('Fetching song unsuccessful', err));
// };

// optimistic

// export const deleteSong = id => dispatch => {
//   axios.delete(`/api/songs/${id}`)
//     .then(res =>
//       dispatch(removeSong(res.data)))
//     .catch(err => console.error(`Removing song: ${id} unsuccessful`, err));
// };

// export const addSong = song => dispatch => {
//   axios.post('/api/songs', song)
//     .then(res =>
//       dispatch(newSong(res.data)))
//     .catch(err => console.error(`Creating song: ${song} unsuccessful`, err));
// };

// export const updateSong = (id, song) => dispatch => {
//   axios.put(`/api/songs/${id}`, song)
//     .then(res =>
//       dispatch(update(res.data)))
//     .catch(err => console.error(`Updating song: ${song} unsuccessful`, err));
// };

/**
 * REDUCER
 */
export default function reducer(songs = defaultSongs, action) {
  switch (action.type) {
    case GET_SONGS:
      return action.songs;
    // case NEW_SONG:
    //   return [action.song, ...songs];
    // case REMOVE_SONG:
    //   return songs.filter(song => song.id !== action.id);
    // case UPDATE:
    //   return songs.map(song => (
    //     action.song.id === song.id ? action.song : song
    //   ));
    default:
      return songs;
  }
}
