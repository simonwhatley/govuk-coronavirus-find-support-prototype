const express = require('express')
const router = express.Router()

const Questions = require('./models/questions')
const Results = require('./models/results')

function checkHasAnswers (req, res, next) {
  if (req.session.data.answers === undefined) {
    res.redirect(`${req.baseUrl}/`)
  } else {
    next()
  }
}

// --------------------------------------------------
// Start
// --------------------------------------------------
router.get('/', (req, res) => {
  delete req.session.data
  res.render('index', {
    actions: {
      start: `${req.baseUrl}/nation`
    }
  })
})

// --------------------------------------------------
// Nation
// --------------------------------------------------

router.get('/nation', (req, res) => {
  if (req.session.data.answers === undefined) {
    req.session.data.answers = {}
  }

  res.render('question', {
    question: Questions.question('nation', req.session.data.answers.nation),
    actions: {
      save: `${req.baseUrl}/nation`,
      back: `${req.baseUrl}/`,
      start: `${req.baseUrl}/`
    }
  })
})

router.post('/nation', checkHasAnswers, (req, res) => {
  const errors = []

  if (req.session.data.answers.nation === undefined) {
    const error = {}
    error.fieldName = 'nation'
    error.href = '#nation'
    error.text = 'Choose where you live'
    errors.push(error)
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('nation', req.session.data.answers.nation),
      errors: errors,
      actions: {
        save: `${req.baseUrl}/nation`,
        back: `${req.baseUrl}/`,
        start: `${req.baseUrl}/`
      }
    })
  } else {
    res.redirect(`${req.baseUrl}/help`)
  }
})

// --------------------------------------------------
// Need help with
// --------------------------------------------------
router.get('/help', (req, res) => {
  res.render('question', {
    question: Questions.question('help', req.session.data.answers.help),
    actions: {
      save: `${req.baseUrl}/help`,
      back: `${req.baseUrl}/`,
      start: `${req.baseUrl}/`
    }
  })
})

router.post('/help', checkHasAnswers, (req, res) => {
  const errors = []

  if (req.session.data.answers.help === undefined) {
    const error = {}
    error.fieldName = 'help'
    error.href = '#help'
    error.text = 'Choose what you need to find help with, or ‘I’m not sure’'
    errors.push(error)
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('help', req.session.data.answers.help),
      errors: errors,
      actions: {
        save: `${req.baseUrl}/help`,
        back: `${req.baseUrl}/`,
        start: `${req.baseUrl}/`
      }
    })
  } else {
    res.redirect(`${req.baseUrl}/unsafe`)
  }
})

// --------------------------------------------------
// Feel safe
// --------------------------------------------------
router.get('/unsafe', (req, res) => {
  if (req.session.data.answers.help !== undefined && req.session.data.answers.help.indexOf('feeling_unsafe') !== -1) {
    res.render('question', {
      question: Questions.question('unsafe', req.session.data.answers.unsafe),
      actions: {
        save: `${req.baseUrl}/unsafe`,
        back: `${req.baseUrl}/`,
        start: `${req.baseUrl}/`
      }
    })
  } else {
    res.redirect(`${req.baseUrl}/bills`)
  }
})

router.post('/unsafe', checkHasAnswers, (req, res) => {
  const errors = []

  if (req.session.data.answers.unsafe === undefined) {
    const error = {}
    error.fieldName = 'unsafe'
    error.href = '#unsafe'
    error.text = 'Choose whether you feel safe where you live'
    errors.push(error)
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('unsafe', req.session.data.answers.unsafe),
      errors: errors,
      actions: {
        save: `${req.baseUrl}/unsafe`,
        back: `${req.baseUrl}/`,
        start: `${req.baseUrl}/`
      }
    })
  } else {
    res.redirect(`${req.baseUrl}/bills`)
  }
})

// --------------------------------------------------
// Afford rent mortgage bills
// --------------------------------------------------
router.get('/bills', (req, res) => {
  if (req.session.data.answers.help !== undefined && req.session.data.answers.help.indexOf('paying_bills') !== -1) {
    res.render('question', {
      question: Questions.question('bills', req.session.data.answers.bills),
      actions: {
        save: `${req.baseUrl}/bills`,
        back: `${req.baseUrl}/`,
        start: `${req.baseUrl}/`
      }
    })
  } else {
    res.redirect(`${req.baseUrl}/afford-food`)
  }
})

