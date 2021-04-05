import React, {
	Fragment,
	useState,
	useEffect,
} from 'react';
import Cita from './components/Cita';
import Formulario from './components/Formulario';

function App() {
	//Citas en LocalStorage
	let citasIniciales = JSON.parse(
		localStorage.getItem('citas')
	);
	if (!citasIniciales) {
		citasIniciales = [];
	}
	//Arreglo de Citas
	const [citas, setCitas] = useState([]);

	//Use Effect para realizar ciertas operaciones cuando el state cambia
	useEffect(() => {
		let citasIniciales = JSON.parse(
			localStorage.getItem('citas')
		);
		if (citasIniciales) {
			localStorage.setItem(
				'citas',
				JSON.stringify(citas)
			);
		} else {
			localStorage.setItem(
				'citas',
				JSON.stringify([])
			);
		}
	}, [citas]);

	//Crear función que tome las citas actuales y agregue una nueva
	const crearCita = cita => {
		setCitas([...citas, cita]);
	};

	//Función que elimina una cita por su ID
	const eliminarCita = id => {
		const nuevasCitas = citas.filter(
			cita => cita.id !== id
		);
		setCitas(nuevasCitas);
	};

	//Mensaje Condicional
	const titulo =
		citas.length === 0
			? 'No hay citas'
			: 'Administra tus citas';
	return (
		<Fragment>
			<h1>Administrador de pacientes</h1>

			<div className="container">
				<div className="row">
					<div className="one-half column">
						<Formulario crearCita={crearCita} />
					</div>

					<div className="one-half column">
						<h2>{titulo}</h2>
						{citas.map(cita => (
							<Cita
								key={cita.id}
								cita={cita}
								eliminarCita={eliminarCita}
							/>
						))}
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default App;
