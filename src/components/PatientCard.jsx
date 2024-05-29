import React from 'react'
import PropTypes from 'prop-types'

function PatientCard({ name }) {

	return (
		<div>
			<h3>{name}</h3>
		</div>
	)
}

PatientCard.propTypes = {}

export default PatientCard