router.post('/bills', checkHasAnswers, (req, res) => {
  const errors = []

  if (req.session.data.answers.bills === undefined) {
    const error = {}
    error.fieldName = 'bills'
    error.href = '#bills'
    error.text = 'Choose whether you are finding it hard to afford rent, your mortgage or bills'
    errors.push(error)
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('bills', req.session.data.answers.bills),
      errors: errors,
      actions: {
        save: `${req.baseUrl}/bills`,
        back: `${req.baseUrl}/`,
        start: `${req.baseUrl}/`
      }
    })
  } else {
    res.redirect(`${req.baseUrl}/afford-food`)
  }
})

// --------------------------------------------------
// Afford food
// --------------------------------------------------
router.get('/afford-food', (req, res) => {
  if (req.session.data.answers.help !== undefined && req.session.data.answers.help.indexOf('getting_food') !== -1) {
    res.render('question', {
      question: Questions.question('afford-food', req.session.data.answers['afford-food']),
      actions: {
        save: `${req.baseUrl}/afford-food`,
        back: `${req.baseUrl}/`,
        start: `${req.baseUrl}/`
      }
    })
  } else {
    res.redirect(`${req.baseUrl}/get-food`)
  }
})

router.post('/afford-food', checkHasAnswers, (req, res) => {
  const errors = []

  if (req.session.data.answers['afford-food'] === undefined) {
    const error = {}
    error.fieldName = 'afford-food'
    error.href = '#afford-food'
    error.text = 'Choose whether you are finding it hard to afford food'
    errors.push(error)
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('afford-food', req.session.data.answers['afford-food']),
      errors: errors,
      actions: {
        save: `${req.baseUrl}/afford-food`,
        back: `${req.baseUrl}/`,
        start: `${req.baseUrl}/`
      }
    })
  } else {
    res.redirect(`${req.baseUrl}/get-food`)
  }
})

// --------------------------------------------------
// Get food
// --------------------------------------------------

router.get('/get-food', (req, res) => {
  if (req.session.data.answers.help !== undefined && req.session.data.answers.help.indexOf('getting_food') !== -1) {
    res.render('question', {
      question: Questions.question('get-food', req.session.data.answers['get-food']),
      actions: {
        save: `${req.baseUrl}/get-food`,
        back: `${req.baseUrl}/`,
        start: `${req.baseUrl}/`
      }
    })
  } else {
    res.redirect(`${req.baseUrl}/self-employed`)
  }
})

router.post('/get-food', checkHasAnswers, (req, res) => {
  const errors = []

  if (req.session.data.answers['get-food'] === undefined) {
    const error = {}
    error.fieldName = 'get-food'
    error.href = '#get-food'
    error.text = 'Choose whether you are finding it hard to get food'
    errors.push(error)
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('get-food', req.session.data.answers['get-food']),
      errors: errors,
      actions: {
        save: `${req.baseUrl}/get-food`,
        back: `${req.baseUrl}/`,
        start: `${req.baseUrl}/`
      }
    })
  } else {
    res.redirect(`${req.baseUrl}/self-employed`)
  }
})

// --------------------------------------------------
// Self employed
// --------------------------------------------------
router.get('/self-employed', (req, res) => {
  if (req.session.data.answers.help !== undefined && req.session.data.answers.help.indexOf('being_unemployed') !== -1) {
    res.render('question', {
      question: Questions.question('self-employed', req.session.data.answers['self-employed']),
      actions: {
        save: `${req.baseUrl}/self-employed`,
        back: `${req.baseUrl}/`,
        start: `${req.baseUrl}/`
      }
    })
  } else {
    res.redirect(`${req.baseUrl}/stop-working`)
  }
})

