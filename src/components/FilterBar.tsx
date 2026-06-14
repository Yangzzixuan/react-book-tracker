interface FilterBarProps {
  searchText: string;
  setSearchText: (value: string) => void;
  filterType: string;
  setFilterType: (value: string) => void;
  filterStatus: string;
  setFilterStatus: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

function FilterBar(props: FilterBarProps) {
  return (
    <div className="filterArea">
      <input
        value={props.searchText}
        onChange={(event) => props.setSearchText(event.target.value)}
        placeholder="input searching"
      />
      <select
        value={props.filterType}
        onChange={(event) => props.setFilterType(event.target.value)}
      >
        <option value="all">All</option>
        <option value="book">Book</option>
        <option value="movie">Movie</option>
        <option value="game">Game</option>
        <option value="anime">Anime</option>
      </select>
      <select
        value={props.filterStatus}
        onChange={(event) => props.setFilterStatus(event.target.value)}
      >
        <option value="all">All</option>
        <option value="want">Want</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
      </select>
      <select
        value={props.sortBy}
        onChange={(event) => props.setSortBy(event.target.value)}
      >
        <option value="default">default</option>
        <option value="rating">rating</option>
        <option value="year">year</option>
        <option value="title">title</option>
      </select>
    </div>
  );
}

export default FilterBar;
