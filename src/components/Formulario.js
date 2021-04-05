/** @format */

import React, {Fragment, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import Proptypes from 'prop-types';

const Formulario = ({crearCita}) => {
	//Crear State de Citas
	const [cita, setCita] = useState({
		mascota: '',
		propietario: '',
		fecha: '',
		hora: '',
		sintomas: '',
	});

	//Crear State de validacion
	const [error, setError] = useState(false);

	//Función que se ejecuta cada vez que el usuario escribe un input
	const actualizarState = e => {
		setCita({
			...cita,
			[e.target.name]: e.target.value,
		});
	};

	//Extraemos los valores
	const {
		mascota,
		propietario,
		fecha,
		hora,
		sintomas,
	} = cita;

	const submitCita = e => {
		e.preventDefault();

		//Validar
		if (
			mascota.trim() === '' ||
			propietario.trim() === '' ||
			fecha.trim() === '' ||
			hora.trim() === '' ||
			sintomas.trim() === ''
		) {
			setError(true);
			return;
		}
		setError(false);

		//Asignar un ID
		cita.id = uuidv4();
		console.log(cita);

		//Crear la cita

		crearCita(cita);

		//Reiniciar el form
		setCita({
			mascota: '',
			propietario: '',
			fecha: '',
			hora: '',
			sintomas: '',
		});
	};

	return (
		<Fragment>
			<h2>Crear Cita</h2>
			{error ? (
				<p className="alerta-error">
					Todos los campos son obligatorios
				</p>
			) : null}
			<form onSubmit={submitCita}>
				<label>Nombre Mascota</label>
				<input
					type="text"
					name="mascota"
					className="u-full-width"
					placeholder="Nombre Mascota"
					onChange={actualizarState}
					value={mascota}
				></input>

				<label>Nombre Dueño</label>
				<input
					type="text"
					name="propietario"
					className="u-full-width"
					placeholder="Nombre Dueño de la Mascota"
					onChange={actualizarState}
					value={propietario}
				/>

				<label>Fecha</label>
				<input
					type="date"
					name="fecha"
					className="u-full-width"
					onChange={actualizarState}
					value={fecha}
				></input>

				<label>Hora</label>
				<input
					type="time"
					name="hora"
					className="u-full-width"
					onChange={actualizarState}
					value={hora}
				></input>

				<label>Sintomas</label>
				<textarea
					className="u-full-width"
					name="sintomas"
					onChange={actualizarState}
					value={sintomas}
				></textarea>

				<button
					type="submit"
					className="u-full-width button-primary"
				>
					Agregar Cita
				</button>
			</form>
		</Fragment>
	);
};

Formulario.propTypes = {
	crearCita: Proptypes.func.isRequired,
};

export default Formulario;
