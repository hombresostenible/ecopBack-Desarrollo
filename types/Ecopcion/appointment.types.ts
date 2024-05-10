export interface IAppointment {
    id: string;
    appointmentId?: number;
    typeClient: 'User' | 'Company';
    nameClient?: string;
    lastNameClient?: string;
    nameCompany?: string;
    nameCompanyLeader?: string;
    lastNameCompanyLeader?: string;
    email: string;
    phone: string;
    date: Date;
    hour: string;
    stateAppointment: 'Programada' | 'Cancelada' | 'Completada' | 'Reagendada';
    acceptPersonalDataPolicy: boolean;
    typeAppointment?: 'Negocio' | 'Funcionamiento de la plataforma' | 'Otro';  
    typeAppointmentIndicator?: 'Finanzas' | 'Marketing' | 'Sostenibilidad';  
    typeAppointmentIndicatorFinantial?: 'VentasPeriodo' | 'GastosPeriodo' | 'UtilidadPeriodo' | 'ClienteValor' | 'ClienteCantidad' | 'TicketPromedio' | 'CuentasXPagar' | 'CuentasXCobrar' | 'InventarioProductos' | 'InventarioMateriasPrimas' | 'InventarioMercancia' | 'InventarioActivos';
    typeAppointmentIndicatorMarketing?: 'AdquisicionClientes' | 'RetencionClientes' | 'CampañaDigital' | 'VisualizacionImpresiones' | 'ProspectosGenerados' | 'NumeroVentasCampañaDigital' | 'NumeroTotalVentasCanalesDigitales' | 'ValorVentasCampañaDigital' | 'ValorTotalVentasDigitales' | 'TasaConversion';
    typeAppointmentIndicatorSustainability?: 'TipoResiduosGeneradoProduccion' | 'CantidadMaterialUsadoProduccion' | 'ResiduosAprovechablesProduccion' | 'CantidadMaterialRecicladoProduccion' | 'TipoResiduosGonsumo' | 'CantidadMaterialConsumo' | 'ConsumoEnergia' | 'VariacionConsumoEnergia' | 'CostosEnergia' | 'ConsumoEnergiaProductoServicio' | 'ConsumoAgua' | 'VariacionConsumoAgua' | 'ReutilizacionAgua' | 'CostoAgua' | 'ConsumoAguaProducto/Servicio' | 'EstrategiaSostenibilidad' | 'NumeroInformesSostenibilidadEmpresaHistoria' | 'MiembrosEquipoGerencialSostenibilidad' | 'NumeroColaboradoresEquipoTrabajanSostenibilidad' | 'NumeroTalleresEntrenamietosGerentes' ;
    typeAppointmentPlatform?: 'RegistroProducto' | 'MateriaPrima' | 'LibroDiario' | 'RegistroInformacionEmbudoVentas' | 'RegistroInformacionIndicadores' | 'CalcularIndicadores' | 'VisualizarReportes' | 'DescargarReportesPDFExcel';
    typeAppointmentOthers?: string;
}