router.post('/self-employed', checkHasAnswers, (req, res) => {
  const errors = []

  if (req.session.data.answers['self-employed'] === undefined) {
    const error = {}
    error.fieldName = 'self-employed'
    error.href = '#self-employed'
    error.text = 'Choose whether you are self-employed or a sole trader'
    errors.push(error)
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('self-employed', req.session.data.answers['self-employed']),
      errors: errors,
      actions: {
        save: `${req.baseUrl}/self-employed`,
        back: `${req.baseUrl}/`,
        start: `${req.baseUrl}/`
      }
    })
  } else {
    res.redirect(`${req.baseUrl}/stop-working`)
  }
})

// --------------------------------------------------
// Have you been made unemployed
// --------------------------------------------------
router.get('/stop-working', (req, res) => {
  if (req.session.data.answers.help !== undefined && req.session.data.answers.help.indexOf('being_unemployed') !== -1) {
    res.render('question', {
      question: Questions.question('stop-working', req.session.data.answers['stop-working']),
      actions: {
        save: `${req.baseUrl}/stop-working`,
        back: `${req.baseUrl}/`,
        start: `${req.baseUrl}/`
      }
    })
  } else {
    res.redirect(`${req.baseUrl}/off-work`)
  }
})

router.post('/stop-working', checkHasAnswers, (req, res) => {
  const errors = []

  if (req.session.data.answers['stop-working'] === undefined) {
    const error = {}
    error.fieldName = 'stop-working'
    error.href = '#stop-working'
    error.text = 'Choose whether you have been told to stop working'
    errors.push(error)
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('stop-working', req.session.data.answers['stop-working']),
      errors: errors,
      actions: {
        save: `${req.baseUrl}/stop-working`,
        back: `${req.baseUrl}/`,
        start: `${req.baseUrl}/`
      }
    })
  } else {
    res.redirect(`${req.baseUrl}/off-work`)
  }
})

// --------------------------------------------------
// Off work ill
// --------------------------------------------------
router.get('/off-work', (req, res) => {
  if (req.session.data.answers.help !== undefined && req.session.data.answers.help.indexOf('being_unemployed') !== -1) {
    res.render('question', {
      question: Questions.question('off-work', req.session.data.answers['off-work']),
      actions: {
        save: `${req.baseUrl}/off-work`,
        back: `${req.baseUrl}/`,
        start: `${req.baseUrl}/`
      }
    })
  } else {
    res.redirect(`${req.baseUrl}/going-to-work`)
  }
})

router.post('/off-work', checkHasAnswers, (req, res) => {
  const errors = []

  if (req.session.data.answers['off-work'] === undefined) {
    const error = {}
    error.fieldName = 'off-work'
    error.href = '#off-work'
    error.text = 'Choose whether you are off work because you’re ill or self-isolating'
    errors.push(error)
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('off-work', req.session.data.answers['off-work']),
      errors: errors,
      actions: {
        save: `${req.baseUrl}/off-work`,
        back: `${req.baseUrl}/`,
        start: `${req.baseUrl}/`
      }
    })
  } else {
    res.redirect(`${req.baseUrl}/going-to-work`)
  }
})

// --------------------------------------------------
// Living with vulnerable
// --------------------------------------------------
router.get('/going-to-work', (req, res) => {
  if (req.session.data.answers.help !== undefined && req.session.data.answers.help.indexOf('going_to_work') !== -1) {
    res.render('question', {
      question: Questions.question('going-to-work', req.session.data.answers['going-to-work']),
      actions: {
        save: `${req.baseUrl}/going-to-work`,
        back: `${req.baseUrl}/`,
        start: `${req.baseUrl}/`
      }
    })
  } else {
    res.redirect(`${req.baseUrl}/somewhere-to-live`)
  }
})

router.post('/going-to-work', checkHasAnswers, (req, res) => {
  const errors = []

  if (req.session.data.answers['going-to-work'] === undefined) {
    const error = {}
    error.fieldName = 'going-to-work'
    error.href = '#going-to-work'
    error.text = 'Choose whether you are worried about going in to work'
    errors.push(error)
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('going-to-work', req.session.data.answers['going-to-work']),
      errors: errors,
      actions: {
        save: `${req.baseUrl}/going-to-work`,
        back: `${req.baseUrl}/`,
        start: `${req.baseUrl}/`
      }
    })
  } else {
    res.redirect(`${req.baseUrl}/somewhere-to-live`)
  }
})

