<template>
	<div>
		<header class="header">
			<select class="header__item" v-model="breed" @change="changeBreedDogs">
				<option v-for="(breed, index) in allListBreeds"
						:key="index" :value="breed">
						{{breed}}
				</option>
			</select>
		</header>
		<div class="container container_width container_padding">
			<template v-for="img in imagesDogs">
				<Dogs :img="img"/>
			</template>
		</div>
	</div>

</template>

<script>
	// @ is an alias to /src
	import Dogs from '../components/Dogs.vue';
	import {mapState, mapActions} from 'vuex';

	export default {
		data:() => ({
			breed: 'lhasa'
		}),
		components: {
			Dogs
		},
		computed: {
			...mapState(['allListBreeds', 'imagesDogs'])
		},
		methods: {
			...mapActions(['LIST_ALL_BREEDS', 'CHANGE_BREEDS_DOGS', 'LOAD_MORE_IMAGES']),

			changeBreedDogs() {
				this.CHANGE_BREEDS_DOGS(this.breed);
			}
		},
		mounted() {
			this.LIST_ALL_BREEDS();
			this.changeBreedDogs();

			// Считаем сколько осталось до конца страницы
			window.addEventListener('scroll', () => {
				if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
					this.LOAD_MORE_IMAGES(this.breed);
				}
			});

		}
	};
</script>
