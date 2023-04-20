import hitos from '../data/hitos.json'
import {useEffect, useState} from 'react'


function Hito() {

  const [dataHitos, setDataHitos] = useState(hitos)


  useEffect(() => {
    // Verifica si hay datos almacenados en localStorage
    const localStorageData = localStorage.getItem('hitosFortnite');

    if (localStorageData) {
      // Si hay datos almacenados, los convierte a un objeto y los establece en el estado
      setDataHitos(JSON.parse(localStorageData));
    } else {
      // Si no hay datos almacenados, carga los datos del archivo data.json y los establece en el estado y en localStorage
      setDataHitos(hitos);
      localStorage.setItem('hitosFortnite', JSON.stringify(hitos));
    }
  }, []);

  function handleAumentar(indice){
    let auxDataHitos = {...dataHitos}
    if(auxDataHitos.campos[indice].valor !== 20)
      auxDataHitos.campos[indice].valor += 1;
    setDataHitos(auxDataHitos);
    localStorage.setItem('hitosFortnite', JSON.stringify(dataHitos));
  }

  function hanldeDisminuir(indice){
    let auxDataHitos = {...dataHitos}
    if(auxDataHitos.campos[indice].valor !== 0)
      auxDataHitos.campos[indice].valor -= 1;
    setDataHitos(auxDataHitos);
    localStorage.setItem('hitosFortnite', JSON.stringify(dataHitos));
  }

  return (

    <div className='flex flex-row flex-wrap'>

      {dataHitos.campos.map((item, indice) => (
        <div className="flex flex-col mt-2 ml-2 w-60 h-60 bg-white rounded-md shadow-md p-4 " key={item.id}>
          <p className="w-full mb-2" >{item.titulo} </p>

          <div className="h-3 w-full bg-gray-300 rounded-lg ">
            <div className="h-full rounded-l-lg rounded-r-lg bg-yellow-600" style={{ width: `${(item.valor*100)/item.max}%` }} ></div>
          </div>  

          <p className='mt-1'> {item.valor}/{item.max} </p>

          <div className='flex flex-row justify-center align-middle items-center mt-5 space-x-10'>
            <button className='w-10 rounded-lg bg-red-400' onClick={() => hanldeDisminuir(indice)}>-</button>
            <button className='w-10 rounded-lg bg-yellow-500' onClick={() => handleAumentar(indice)}>+</button>
          </div>

        </div>
      ))}

    </div>
  );
  }
  
  export default Hito;
  