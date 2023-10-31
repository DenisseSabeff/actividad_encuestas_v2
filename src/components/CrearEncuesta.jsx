import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const CrearEncuesta = ({ agregarEncuesta }) => {
    const { register, handleSubmit, formState: { errors }, control } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "opcionesRespuesta",
    });

    const navigate = useNavigate();

    const onSubmit = (data) => {
        agregarEncuesta(data);
        navigate('/');
    };

    
    return (
        <div>
            <h1>Crear Nueva Encuesta</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Título:</label>
                <input
                    type="text"
                    id="titulo"
                    name="titulo"
                    {...register("titulo", {
                        required: 'Este campo es obligatorio',
                        maxLength: {
                            value: 50,
                            message: 'El título debe tener menos de 50 caracteres'
                        }
                    })}
                />
                {errors.titulo && <p>{errors.titulo.message}</p>}

                <label>Descripción:</label>
                <textarea
                    id="descripcion"
                    name="descripcion"
                    {...register("descripcion", {
                        maxLength: {
                            value: 200,
                            message: 'La descripción debe tener menos de 200 caracteres'
                        }
                    })}
                />
                {errors.descripcion && <p>{errors.descripcion.message}</p>}


                {/* Campo para la pregunta */}
                <label>Pregunta:</label>
                <input
                    type="text"
                    id="pregunta"
                    name="pregunta"
                    {...register("pregunta", {
                        required: 'Este campo es obligatorio',
                    })}
                />
                {errors.pregunta && <p>{errors.pregunta.message}</p>}

                {/* Campo para las opciones de respuesta */}
                <label>Opciones de Respuesta:</label>
                {fields.map((option, index) => (
                    <div key={option.id}>
                        <input
                            type="text"
                            {...register(`opcionesRespuesta.${index}.opcion`, {
                                required: 'Este campo es obligatorio',
                            })}
                        />
                        <button type="button" onClick={() => remove(index)}>
                            Eliminar Opción
                        </button>
                    </div>
                ))}
                <button type="button" onClick={() => append({ opcion: "" })}>
                    Agregar Opción
                </button>

                <button type="submit">Guardar Encuesta</button>
            </form>
        </div>
    );
};

export default CrearEncuesta;
