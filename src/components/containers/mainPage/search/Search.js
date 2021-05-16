import { useRef } from "react";
import styles from "./search.module.css";

const Search = (props) => {
  const inputRef = useRef();
  const sendSearchOnEnter = (e) => {
    if (e.keyCode === 13) {
      sendSearch();
    }
  };
  const sendSearch = () => {
    props.receiveSearch(inputRef.current.value);
    inputRef.current.value = "";
  };

  return (
    <div className={styles.Search}>
      <input
        type="text"
        placeholder="Enter a city..."
        ref={inputRef}
        onKeyDown={sendSearchOnEnter}
      />
      <button onClick={sendSearch}>Search</button>
    </div>
  );
};

export default Search;
