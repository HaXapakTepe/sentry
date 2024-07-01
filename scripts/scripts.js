document.addEventListener('DOMContentLoaded', () => {
	const video = document.querySelector('.promo__video')

	let count = 0
	video.addEventListener('click', () => {
		const player = document.querySelector('.promo__video-player')
		if (count === 0) {
			video.classList.toggle('promo__video--hidden')
			player.play()
			count = 1
		}
	})
})
