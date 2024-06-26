document.addEventListener('DOMContentLoaded', () => {
	const success = document.querySelector('.success')
	document.addEventListener('click', e => {
		if (e.target.classList.contains('success')) {
			success.classList.remove('success--visible')
		}
	})
})
