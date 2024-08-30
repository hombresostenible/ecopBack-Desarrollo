import { DataTypes, Model } from 'sequelize';
import db from '../../db';

class Appointment extends Model {
    public id!: string;
    public appointmentId!: number;
    public typeClient!: 'User';
    public nameClient!: string;
    public lastNameClient!: string;
    public corporateName!: string;
    public corporateNameLeader!: string;
    public lastcorporateNameLeader!: string;
    public email!: string;
    public phone!: string;
    public date!: Date;
    public hour!: string;
    public stateAppointment!: 'Programada' | 'Cancelada' | 'Completada' | 'Reagendada';
    public isAceptedConditions!: boolean;
    public typeAppointment!: 'Negocio' | 'Funcionamiento de la plataforma' | 'Otro';
    public typeAppointmentIndicator!: 'Finanzas' | 'Marketing' | 'Sostenibilidad';
    public typeAppointmentIndicatorFinantial!: 'VentasPeriodo' | 'GastosPeriodo' | 'UtilidadPeriodo' | 'ClienteValor' | 'ClienteCantidad' | 'TicketPromedio' | 'CuentasXPagar' | 'CuentasXCobrar' | 'InventarioProductos' | 'InventarioMateriasPrimas' | 'InventarioMercancia' | 'InventarioActivos';
    public typeAppointmentIndicatorMarketing!: 'AdquisicionClientes' | 'RetencionClientes' | 'CampañaDigital' | 'VisualizacionImpresiones' | 'ProspectosGenerados' | 'NumeroVentasCampañaDigital' | 'NumeroTotalVentasCanalesDigitales' | 'ValorVentasCampañaDigital' | 'ValorTotalVentasDigitales' | 'TasaConversion';
    public typeAppointmentIndicatorSustainability!: 'TipoResiduosGeneradoProduccion' | 'CantidadMaterialUsadoProduccion' | 'ResiduosAprovechablesProduccion' | 'CantidadMaterialRecicladoProduccion' | 'TipoResiduosGonsumo' | 'CantidadMaterialConsumo' | 'ConsumoEnergia' | 'VariacionConsumoEnergia' | 'CostosEnergia' | 'ConsumoEnergiaProductoServicio' | 'ConsumoAgua' | 'VariacionConsumoAgua' | 'ReutilizacionAgua' | 'CostoAgua' | 'ConsumoAguaProducto/Servicio' | 'EstrategiaSostenibilidad' | 'NumeroInformesSostenibilidadEmpresaHistoria' | 'MiembrosEquipoGerencialSostenibilidad' | 'NumeroColaboradoresEquipoTrabajanSostenibilidad' | 'NumeroTalleresEntrenamietosGerentes';
    public typeAppointmentPlatform!: 'RegistroProducto' | 'MateriaPrima' | 'LibroDiario' | 'RegistroInformacionEmbudoVentas' | 'RegistroInformacionIndicadores' | 'CalcularIndicadores' | 'VisualizarReportes' | 'DescargarReportesPDFExcel';
    public typeAppointmentOthers!: string;
};

Appointment.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        appointmentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        typeClient: {
            type: DataTypes.STRING,
            validate: {
                isIn: [[ 'User' ]],
            },
            allowNull: false,
        },
        nameClient: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastNameClient: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        corporateName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        corporateNameLeader: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastcorporateNameLeader: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        hour: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        stateAppointment: {
            type: DataTypes.STRING,
            validate: {
                isIn: [[ 'Programada', 'Cancelada', 'Completada', 'Reagendada' ]],
            },
            allowNull: false,
        },
        isAceptedConditions: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        typeAppointment: {
            type: DataTypes.STRING,
            validate: {
                isIn: [[ 'Negocio', 'Funcionamiento de la plataforma', 'Otro' ]],
            },
            allowNull: true,
        },
        typeAppointmentIndicator: {
            type: DataTypes.STRING,
            validate: {
                isIn: [[ 'Finanzas', 'Marketing', 'Sostenibilidad' ]],
            },
            allowNull: true,
        },
        typeAppointmentIndicatorFinantial: {
            type: DataTypes.STRING,
            validate: {
                isIn: [[ 'VentasPeriodo', 'GastosPeriodo', 'UtilidadPeriodo', 'ClienteValor', 'ClienteCantidad', 'TicketPromedio', 'CuentasXPagar', 'CuentasXCobrar', 'InventarioProductos', 'InventarioMateriasPrimas', 'InventarioMercancia', 'InventarioActivos' ]],
            },
            allowNull: true,
        },
        typeAppointmentIndicatorMarketing: {
            type: DataTypes.STRING,
            validate: {
                isIn: [[ 'AdquisicionClientes', 'RetencionClientes', 'CampañaDigital', 'VisualizacionImpresiones', 'ProspectosGenerados', 'NumeroVentasCampañaDigital', 'NumeroTotalVentasCanalesDigitales', 'ValorVentasCampañaDigital', 'ValorTotalVentasDigitales', 'TasaConversion' ]],
            },
            allowNull: true,
        },
        typeAppointmentIndicatorSustainability: {
            type: DataTypes.STRING,
            validate: {
                isIn: [[ 'TipoResiduosGeneradoProduccion', 'CantidadMaterialUsadoProduccion', 'ResiduosAprovechablesProduccion', 'CantidadMaterialRecicladoProduccion', 'TipoResiduosGonsumo', 'CantidadMaterialConsumo', 'ConsumoEnergia', 'VariacionConsumoEnergia', 'CostosEnergia', 'ConsumoEnergiaProductoServicio', 'ConsumoAgua', 'VariacionConsumoAgua', 'ReutilizacionAgua', 'CostoAgua', 'ConsumoAguaProducto/Servicio', 'EstrategiaSostenibilidad', 'NumeroInformesSostenibilidadEmpresaHistoria', 'MiembrosEquipoGerencialSostenibilidad', 'NumeroColaboradoresEquipoTrabajanSostenibilidad', 'NumeroTalleresEntrenamietosGerentes' ]],
            },
            allowNull: true,
        },
        typeAppointmentPlatform: {
            type: DataTypes.STRING,
            validate: {
                isIn: [[ 'RegistroProducto', 'MateriaPrima', 'LibroDiario', 'RegistroInformacionEmbudoVentas', 'RegistroInformacionIndicadores', 'CalcularIndicadores', 'VisualizarReportes', 'DescargarReportesPDFExcel' ]],
            },
            allowNull: true,
        },
        typeAppointmentOthers: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize: db,
        modelName: 'Appointment',
    }
);

export default Appointment;