// --------------------------------------------------
// Have somewhere to live
// --------------------------------------------------
router.get('/somewhere-to-live', (req, res) => {
  if (req.session.data.answers.help !== undefined && req.session.data.answers.help.indexOf('somewhere_to_live') !== -1) {
    res.render('question', {
      question: Questions.question('somewhere-to-live', req.session.data.answers['somewhere-to-live']),
      actions: {
        save: `${req.baseUrl}/somewhere-to-live`,
        back: `${req.baseUrl}/`,
        start: `${req.baseUrl}/`
      }
    })
  } else {
    res.redirect(`${req.baseUrl}/evicted`)
  }
})

router.post('/somewhere-to-live', checkHasAnswers, (req, res) => {
  const errors = []

  if (req.session.data.answers['somewhere-to-live'] === undefined) {
    const error = {}
    error.fieldName = 'somewhere-to-live'
    error.href = '#somewhere-to-live'
    error.text = 'Choose whether you have somewhere to live'
    errors.push(error)
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('somewhere-to-live', req.session.data.answers['somewhere-to-live']),
      errors: errors,
      actions: {
        save: `${req.baseUrl}/somewhere-to-live`,
        back: `${req.baseUrl}/`,
        start: `${req.baseUrl}/`
      }
    })
  } else {
    res.redirect(`${req.baseUrl}/evicted`)
  }
})

// --------------------------------------------------
// Have you been evicted
// --------------------------------------------------
router.get('/evicted', (req, res) => {
  if (req.session.data.answers.help !== undefined && req.session.data.answers.help.indexOf('somewhere_to_live') !== -1) {
    res.render('question', {
      question: Questions.question('evicted', req.session.data.answers.evicted),
      actions: {
        save: `${req.baseUrl}/evicted`,
        back: `${req.baseUrl}/`,
        start: `${req.baseUrl}/`
      }
    })
  } else {
    res.redirect(`${req.baseUrl}/worried`)
  }
})

router.post('/evicted', checkHasAnswers, (req, res) => {
  const errors = []

  if (req.session.data.answers.evicted === undefined) {
    const error = {}
    error.fieldName = 'evicted'
    error.href = '#evicted'
    error.text = 'Choose whether you have been evicted'
    errors.push(error)
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('evicted', req.session.data.answers.evicted),
      errors: errors,
      actions: {
        save: `${req.baseUrl}/evicted`,
        back: `${req.baseUrl}/`,
        start: `${req.baseUrl}/`
      }
    })
  } else {
    res.redirect(`${req.baseUrl}/worried`)
  }
})

// --------------------------------------------------
// Mental health worries
// --------------------------------------------------
router.get('/worried', (req, res) => {
  if (req.session.data.answers.help !== undefined && req.session.data.answers.help.indexOf('mental_health') !== -1) {
    res.render('question', {
      question: Questions.question('worried', req.session.data.answers.worried),
      actions: {
        save: `${req.baseUrl}/worried`,
        back: `${req.baseUrl}/`,
        start: `${req.baseUrl}/`
      }
    })
  } else {
    res.redirect(`${req.baseUrl}/results`)
  }
})

router.post('/worried', checkHasAnswers, (req, res) => {
  const errors = []

  if (req.session.data.answers.worried === undefined) {
    const error = {}
    error.fieldName = 'worried'
    error.href = '#worried'
    error.text = 'Choose whether you are worried about either your mental health or someone else’s mental health'
    errors.push(error)
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('worried', req.session.data.answers.worried),
      errors: errors,
      actions: {
        save: `${req.baseUrl}/worried`,
        back: `${req.baseUrl}/`,
        start: `${req.baseUrl}/`
      }
    })
  } else {
    res.redirect(`${req.baseUrl}/results`)
  }
})

// --------------------------------------------------
// Results
// --------------------------------------------------
router.get('/results', (req, res) => {
  res.render('results', {
    results: Results.find(),
    actions: {
      back: `${req.baseUrl}/`,
      start: `${req.baseUrl}/`
    }
  })
})

// --------------------------------------------------
// Add routes above this line
// --------------------------------------------------
module.exports = router
