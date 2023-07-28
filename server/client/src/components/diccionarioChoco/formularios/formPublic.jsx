import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import NavBar from '../navbars/navbar';
import globalURL from '../../globalURL';

const FormField = ({ label, name, placeholder, errors, type = 'text' }) => (
    <div className='text-left mb-5'>
        <label className='font-bold text-gray-800' htmlFor={name}>{label}</label>
        <Field
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            className="px-2 py-1.5 bg-white border shadow-sm border-slate-500 placeholder-slate-500 focus:outline-none focus:border-mfColor focus:ring-mfColor block w-full sm:w-64 rounded-md sm:text-base focus:ring-1"
        />
        <ErrorMessage name={name} component={() => (
            <div className='error text-red-600 font-medium'>{errors[name]}</div>
        )} />
    </div>
);

const Formulario = () => {
    // const [formularioenviado, cambiarformularioenviado] = useState(false);
    const [dataCategoria, setDataCategoria] = useState([]);
    const [dataRegion, setDataRegion] = useState([]);
    const [arrTama, setArrTama] = useState([]);
    const [dataChoco, setDataChoco] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    //let newDataNeutro = [];
    //let newDataChoco = [];


    useEffect(() => {
        if (!dataCategoria.length) {
            fetch(`${globalURL}categoriagra`)
                .then(res => res.json())
                .then((res) => { setDataCategoria(res) })
        }
    }, [dataCategoria])
    useEffect(() => {
        if (!dataRegion.length) {
            fetch(`${globalURL}regiones`)
                .then(res => res.json())
                .then((res) => { setDataRegion(res) })
        }
    }, [dataRegion])

    const handleSubmit = (values, { resetForm }) => {
        try {
            //addEjemplos();


            // console.log('newDataChoco:', dataChoco);

            //Convertir los arreglos de ejemplos a una string

            const dataChocoString = dataChoco.join('|');


            // Agregar las cadenas de texto al objeto values
            values.significado = values.significado ? values.significado : 'No Aplica';
            values.acepciones = values.acepciones ? values.acepciones : 'No Aplica';
            values.sinonimos = values.sinonimos ? values.sinonimos : 'No Aplica';
            values.colaborador = values.colaborador ? values.colaborador : 'Anónimo';
            values.ejemplo_choco = dataChocoString;
            values.ejemplo_neutro = '';

            // Enviar los datos a la ruta del servidor
            fetch(`${globalURL}palabras`, {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    // Hacer algo con la respuesta del servidor
                    //console.log(data);
                    setArrTama([]);
                    setDataChoco([]);
                    resetForm();

                })
                .catch((error) => {
                    // Manejar el error
                    console.error(error);
                });

            setIsOpen(true);
        } catch (error) {
            console.log("mensaje", error)
        }


    };

    /*function addEjemplos() {
        console.log(dataNeutro)

        arrTama.map((item, index) => {
            const inputNeutro = document.getElementById(`ejemplo_neutro${index}`).value;
            const inputChoco = document.getElementById(`ejemplo_choco${index}`).value;
            newDataNeutro.push(inputNeutro);
            newDataChoco.push(inputChoco);


        })



    };*/

    function newEjemplos() {

        const newDataEjemplo = [...arrTama, 1];
        setArrTama(newDataEjemplo)
    };



    function arrEjemChoco(v, i) {
        const newDataChoco = [...dataChoco]
        newDataChoco[i] = v
        setDataChoco(newDataChoco)

    }

    const closeModal = () => {
        setIsOpen(false);
        //onClose();
    };

    return (
        <div className='w-full min-h-screen text-center'>
            <NavBar mfLogo={"MercadoFácil.mx"} mfLink={"https://mercadofacil.mx/"} cola={"Volver"} colaLink={"/diccionario-choco"}
                verDicc={"Ver Diccionario"} verDiccLink={'/diccionario-choco'} masInfo={"Saber más"} masInfoLink={"https://mercadofacil.mx/las-palabras-del-choco/"} />

            <div className='w-full px-4 mb-2 md:px-6 flex flex-col items-center'>
                <p className='mb-4 mt-4 font-semibold text-mfColor text-3xl'>¡Gracias por contribuir en la mejora de este Diccionario!</p>

                <>
                    <Formik
                        //almacena los valores de cada campo
                        initialValues={{
                            palabra: '',
                            significado: '',
                            //significadoIng: '',
                            acepciones: '',
                            //acepcionesIng: '',
                            sinonimos: '',
                            //sinonimosIng: '',
                            como_se_usa: '',
                            //como_se_usa_Ing: '',
                            titleEjemplo: '',
                            EjemploChoco: '',
                            id_categoria: 4,
                            id_tipo: 1,
                            id_region: 1,
                            colaborador: '',
                            correo_electronico: ''

                        }}
                        //validar que los valores escritos dentro del campo, correspondan a lo solicitado en cada tabla
                        validate={(valores) => {
                            let errores = {};

                            //valores de palabra
                            if (!valores.palabra) {
                                errores.palabra = 'Campo obligatorio*'
                            }

                            if (!valores.significado) {
                                errores.significado = 'Campo obligatorio*'
                            }
                            //valores de significado
                            if (!valores.como_se_usa) {
                                errores.como_se_usa = 'Campo obligatorio*'
                            }


                            //valores de acepsiones
                            /*if (!valores.acepciones) {
                                errores.acepciones = 'ingrese una palabra'
                            } else if (!/^[a-zA-Z\s.,;:?!¡¿()"'-]+$/.test(valores.acepciones)) {
                                errores.acepciones = 'solo puedes escribir palabras'
                            }*/

                            //valores de sinónimos
                            /*if (!valores.sinonimos) {
                                errores.sinonimos = 'ingrese una palabra'
                            } else if (!/^[a-zA-Z\s.,;:?!¡¿()"'-]+$/.test(valores.sinonimos)) {
                                errores.sinonimos = 'solo puedes escribir palabras'
                            }*/

                            //valores de como se usa
                            /*if (!valores.como_se_usa) {
                                errores.como_se_usa = 'Campo obligatorio'
                            } else if (!/^[a-zA-Z\s.,;:?!¡¿()"'-]+$/.test(valores.como_se_usa)) {
                                errores.como_se_usa = 'solo puedes escribir palabras'
                            }*/

                            //valores de ejemplo neutro

                            if (arrTama.length == 0) {
                                errores.titleEjemplo = 'Debe agregar almenos un ejemplo*'
                            }

                            arrTama.map((item, index) => {
                                //valores de ejemplo choco
                                if (!dataChoco[index]) {
                                    errores.EjemploChoco = 'Queda algún campo vacio en los ejemplos*'
                                }
                            })



                            return errores;
                        }}
                        //para enviar formulario
                        onSubmit={handleSubmit}
                    >
                        {({ values, errors }) => (
                            <Form className='max-w-max p-5 mt-3 bg-white rounded-2xl border-2 border-solid border-mfColor shadow-mfBoxShadow'>
                                <h2 className='mb-6 font-semibold text-mfColor text-3xl'>Aportar Palabra</h2>
                                <div className='w-full flex flex-col items-center'>

                                    <div className='w-auto flex flex-col md:flex-row gap-1 md:gap-5'>
                                        <FormField
                                            label="Palabra (requerido):"
                                            name="palabra"
                                            placeholder="Ingrese la palabra"
                                            errors={errors}
                                        />
                                        <FormField
                                            label="Significado (requerido):"
                                            name="significado"
                                            placeholder="Significado de la palabra"
                                            errors={errors}
                                        />



                                    </div>
                                    <div className='w-auto flex flex-col items-center gap-1 mb-3'>
                                        <p className='font-bold text-gray-800'>Ejemplo de cómo usa la palabra (requerido):</p>
                                        <ErrorMessage name="titleEjemplo" component={() => (
                                            <div className='error text-red-600 font-medium'>{errors.titleEjemplo}</div>
                                        )} />
                                        <button type="button" className='max-w-max h-min rounded-md bg-mfColor px-3 py-1.5 text-white shadow-md font-medium' onClick={newEjemplos}><i className="fa-solid fa-plus"></i> Nuevo Ejemplo</button>
                                        <div className=''>
                                            <label htmlFor='titleEjemplo'>Ejemplos Agregados: <span className='font-bold'>{`${arrTama.length}`}</span></label>

                                            <ErrorMessage name="EjemploChoco" component={() => (
                                                <div className='error text-red-600 font-medium'>{errors.EjemploChoco}</div>
                                            )} />

                                        </div>

                                    </div>

                                    <div className='w-full max-h-52 flex flex-col items-center overflow-auto mb-2'>
                                        {arrTama.map((item, index) => (
                                            <div key={index} className='flex gap-3'>

                                                <div className='text-left mb-3'>
                                                    <label htmlFor={`ejemplo_choco${index}`}>{`${index + 1}- Ejemplo:`}</label>
                                                    <Field
                                                        type='text'
                                                        id={`ejemplo_choco${index}`}
                                                        name={`ejemplo_choco${index}`}
                                                        value={dataChoco[index] || ''}
                                                        placeholder="Ejemplo de cómo usa la palabra"
                                                        className="px-2 py-1.5 bg-white border shadow-sm border-slate-500 placeholder-slate-500 focus:outline-none focus:border-mfColor focus:ring-mfColor block w-full sm:w-64 rounded-md sm:text-base focus:ring-1"
                                                        onChange={(event) => arrEjemChoco(event.target.value, index)}
                                                    />
                                                    <ErrorMessage name={`ejemplo_choco${index}`} component={() => (
                                                        <div className='error text-red-600 font-medium'>{errors[`ejemplo_choco${index}`]}</div>
                                                    )} />
                                                </div>
                                                <button type="button" title='Eliminar este ejemplo' className='w-auto my-auto h-min rounded-md bg-mfColor px-3 py-1.5 text-white shadow-md font-medium' onClick={() => {

                                                    try {


                                                        const newDataChoco = [...dataChoco]; // Copia el arreglo original
                                                        newDataChoco.splice(index, 1); // Realiza la modificación en la copia
                                                        setDataChoco(newDataChoco);

                                                        const newArrTama = [...arrTama]; // Copia el arreglo original
                                                        newArrTama.splice(index, 1); // Realiza la modificación en la copia
                                                        setArrTama(newArrTama);
                                                    } catch (error) {
                                                        console.log("Mensaje", error)
                                                    }
                                                }}><i className="fa-solid fa-trash"></i></button>
                                            </div>
                                        ))}

                                    </div>
                                    <div className='w-auto flex flex-col md:flex-row gap-1 md:gap-5'>

                                        <FormField
                                            label="¿En qué casos se usa? (requerido):"
                                            name="como_se_usa"
                                            placeholder="Explique brevemente"
                                            errors={errors}
                                        />
                                        <FormField
                                            label="Sinónimos (separados por coma):"
                                            name="sinonimos"
                                            placeholder="Sinónimos de la palabra"
                                        // errors={errors}
                                        />


                                    </div>

                                    <div className='w-auto flex flex-col md:flex-row gap-1 md:gap-5 mb-4'>

                                        <div className='flex flex-col items-center'>
                                            <label htmlFor="selectedOption" className='font-bold text-gray-800'>¿En que región de Tabasco la has escuchado más?:</label>
                                            <Field as="select" name="id_region" id="id_region"
                                                className="block w-64 rounded-md border-0 px-2 py-2 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:outline-none focus:border-mfColor focus:ring-mfColor sm:max-w-xs sm:leading-6">
                                                
                                                {dataRegion.map((e) => (
                                                    <option key={e.id} value={e.id}>
                                                        {e.region}
                                                    </option>
                                                ))}
                                            </Field>
                                           
                                        </div>


                                    </div>

                                    <div className='w-auto flex flex-col md:flex-row gap-1  md:gap-5'>
                                        <div className='w-64'>
                                            <FormField
                                                label="Nombre:"
                                                name="colaborador"
                                                placeholder="Ingrese su nombre"
                                            // errors={errors}

                                            />
                                            <p className='text-sm text-left -mt-3'>Opcional: Si dejas el nombre vacío tu contribución al diccionario será anónima.</p>
                                        </div>



                                        <div className='w-64'>
                                            <FormField
                                                label="Correo electrónico:"
                                                name="correo_electronico"
                                                placeholder="Ingrse su correo electronico"
                                                type='email'
                                            // errors={errors}
                                            />
                                            <p className='text-sm text-left -mt-3'>Opcional: Si ingresas tu correo electrónico te avisaremos cuando tu aportación sea aprobada o rechazada.</p>
                                        </div>
                                    </div>




                                </div>

                                <button type='submit' className='w-auto rounded-md mt-6 bg-mfColor px-5 py-1.5 text-white shadow-md font-medium'><i className="fa-solid fa-paper-plane"></i> Enviar</button>
                                <div
                                    className={`fixed bg-modal inset-0 flex items-center justify-center transition-all duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                        }`}
                                >
                                    <div className="bg-white mx-4 sm:w-96 p-5 rounded-xl shadow-mfBoxShadow border">
                                        <p className="text-2xl text-gray-800 font-bold mb-3">¡Gracias!</p>
                                        <p className='text-8xl mb-2 text-green-600'><i className="fa-regular fa-circle-check"></i></p>
                                        <p className="text-lg text-gray-700 font-medium mb-4">Su aportación ha sido enviada para su revisión y posterior anexión al diccionario del choco.</p>
                                        <button type="button" className='w-auto h-min rounded-md bg-mfColor px-3 py-1.5 text-white shadow-md font-medium' onClick={closeModal}>Aceptar</button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>

                </>

            </div>
        </div>
    );
}

export default Formulario;