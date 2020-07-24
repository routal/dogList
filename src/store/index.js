import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const axios = require('axios').default;

export default new Vuex.Store({
	state: {
		allListBreeds: [],
		imagesDogs: []
	},
	mutations: {
		//Формируем лист для выбора пород собак
		setListBreeds(state, breeds) {
			state.allListBreeds = Object.keys(breeds);
		},
		//Устанавливаем картинки собак
		setImagesDogs(state, images) {
			state.imagesDogs = images;
		},
		//Загружаем больше картинок, когда доскролили до конца страницы
		loadMoreImages(state, images) {
			state.imagesDogs = state.imagesDogs.concat(images);
		},
	},
	actions: {
		//Получаем все породы собак
		LIST_ALL_BREEDS({commit}) {
			axios.get('https://dog.ceo/api/breeds/list/all')
			.then(response => {
				commit('setListBreeds', response.data.message);
			})
			.catch(error => console.log(error));
		},
		//Запрос при смене собак из выпадающего листинга
		CHANGE_BREEDS_DOGS({commit}, nameBreed) {
			let url = `https://dog.ceo/api/breed/${nameBreed}/images/random/20`;
			axios.get(url)
			.then(response => {
				commit('setImagesDogs', response.data.message);
			})
			.catch(error => console.log(error));
		},
		//Запрос, когда доскролили до конца страницы
		LOAD_MORE_IMAGES ({commit}, nameBreed) {
			let url = `https://dog.ceo/api/breed/${nameBreed}/images/random/20`;
			axios.get(url)
			.then(response => {
				commit('loadMoreImages', response.data.message);
			})
			.catch(error => console.log(error));
		}
		
	}
});
