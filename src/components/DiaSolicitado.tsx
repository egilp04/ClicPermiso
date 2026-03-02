import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";
import { useAuthStore } from "../store/AuthStore";

interface DiaSolicitadoInterface {
  telefono: number;
  diaSolicitado: string;
  jornada: string;
  turno: string;
  horas_afectadas: number;
  dias_solicitados: number;
  id_dia_solicitado: string;
  id_profesor: string;
}

const DiaSolicitado = () => {
  const [data, setData] = useState<DiaSolicitadoInterface[]>([]);
  const user = useAuthStore((state) => state.user);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data, error } = await supabase
          .from("DiaSolicitado")
          .select("*")
          .eq("id_profesor", user.id);
        if (error) throw error;
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [user.id]);

  return (
    <div>
      {data.map((d, index) => (
        <div className="flex flex-row gap-10" key={d?.id_profesor + index}>
          <label>Jornada: {d?.jornada}</label>
          <label>Turno: {d?.turno}</label>
          <label>Dias Solicitado: {d?.diaSolicitado}</label>
          <label>Telefono de contacto: {d?.telefono}</label>
          <label>Horas afectadas: {d?.horas_afectadas}</label>
          <label>dias solicitados: {d?.dias_solicitados}</label>
        </div>
      ))}
    </div>
  );
};

export default DiaSolicitado;
