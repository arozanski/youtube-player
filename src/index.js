import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/style.css';
import _ from 'lodash';

import VideoList from './components/video_list';
import SearchBar from './components/search_bar';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDcEZF7MmMfcJRDf51Je-H3r5LpaaNlpsA';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			videos: [],
			selectedVideo: null
		};

		this.videoSearch('wallflowers');
	}

	videoSearch(term) {
		YTSearch({ key: API_KEY, term: term }, videos => {
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			});
		});
	}

	render() {
		const videoSearch = _.debounce((term) => { this.videoSearch(term)}, 300);

		return (
			<div>
				<SearchBar onSearchTermChange={ videoSearch }/>
				<VideoDetail video={ this.state.selectedVideo } />
				<VideoList
					videos={ this.state.videos }
					onVideoSelect={ selectedVideo => this.setState({selectedVideo}) }
				/>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('.container'));
