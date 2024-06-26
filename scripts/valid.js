window.addEventListener('DOMContentLoaded', () => {
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
	const symbol = /^@/

	const success = document.querySelector('.success')

	const form = document.querySelector('#form')
	const formNameInput = form?.querySelector('#form-name-input')
	const formEmailInput = form?.querySelector('#form-email-input')

	const checkInputValidity = input => input.value

	const submitForm = async e => {
		e.preventDefault()
		;[formNameInput, formEmailInput].forEach(input => {
			if (!checkInputValidity(input)) {
				input.classList.add('form__input--invalid')
				return
			} else {
				input.classList.remove('form__input--invalid')
			}
		})

		if (!symbol.test(formNameInput.value)) {
			formNameInput.classList.add('form__input--invalid')
			return
		} else {
			formNameInput.classList.remove('form__input--invalid')
		}

		if (!emailRegex.test(formEmailInput.value)) {
			formEmailInput.classList.add('form__input--invalid')
			return
		} else {
			formEmailInput.classList.remove('form__input--invalid')
		}

		fetch('/send.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: formNameInput.value,
				email: formEmailInput.value,
			}),
		})
			.then(response => response.text())
			.then(data => {
				const input = success.querySelectorAll('.form__input')
				success.classList.add('success--visible')
				if (success.classList.contains('success--visible')) {
					input[0].value = formNameInput.value
					input[1].value = formEmailInput.value
					formNameInput.value = ''
					formEmailInput.value = ''
					setTimeout(() => {
						success.classList.remove('success--visible')
					}, 3000)
				}
			})
			.catch(error => {
				console.error('Error:', error)
			})
	}

	document.querySelectorAll('.form-input-name').forEach(input => {
		input.addEventListener('input', event => {
			const inputValue = event.target.value

			if (!symbol.test(inputValue)) {
				input.classList.add('form__input--invalid')
			} else {
				input.classList.remove('form__input--invalid')
			}
		})
	})

	document.querySelectorAll('.form-input-email').forEach(input => {
		input.addEventListener('input', event => {
			const inputValue = event.target.value
			if (!emailRegex.test(inputValue)) {
				input.classList.add('form__input--invalid')
			} else {
				input.classList.remove('form__input--invalid')
			}
		})
	})

	form?.addEventListener('submit', submitForm)
})
