import React, { Component } from 'react';
import PropTypes from 'prop-types';
import data from '../data/data.json';
import downArrow from '../../img/angle-down-solid.svg';
import '../../styles/filterable-content.scss';
import _ from 'lodash';

const content = _.sortBy(data.media, ['title']);

let genres = [];
let years = [];

_.forEach(content, function(o) {
  genres = genres.concat(o.genre);
  years.push(o.year);
});

genres = _.uniq(genres).sort();
years = _.uniq(years).sort();

class Content extends Component {
  state = {
    content,
    category: '',
    dropdownExpanded: '',
    selectedGenres: [],
    selectedYears: [],
    genreDropdownOpen: false,
    yearDropdownOpen: false
  };

  selectCategory = (ev) => {
    const category = ev.target.value;
    const { selectedGenres, selectedYears } = this.state;
    const filteredContent = this.getFilteredContent(category, selectedGenres, selectedYears);
    this.setState({
      category,
      content: filteredContent
    });
  }

  selectYear = (ev) => {
    const { category, selectedGenres, selectedYears } = this.state;
    const yearClicked = ev.target.value;
    const yearIndex = selectedYears.indexOf(yearClicked);

    yearIndex !== -1 ? selectedYears.splice(yearIndex, 1) : selectedYears.push(yearClicked);

    const filteredContent = this.getFilteredContent(category, selectedGenres, selectedYears);

    this.setState({
      selectedYears,
      content: filteredContent
    });
  }

  selectGenre = (ev) => {
    const { category, selectedGenres, selectedYears } = this.state;
    const genreClicked = ev.target.value;
    const genreIndex = selectedGenres.indexOf(genreClicked);

    genreIndex !== -1 ? selectedGenres.splice(genreIndex, 1) : selectedGenres.push(genreClicked);

    const filteredContent = this.getFilteredContent(category, selectedGenres, selectedYears);

    this.setState({
      selectedGenres,
      content: filteredContent
    });
  }

  getFilteredContent = (category, genres, years) => {
    return _.filter(content, function(o) {
      const categoryTest = !category || o.type === category;
      const genreTest = genres.length === 0 || Boolean(_.intersection(genres, o.genre).length);
      const yearTest = years.length === 0 || _.indexOf(years, o.year) > -1;
      return categoryTest && genreTest && yearTest;
    });
  }

  openGenreDropdown = () => {
    if (this.state.dropdownExpanded === 'genre') {
      this.setState({
        dropdownExpanded: ''
      });
    } else {
      this.setState({
        dropdownExpanded: 'genre'
      });
    }
  }

  openYearDropdown = () => {
    if (this.state.dropdownExpanded === 'year') {
      this.setState({
        dropdownExpanded: ''
      });
    } else {
      this.setState({
        dropdownExpanded: 'year'
      });
    }
  }

  clearFilters = () => {
    this.setState({
      content,
      category: '',
      dropdownExpanded: '',
      selectedGenres: [],
      selectedYears: [],
      genreDropdownOpen: false,
      yearDropdownOpen: false
    });
  }

  render() {
    return (
      <section className="filterable-content">
      	<div>
      		<div>
      			<div>
      				<div className="row-container">
      					<div className="row align-left dropdown-container">
      						<span className="genre-dropdown dropdown" onClick={ this.openGenreDropdown } >Genre</span>
                  { this.state.dropdownExpanded === 'genre' ?
                    <div className="options-container">
                      <ul class="dropdown-options">
                        { genres.map(o => (
                          <li><input type="checkbox" value={o} onClick={ this.selectGenre } checked={ this.state.selectedGenres.indexOf(o) !== -1 } />{o}</li>
                        ))}
                      </ul>
                    </div> : null
                  }
      					</div>
      					<div className="row align-left dropdown-container" >
      						<span className="year-dropdown dropdown" onClick={ this.openYearDropdown } >Year</span>
                  { this.state.dropdownExpanded === 'year' ?
                    <div className="options-container">
                      <ul class="dropdown-options">
                        { years.map(o => (
                          <li><input type="checkbox" value={o} onClick={ this.selectYear } checked={ this.state.selectedYears.indexOf(o) !== -1 } />{o}</li>
                        ))}
                      </ul>
                    </div> : null
                  }
      					</div>
      					<div className="row search-container">
      						<input type="text" placeholder="Sorry, not functional!"/>
      					</div>
      				</div>
      				<div className="row-container category-container">
      					<div className="row align-left">
      						<input type="radio" name="category" id="movie" value="movie" onChange={ this.selectCategory } checked={ this.state.category === 'movie' } />
      						<label>Movies</label>
      					</div>
      					<div className="row align-left">
      						<input type="radio" name="category" value="book" onChange={ this.selectCategory } checked={ this.state.category === 'book' } />
      						<label>Books</label>
      					</div>
      					<div className="row">
      						<a href="#" onClick={ this.clearFilters } >Clear filters</a>
      					</div>
      				</div>
      			</div>
      		</div>
      	</div>

      	<div>
      		<div>
      			<div className="content-container">
      				<ul>
                { this.state.content.map(item => (
                  <li>
                    <div>
                      <img src={ item.poster } />
                      <br />
                      <span>{ `${item.title} (${item.year})`}</span>
                      <br />
                      <span>{ `Genres: ${item.genre.join(', ')}` }</span>
                    </div>
                  </li>
                ))}
              </ul>
      			</div>
      		</div>
      	</div>
      </section>
    );
  }
}

export default Content;
