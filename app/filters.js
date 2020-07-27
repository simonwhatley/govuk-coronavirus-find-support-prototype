'use strict'

module.exports = (env) => {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  const filters = {}

  /* ------------------------------------------------------------------
    utility function to get an error for a component
    example: {{ errors | getErrorMessage('title') }}
    outputs: "Enter a title"
  ------------------------------------------------------------------ */
  filters.getErrorMessage = function (array, fieldName) {
    if (!array || !fieldName) {
      return null
    }

    const error = array.filter((obj) =>
      obj.fieldName === fieldName
    )[0]

    return error
  }

  filters.getFeedbackMessage = (sectionId) => {
    if (!sectionId) {
      return sectionId
    }

    switch (sectionId) {
      case 'feeling_unsafe':
        return 'Was this information on what to do if you’re feeling unsafe or worried about someone else helpful?'
      case 'paying_bills':
        return 'Was this information on paying your bills, rent, or mortgage helpful?'
      case 'getting_food':
        return 'Was this information on getting food helpful?'
      case 'being_unemployed':
        return 'Was this information on being made redundant or unemployed, or not having any work helpful?'
      case 'going_in_to_work':
        return 'Was this information on going in to work helpful?'
      case 'somewhere_to_live':
        return 'Was this information on having somewhere to live helpful?'
      case 'mental_health':
        return 'Was this information on mental health and wellbeing helpful?'
      default:
        return 'What were you looking for support with?'
    }
  }

  filters.getSectionTitle = (sectionId) => {
    if (!sectionId) {
      return sectionId
    }

    switch (sectionId) {
      case 'feeling_unsafe':
        return 'Feeling unsafe'
      case 'paying_bills':
        return 'Paying your rent, mortgage, or bill'
      case 'getting_food':
        return 'Getting food'
      case 'being_unemployed':
        return 'Being made redundant or unemployed, or not having any work'
      case 'going_in_to_work':
        return 'Going in to work'
      case 'somewhere_to_live':
        return 'Having somewhere to live'
      case 'mental_health':
        return 'Mental health and wellbeing'
      default:
        return sectionId
    }
  }

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters
}
