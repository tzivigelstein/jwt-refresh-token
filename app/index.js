const signupEmailField = document.getElementById('signupEmailField')
const signupPasswordField = document.getElementById('signupPasswordField')
const loginEmailField = document.getElementById('loginEmailField')
const loginPasswordField = document.getElementById('loginPasswordField')

const signupButton = document.getElementById('signupButton')
const loginButton = document.getElementById('loginButton')

const accessToken = document.getElementById('accessToken')
const refreshToken = document.getElementById('refreshToken')

const signupIcon = document.getElementById('signupIcon')
const loginIcon = document.getElementById('loginIcon')

const accessTokenIcon = document.getElementById('accessTokenIcon')

const tokenExpiration = document.getElementById('tokenExpiration')

const newContent = document.getElementById('newContent')
let contentCount = 1

signupButton.addEventListener('click', createUser)
loginButton.addEventListener('click', authUser)

const requestButton = document.getElementById('requestButton')

requestButton.addEventListener('click', request)

const intervals = []

async function authUser() {
  intervals.forEach(interval => clearInterval(interval))
  const data = {
    email: loginEmailField.value,
    password: loginPasswordField.value
  }

  const query = await fetch('http://localhost:4000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const json = await query.json()

  const { access, refresh, exp } = json

  if (access && refresh) setTokens(access, refresh)

  if (query.ok) {
    accessTokenIcon.innerHTML = ''
    accessTokenIcon.append('✔')
    loginIcon.innerHTML = ''
    loginIcon.append('✔')

    const interval = setInterval(() => {
      const now = Date.now()

      const millis = exp * 1000 - now
      const minutes = Math.floor(millis / 60000)

      const seconds = ((millis % 60000) / 1000).toFixed(0)

      tokenExpiration.innerHTML = ` ${minutes}:${seconds > 9 ? seconds : `0${seconds}`} ⌛`

      if (!(minutes >= 0) && !(seconds >= 0)) {
        return () => clearInterval(interval)
      }
    }, 1000)

    intervals.push(interval)
  } else {
    loginIcon.innerHTML = ''
    loginIcon.append('❌')
  }
}

async function createUser() {
  const data = {
    email: signupEmailField.value,
    password: signupPasswordField.value
  }

  const query = await fetch('http://localhost:4000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (query.ok) {
    signupIcon.innerHTML = ''
    signupIcon.append('✔')
  } else {
    signupIcon.innerHTML = ''
    signupIcon.append('❌')
  }
}

async function request() {
  try {
    const query = await fetch('http://localhost:4000/request', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: JSON.stringify({
          access: `Bearer ${accessToken.textContent}`,
          refresh: `Bearer ${refreshToken.textContent}`
        })
      }
    })

    if (query.ok) {
      accessTokenIcon.innerHTML = ''
      accessTokenIcon.append('✔')
      const { content } = await query.json()
      newContent.innerHTML = `-${content} (${contentCount})`
      contentCount++
    } else {
      accessTokenIcon.innerHTML = ''
      accessTokenIcon.append('❌')
      try {
        const data = {
          email: signupEmailField.value,
          password: signupPasswordField.value
        }

        const query = await fetch('http://localhost:4000/renew', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: JSON.stringify({
              access: `Bearer ${accessToken.textContent}`,
              refresh: `Bearer ${refreshToken.textContent}`
            })
          },
          body: JSON.stringify(data)
        })
        const { access, refresh } = await query.json()
        setTokens(access, refresh)
      } catch (error) {
        console.log(error)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

function setTokens(access, refresh) {
  accessToken.innerHTML = ''
  refreshToken.innerHTML = ''

  accessToken.append(access)
  refreshToken.append(refresh)
}
