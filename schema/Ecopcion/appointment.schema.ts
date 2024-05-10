import { DataTypes, Model } from 'sequelize';
import db from '../../db';

class Appointment extends Model {
    public id!: string;
    public appointmentId!: number;
    public typeClient!: 'User' | 'Company';
    public nameClient!: string;
    public lastNameClient!: string;
    public nameCompany!: string;
    public nameCompanyLeader!: string;
    public lastNameCompanyLeader!: string;
    public email!: string;
    public phone!: string;
    public date!: Date;
    public hour!: string;
    public stateAppointment!: 'Programada' | 'Cancelada' | 'Completada' | 'Reagendada';
    public acceptPersonalDataPolicy!: boolean;
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
            allowNull: false,
            validate: {
              isIn: [[ 'User', 'Company' ]],
            },
        },
        nameClient: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastNameClient: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nameCompany: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nameCompanyLeader: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastNameCompanyLeader: {
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
            allowNull: false,
            validate: {
                isIn: [[ 'Programada', 'Cancelada', 'Completada', 'Reagendada' ]],
            },
        },
        acceptPersonalDataPolicy: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        typeAppointment: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [[ 'Negocio', 'Funcionamiento de la plataforma', 'Otro' ]],
            },
        },
        typeAppointmentIndicator: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [[ 'Finanzas', 'Marketing', 'Sostenibilidad' ]],
            },
        },
        typeAppointmentIndicatorFinantial: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [[ 'VentasPeriodo', 'GastosPeriodo', 'UtilidadPeriodo', 'ClienteValor', 'ClienteCantidad', 'TicketPromedio', 'CuentasXPagar', 'CuentasXCobrar', 'InventarioProductos', 'InventarioMateriasPrimas', 'InventarioMercancia', 'InventarioActivos' ]],
            },
        },
        typeAppointmentIndicatorMarketing: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [[ 'AdquisicionClientes', 'RetencionClientes', 'CampañaDigital', 'VisualizacionImpresiones', 'ProspectosGenerados', 'NumeroVentasCampañaDigital', 'NumeroTotalVentasCanalesDigitales', 'ValorVentasCampañaDigital', 'ValorTotalVentasDigitales', 'TasaConversion' ]],
            },
        },
        typeAppointmentIndicatorSustainability: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [[ 'TipoResiduosGeneradoProduccion', 'CantidadMaterialUsadoProduccion', 'ResiduosAprovechablesProduccion', 'CantidadMaterialRecicladoProduccion', 'TipoResiduosGonsumo', 'CantidadMaterialConsumo', 'ConsumoEnergia', 'VariacionConsumoEnergia', 'CostosEnergia', 'ConsumoEnergiaProductoServicio', 'ConsumoAgua', 'VariacionConsumoAgua', 'ReutilizacionAgua', 'CostoAgua', 'ConsumoAguaProducto/Servicio', 'EstrategiaSostenibilidad', 'NumeroInformesSostenibilidadEmpresaHistoria', 'MiembrosEquipoGerencialSostenibilidad', 'NumeroColaboradoresEquipoTrabajanSostenibilidad', 'NumeroTalleresEntrenamietosGerentes' ]],
            },
        },
        typeAppointmentPlatform: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [[ 'RegistroProducto', 'MateriaPrima', 'LibroDiario', 'RegistroInformacionEmbudoVentas', 'RegistroInformacionIndicadores', 'CalcularIndicadores', 'VisualizarReportes', 'DescargarReportesPDFExcel' ]],
            },
        },
        typeAppointmentOthers: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: 'Appointment',
    }
);

export default Appointment;