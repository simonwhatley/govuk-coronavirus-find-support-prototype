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
    error.text = 'Select where you want to find information about'
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
    error.text = 'Select what you need to find help with, or ‘Not sure’'
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
  if (req.session.data.answers.help !== undefined &&
    (req.session.data.answers.help.indexOf('feeling_unsafe') !== -1 ||
    req.session.data.answers.help.indexOf('not_sure') !== -1)) {
    res.render('question', {
      question: Questions.question('feel_safe', req.session.data.answers.feel_safe),
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

  if (req.session.data.answers.feel_safe === undefined) {
    const error = {}
    error.fieldName = 'feel_safe'
    error.href = '#feel_safe'
    error.text = 'Select if you feel safe where you live or if you’re worried about someone else'
    errors.push(error)
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('feel_safe', req.session.data.answers.feel_safe),
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
  if (req.session.data.answers.help !== undefined &&
    (req.session.data.answers.help.indexOf('paying_bills') !== -1 ||
    req.session.data.answers.help.indexOf('not_sure') !== -1)) {
    res.render('question', {
      question: Questions.question('afford_rent_mortgage_bills', req.session.data.answers.afford_rent_mortgage_bills),
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

  if (req.session.data.answers.afford_rent_mortgage_bills === undefined) {
    const error = {}
    error.fieldName = 'afford_rent_mortgage_bills'
    error.href = '#afford_rent_mortgage_bills'
    error.text = 'Select yes if you’re finding it hard to pay your rent, mortgage or bills'
    errors.push(error)
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('afford_rent_mortgage_bills', req.session.data.answers.afford_rent_mortgage_bills),
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
  if (req.session.data.answers.help !== undefined &&
    (req.session.data.answers.help.indexOf('getting_food') !== -1 ||
    req.session.data.answers.help.indexOf('not_sure') !== -1)) {
    res.render('question', {
      question: Questions.question('afford_food', req.session.data.answers.afford_food),
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

  if (req.session.data.answers.afford_food === undefined) {
    const error = {}
    error.fieldName = 'afford_food'
    error.href = '#afford_food'
    error.text = 'Select yes if you’re finding it hard to afford food'
    errors.push(error)
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('afford_food', req.session.data.answers.afford_food),
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
  if (req.session.data.answers.help !== undefined &&
    (req.session.data.answers.help.indexOf('getting_food') !== -1 ||
    req.session.data.answers.help.indexOf('not_sure') !== -1)) {
    res.render('question', {
      question: Questions.question('get_food', req.session.data.answers.get_food),
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

  if (req.session.data.answers.get_food === undefined) {
    const error = {}
    error.fieldName = 'get_food'
    error.href = '#get_food'
    error.text = 'Select yes if you’re able to get food'
    errors.push(error)
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('get_food', req.session.data.answers.get_food),
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
  if (req.session.data.answers.help !== undefined &&
    (req.session.data.answers.help.indexOf('being_unemployed') !== -1 ||
    req.session.data.answers.help.indexOf('not_sure') !== -1)) {
    res.render('question', {
      question: Questions.question('self_employed', req.session.data.answers.self_employed),
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

  if (req.session.data.answers.self_employed === undefined) {
    const error = {}
    error.fieldName = 'self_employed'
    error.href = '#self_employed'
    error.text = 'Select yes if you’re self-employed or a sole trader'
    errors.push(error)
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('self_employed', req.session.data.answers.self_employed),
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
  if (req.session.data.answers.help !== undefined &&
    (req.session.data.answers.help.indexOf('being_unemployed') !== -1 ||
    req.session.data.answers.help.indexOf('not_sure') !== -1)) {
    res.render('question', {
      question: Questions.question('have_you_been_made_unemployed', req.session.data.answers.have_you_been_made_unemployed),
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

  if (req.session.data.answers.have_you_been_made_unemployed === undefined) {
    const error = {}
    error.fieldName = 'have_you_been_made_unemployed'
    error.href = '#have_you_been_made_unemployed'
    error.text = 'Select if you’ve been made redundant or unemployed, or put on temporary leave (on furlough)'
    errors.push(error)
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('have_you_been_made_unemployed', req.session.data.answers.have_you_been_made_unemployed),
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
  if (req.session.data.answers.help !== undefined &&
    (req.session.data.answers.help.indexOf('being_unemployed') !== -1 ||
    req.session.data.answers.help.indexOf('not_sure') !== -1)) {
    res.render('question', {
      question: Questions.question('are_you_off_work_ill', req.session.data.answers.are_you_off_work_ill),
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

  if (req.session.data.answers.are_you_off_work_ill === undefined) {
    const error = {}
    error.fieldName = 'are_you_off_work_ill'
    error.href = '#are_you_off_work_ill'
    error.text = 'Select yes if you’re off work because you’re ill or self-isolating'
    errors.push(error)
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('are_you_off_work_ill', req.session.data.answers.are_you_off_work_ill),
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
  if (req.session.data.answers.help !== undefined &&
    (req.session.data.answers.help.indexOf('going_to_work') !== -1 ||
    req.session.data.answers.help.indexOf('not_sure') !== -1)) {
    res.render('question', {
      question: Questions.question('worried_about_work', req.session.data.answers.worried_about_work),
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

  if (req.session.data.answers.worried_about_work === undefined) {
    const error = {}
    error.fieldName = 'worried_about_work'
    error.href = '#worried_about_work'
    error.text = 'Select yes if you’re worried about going in to work'
    errors.push(error)
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('worried_about_work', req.session.data.answers.worried_about_work),
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
  if (req.session.data.answers.help !== undefined &&
    (req.session.data.answers.help.indexOf('somewhere_to_live') !== -1 ||
    req.session.data.answers.help.indexOf('not_sure') !== -1)) {
    res.render('question', {
      question: Questions.question('have_somewhere_to_live', req.session.data.answers.have_somewhere_to_live),
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

  if (req.session.data.answers.have_somewhere_to_live === undefined) {
    const error = {}
    error.fieldName = 'have_somewhere_to_live'
    error.href = '#have_somewhere_to_live'
    error.text = 'Select if you have somewhere to live'
    errors.push(error)
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('have_somewhere_to_live', req.session.data.answers.have_somewhere_to_live),
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
  if (req.session.data.answers.help !== undefined &&
    (req.session.data.answers.help.indexOf('somewhere_to_live') !== -1 ||
    req.session.data.answers.help.indexOf('not_sure') !== -1)) {
    res.render('question', {
      question: Questions.question('have_you_been_evicted', req.session.data.answers.have_you_been_evicted),
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

  if (req.session.data.answers.have_you_been_evicted === undefined) {
    const error = {}
    error.fieldName = 'have_you_been_evicted'
    error.href = '#have_you_been_evicted'
    error.text = 'Select if you have been evicted or might be soon'
    errors.push(error)
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('have_you_been_evicted', req.session.data.answers.have_you_been_evicted),
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
  if (req.session.data.answers.help !== undefined &&
    (req.session.data.answers.help.indexOf('mental_health') !== -1 ||
    req.session.data.answers.help.indexOf('not_sure') !== -1)) {
    res.render('question', {
      question: Questions.question('mental_health_worries', req.session.data.answers.mental_health_worries),
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

  if (req.session.data.answers.mental_health_worries === undefined) {
    const error = {}
    error.fieldName = 'mental_health_worries'
    error.href = '#mental_health_worries'
    error.text = 'Select yes if you’re worried about your mental health or someone else’s mental health'
    errors.push(error)
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('mental_health_worries', req.session.data.answers.mental_health_worries),
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
router.get('/results', checkHasAnswers, (req, res) => {

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
