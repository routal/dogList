<template>
	<div class="dogs">
		<div class="dogs__item">
			<img class="images" :src="img" alt="">
		</div>
	</div>
</template>

<script>
	export default  {
		props: {
			img: {
				type: String,
				required: true
			}
		}
	}
</script>
