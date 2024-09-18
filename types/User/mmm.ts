const mongoose = require('mongoose');
const { Schema } = mongoose;

const vehiculoSchema = new Schema({
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    año: { type: Number, required: true },
    numeroPlaca: { type: String, required: true, unique: true },
    color: { type: String },
    tipo: { type: String }, // Ejemplo: SUV, Sedan, etc.
    kilometraje: { type: Number },
    fechaCompra: { type: Date },
    provisionActualGasolina: { type: String },
    vencimientoSoat: { type: Date },
    vencimientoRevisionTecnicoMecanica: { type: Date },
    fichasTecnicas: [{
        fecha: { type: Date, required: true },
        descripcion: { type: String, required: true },
        documento: { type: String }
    }],
    mantenimientos: [{
        fecha: { type: Date, required: true },
        descripcion: { type: String, required: true },
        costo: { type: Number, required: true },
        numeroFactura: { type: Number, required: true },
        taller: { type: String }
    }],
    conductorEncargado: { type: String },
    otrosDetalles: { type: Schema.Types.Mixed },
});

const Vehiculo = mongoose.model('Vehiculo', vehiculoSchema);

module.exports = Vehiculo;