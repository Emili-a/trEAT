import React from 'react';
import { debounce } from 'lodash';
import styles from '../styles/Searchbar.module.css';

export default function SearchBar({ setSearchWord }) {
  return (
    <form className={styles.search}>
      <input
        type="text"
        placeholder="Søk i oppskrifter..."
        name="q"
        // Debounce is used to update the search 150 ms after the last typed letter.
        // Value can be altered for faster/slower update of search
        onChange={debounce((e) => setSearchWord(e.target.value), 150)}
      />
    </form>
  );
}
