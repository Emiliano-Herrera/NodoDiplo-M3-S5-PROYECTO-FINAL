import Pais from "../models/Pais.mjs";
import IRepositoryPais from "./IRepository.mjs";

class PaisesRepository extends IRepositoryPais {

    async obtenerDesdeApi(){
        try{
        
            const response = await fetch('https://restcountries.com/v3.1/region/americas');
        
            const data = await response.json();
        
            const paisesConEsp = data
                .filter(pais => pais.languages && pais.languages.spa)
                .map(pais => {

                    // Normalizar gini: calcular promedio
                    let giniNormalizado = null;

                    if (pais.gini && Object.keys(pais.gini).length > 0) {
                        const valores = Object.values(pais.gini);

                        const suma = valores.reduce((acc, val) => acc + val, 0);
                        giniNormalizado = suma / valores.length;
                    }
                    
                    return {
                        pais: pais.name.nativeName.spa.common || pais.name.common,
                        nombreOficial: pais.name.nativeName.spa.official || pais.name.official,
                        capital: pais.capital || [],
                        habitantes: pais.population,
                        gini: giniNormalizado,
                        region: pais.region,
                        subRegion: pais.subregion,
                        lenguajes: pais.languages ? Object.values(pais.languages): [],
                        latitudLongitud: pais.latlng || [],
                        area: pais.area,
                        zonasHorarias: pais.timezones || [],
                        paisesVecinos: pais.borders || [],
                        creador: 'Emiliano Olivera Herrera'
                    };
                });

            return paisesConEsp;
        
        }catch(error){
        
            console.error('ERROR al obtener paises de API:', error);
            throw error;
        
        }
    }
    
    async insertarDesdeApi(paisesData){
        const operaciones = paisesData.map(pais => ({
            updateOne: {
                filter: { 
                    nombreOficial: pais.nombreOficial,
                    creador: 'Emiliano Olivera Herrera'
                },
                update: { $setOnInsert: pais },
                upsert: true
            }
        }));
    
        return await Pais.bulkWrite(operaciones);
    }

    async obtenerTodos() {
        return await Pais.find({
            pais: { $exists: true },
            creador: "Emiliano Olivera Herrera"
        });
    }

    async obtenerPorId(id) {
        return await Pais.findById(id);
    }

    async buscarPorAtributo(atributo, valor){

        // Obtener el tipo real del atributo en el schema (models);
        const tipo = Pais.schema.path(atributo)?.instance;

        let filtroValor;
        if(tipo === "Number"){
            filtroValor = Number(valor);
        } else {
            filtroValor = new RegExp(`^${valor}$`, "i");
        }

        const doc = await Pais.find({ [atributo]: filtroValor });
        return doc;

    }

    async crear(paisesData) {

        const nuevoPais = new Pais(paisesData);
        return await nuevoPais.save();

    }

    async actualizar(id, paisesData) {
        return await Pais.findByIdAndUpdate(id, paisesData);
    }

    async eliminar(id) {
        return await Pais.findByIdAndDelete(id);
    }

}

export default new PaisesRepository;