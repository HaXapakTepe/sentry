$(document).ready(function () {
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
	const symbol = /^@/

	const title = document.querySelector('.form__title')
	const form = document.querySelector('#form')
	const formNameInput = form?.querySelector('#form-name-input')
	const formEmailInput = form?.querySelector('#form-email-input')
	const btn = form?.querySelector('.form__btn')
	const btnText = form?.querySelector('.form__btn-text')

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

		if (
			!symbol.test(formNameInput.value) ||
			formNameInput.value.length < 2 ||
			formNameInput.value.length > 30
		) {
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

		$.ajax({
			url: '/send.php',
			type: 'POST',
			data: {
				name: formNameInput.value,
				email: formEmailInput.value,
			},
			cache: false,
			dataType: 'html',
			success: function (data) {
				title.textContent = 'Отправлено!'
				btn.classList.add('btn--green')
				btnText.textContent = 'Успешно получена'
				setTimeout(() => {
					formNameInput.value = ''
					formEmailInput.value = ''
					title.textContent = 'Получить доступ'
					btn.classList.remove('btn--green')
					btnText.textContent = 'Свяжитесь со мной'
				}, 3000)
			},
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

	formNameInput.addEventListener('focus', () => {
		if (formNameInput.value == '') {
			formNameInput.value = '@'
		}
	})

	form?.addEventListener('submit', submitForm)
})
