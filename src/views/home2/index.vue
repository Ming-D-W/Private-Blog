<template>
	<div>
		<div class="flex justify-center items-center h-screen">
			<div class="w-1/2">
				<div class="text-4xl font-bold">
					<span class="text-blue-500">
						<i class="fa-solid fa-user"></i>
					</span>
					<span class="text-gray-500">
						<i class="fa-solid fa-envelope"></i>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: '',
	data() {
		return {
			user: {
				name: 'John Doe',
				email: 'john.doe@example.com',
			},
		};
	},
	methods: {},
	computed: {},
};
</script>

<style></style>
