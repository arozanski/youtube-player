import React from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';

const API_KEY = 'AIzaSyDcEZF7MmMfcJRDf51Je-H3r5LpaaNlpsA';

class App extends React.Component {
	constructor(props) {
		super(props);

		YTSearch({ key: API_KEY, term: 'wallflowers' }, (videos) => {
			this.setState({ videos });
		});

		this.state = { videos: [] };
	}

	render() {
		return(<div><SearchBar /></div>);
	}
}

ReactDOM.render(<App />, document.querySelector('.container'))
