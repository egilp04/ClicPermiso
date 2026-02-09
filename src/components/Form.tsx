import Button from "./Button";
import Input from "./Input";
import InputSelect from "./InputSelect";

const Form = () => {
  return (
    <>
      <div className="flex flex-row w-full justify-between p-4">
        <div className="flex flex-row gap-4">
          <h1>
            <strong>Modificar mi perfil: </strong>
          </h1>
        </div>
        <div className="flex flex-row gap-4 ">
          <span className="material-symbols-outlined"> keyboard_return</span>
          <label>volver</label>
        </div>
      </div>
      <div>
        <form className="grid grid-cols-2 p-4 gap-4">
          <Input
            tipo="text"
            textoLabel="Nombre"
            icon={<span className="material-symbols-outlined">user</span>}
          ></Input>
          <Input
            tipo="text"
            textoLabel="Apellidos"
            icon={<span className="material-symbols-outlined">user</span>}
          ></Input>
          <Input
            tipo="text"
            textoLabel="Correo Electronico"
            icon={<span className="material-symbols-outlined">email</span>}
          ></Input>
          <Input
            tipo="text"
            textoLabel="DNI"
            icon={<span className="material-symbols-outlined">email</span>}
          ></Input>
          <InputSelect
            options={["soltero", "Casado", "Otros"]}
            textLabel="Relacion juridica"
            icon={<span className="material-symbols-outlined">email</span>}
          ></InputSelect>
          <Input
            tipo="text"
            textoLabel="Años de servicio"
            icon={<span className="material-symbols-outlined">email</span>}
          ></Input>

          <div className="flex flex-row gap-2 justify-end w-full col-span-2">
            <Button tipo="secundario" children="Cancelar"></Button>
            <Button tipo="primario" children="Guardar solicitud"></Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
