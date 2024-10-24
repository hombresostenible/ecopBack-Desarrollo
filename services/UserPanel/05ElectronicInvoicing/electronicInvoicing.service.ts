import {  
    // postElectronicInvoicingData,
    getElectronicInvoicingData,
    getElectronicInvoicingByIdData,
} from "../../../data/UserPanel/05ElectronicInvoicing/electronicInvoicing.data";
import axios from 'axios';
// import { IElectronicInvoicing } from "../../../types/UserPanel/05ElectronicInvoicing/electronicInvoicing.types";
import { IParametros, IEncabezado, ITerceros } from "../../../types/UserPanel/05ElectronicInvoicing/electronicInvoicing.types";
import { ServiceError, IServiceLayerResponseElectronicInvoicing } from '../../../types/Responses/responses.types';
import User from '../../../schema/UserPanel/user.schema';

//CONTROLLER PARA CREAR LA FACTURA ELECTRÓNICA
export const postElectronicInvoicingService = async (body: any, userId: string): Promise<any> => {
    try {
        const existingUser = await User.findOne({
            where: { id: userId },
        });

        const updatedParametros: IParametros = {
            VersionDocElectronico: process.env.SIMBA_VERSION_DOC_ELECTRONICO as string,
            NombreSistemaEmisor: process.env.SIMBA_NOMBRE_SISTEMA_EMISOR as string,
            VersionSistemaEmisor: process.env.SIMBA_VERSION_SISTEMA_EMISOR as string,
            ModoRespuesta: process.env.SIMBA_MODO_RESPUESTA as string,
            TipoAmbiente: process.env.SIMBA_TIPO_AMBIENTE as string,
            TokenEmpresa: process.env.SIMBA_TOKEN_EMPRESA as string,
            PasswordEmpresa: process.env.SIMBA_PASSWORD_EMPRESA as string,
            TipoReporte: process.env.SIMBA_TIPO_REPORTE as string,
            Personalizacion: process.env.SIMBA_PERSONALIZACION as string,
            ContactoReceptor: body.Parametros.ContactoReceptor,
            IndicadoresAdicionales: [
                { NombreIndicador: "SKIPVALIDDIANLOGI", Activado: false },
                { NombreIndicador: "SKIPVALIDDIANREQU", Activado: false }
            ]
        };
        
        if (!Array.isArray(body.Lineas)) throw new Error("Lineas no es un array o no está definido.");
        const generationDate = new Date(body.generationDate);
        
        const updateEncabezado: IEncabezado = {
            TipoDocElectronico: '1',
            IdPersonalizacion: { Value: '10' },
            PrefijoDocumento: 'SETT',
            NumeroDocumento: '1',
            IndicaCopiaSpecified: false,
            FechaYHoraDocumento: generationDate,
            FechaDeVencimientoSpecified: false,
            TipoDeFactura: { Value: '01' },
            FechaTributariaSpecified: true,
            CodigoMoneda: { Value: 'COP' },
            CantidadLineas: body.Lineas.length,
            CantidadLineasSpecified: true,
        };

        const updateTerceros: ITerceros = {
            TerceroProveedorContable: {
                IdAdicional: [
                    { Value: '1' }
                ],
                Tercero: {
                    IndicaATravesDeSpecified: false,
                    IndicaAtencionASpecified: false,
                    CodigoClasificacionIndustria: { Value: existingUser?.codeCiiu as string },
                    IdTercero: [ 
                        { 
                            SmaIdCodigo: existingUser?.verificationDigit as string,
                            SmaIdNombre: '31',
                            Value: existingUser?.documentId as string,
                        }
                    ],
                    NombreTercero: [
                        { Value: existingUser?.name ? existingUser?.name + ' ' + existingUser?.lastName : existingUser?.corporateName as string }
                    ],
                    UbicacionFisica: {
                        Direccion: {
                            Id: { Value: existingUser?.codeDane || '' },
                            Departamento: { Value: existingUser?.department || '' },
                            Ciudad: { Value: existingUser?.city || '' },
                            ZonaPostal: { Value: existingUser?.postalCode || '' },
                            SubdivisionPais: { Value: existingUser?.city || '' },
                            SubdivisionPaisCodigo: { Value: existingUser?.subregionCodeDane || '' },
                            LineaDireccion: [
                                { TextoLinea: { Value: existingUser?.address || '' } },
                            ],
                            Pais: {
                                Codigo: { Value: 'CO' },
                                Nombre: {
                                    IdLenguaje: 'es',
                                    Value: 'Colombia',
                                },
                            },
                        },
                    },
                    EsquemaTributarioTercero: [
                        {
                            NombreRegistrado: { Value: existingUser?.name ? `${existingUser.name} ${existingUser.lastName}` : existingUser?.corporateName || '' },
                            NumeroIdTributario: {
                                SmaIdCodigo: existingUser?.verificationDigit || '0',
                                SmaIdNombre: '31',
                                Value: existingUser?.documentId || '',
                            },
                            NivelTributario: {
                                ListaNombre: '48',
                                Value: 'R-99-PN',
                            },
                            DireccionParaImpuestos: {
                                Id: { Value: existingUser?.codeDane || '', },
                                Departamento: { Value: existingUser?.department || '', },
                                Ciudad: { Value: existingUser?.city || '', },
                                ZonaPostal: { Value: existingUser?.postalCode || '', },
                                SubdivisionPais: { Value: existingUser?.city || '', },
                                SubdivisionPaisCodigo: { Value: existingUser?.subregionCodeDane || '', },
                                LineaDireccion: [
                                    { TextoLinea: { Value: existingUser?.address || '', } },
                                ],
                                Pais: {
                                    Codigo: { Value: 'CO' },
                                    Nombre: {
                                        IdLenguaje: 'es',
                                        Value: 'Colombia',
                                    },
                                },
                            },
                            EsquemaTributario: {
                                Id: { Value: '01' },
                                Nombre: { Value: 'IVA' },
                            },
                        },
                    ],
                    EntidadLegalTercero: [
                        {
                            NombreRegistrado: { Value: existingUser?.name ? `${existingUser.name} ${existingUser.lastName}` : existingUser?.corporateName || '' },
                            NumeroIdLegal: {
                                SmaIdCodigo: existingUser?.verificationDigit || '0',
                                SmaIdNombre: '31',
                                Value: existingUser?.documentId || '',
                            },
                            FechaRegistroSpecified: false,
                            FechaExpiracionRegistroSpecified: false,
                            IndicaPropietarioPersonaSpecified: false,
                            IndicaAccionesPagadasSpecified: false,
                            EsquemaRegistroCorporativo: {
                                Id: { Value: 'SETT' },
                                Nombre: { Value: '6496' },
                            },
                        }
                    ]
                },
            },
            TerceroClienteContable: {       // DATOS DEL CLIENTE DE NUESTRO CLIENTE
                IdAdicional: [
                    { Value: '1' }
                ],
                Tercero: {
                    IndicaATravesDeSpecified: false,
                    IndicaAtencionASpecified: false,
                    CodigoClasificacionIndustria: { Value: '6496' },
                    IdTercero: [
                        {
                            SmaIdCodigo: existingUser?.verificationDigit || '0',
                            SmaIdNombre: '30',
                            Value: '222222222222',
                        }
                    ],
                    NombreTercero: [
                        { Value: 'Consumidor final' }
                    ],
                    UbicacionFisica: {
                        Direccion: {
                            Id: { Value: '11001' },
                            Departamento: { Value: 'Bogotá' },
                            Ciudad: { Value: 'Bogotá, D.C.' },
                            ZonaPostal: { Value: '110121' },
                            SubdivisionPais: { Value: 'Bogotá' },
                            SubdivisionPaisCodigo: { Value: '11' },
                            LineaDireccion: [
                                { TextoLinea: { Value: 'Avenida Quito' } },
                            ],
                            Pais: {
                                Codigo: { Value: 'CO' },
                                Nombre: {
                                    IdLenguaje: 'es',
                                    Value: 'Colombia',
                                },
                            },
                        },
                    },
                    EsquemaTributarioTercero: [
                        {
                            NombreRegistrado: { Value: existingUser?.name ? `${existingUser.name} ${existingUser.lastName}` : existingUser?.corporateName || '' },
                            NumeroIdTributario: {
                                SmaIdCodigo: existingUser?.verificationDigit || '0',
                                SmaIdNombre: '31',
                                Value: existingUser?.documentId || '',
                            },
                            NivelTributario: {
                                ListaNombre: '48',
                                Value: 'R-99-PN',
                            },
                            DireccionParaImpuestos: {
                                Id: { Value: existingUser?.codeDane || '', },
                                Departamento: { Value: existingUser?.department || '', },
                                Ciudad: { Value: existingUser?.city || '', },
                                ZonaPostal: { Value: existingUser?.postalCode || '', },
                                SubdivisionPais: { Value: existingUser?.city || '', },
                                SubdivisionPaisCodigo: { Value: existingUser?.subregionCodeDane || '', },
                                LineaDireccion: [
                                    { TextoLinea: { Value: existingUser?.address || '', } },
                                ],
                                Pais: {
                                    Codigo: { Value: 'CO' },
                                    Nombre: {
                                        IdLenguaje: 'es',
                                        Value: 'Colombia',
                                    },
                                },
                            },
                            EsquemaTributario: {
                                Id: { Value: '01' },
                                Nombre: { Value: 'IVA' },
                            },
                        },
                    ],
                    EntidadLegalTercero: [
                        {
                            NombreRegistrado: { Value: existingUser?.name ? `${existingUser.name} ${existingUser.lastName}` : existingUser?.corporateName || '' },
                            NumeroIdLegal: {
                                SmaIdCodigo: existingUser?.verificationDigit || '0',
                                SmaIdNombre: '31',
                                Value: existingUser?.documentId || '',
                            },
                            FechaRegistroSpecified: false,
                            FechaExpiracionRegistroSpecified: false,
                            IndicaPropietarioPersonaSpecified: false,
                            IndicaAccionesPagadasSpecified: false,
                            EsquemaRegistroCorporativo: {
                                Id: { Value: 'SETT' },
                                Nombre: { Value: '6496' },
                            },
                        }
                    ]
                },
            },
        };

        const updatedBody: any = {
            Parametros: updatedParametros,
            Encabezado: updateEncabezado,
            Terceros: updateTerceros,
            Lineas: body.Lineas,
            AgregadoComercial: body.AgregadoComercial,
            Totales: body.Totales,
        };

        const simbaEndpoint = process.env.SIMBA_ENDPOINT;
        if (!simbaEndpoint) throw new ServiceError(500, "El endpoint de Simba no está definido");
        const dataLayerResponse = await axios.post(simbaEndpoint, updatedBody, {
            headers: { 'Content-Type': 'application/json' }
        }).catch((error) => {
            if (axios.isAxiosError(error)) throw new ServiceError(500, `Error en la solicitud a Simba: ${error.response?.data || error.message}`);
            throw error;
        });
        if (!dataLayerResponse) throw new ServiceError(400, "No se puede registrar en el libro diario");
        return { code: 201, result: dataLayerResponse.data || dataLayerResponse }; 
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};
// console.log('updatedBody: ', JSON.stringify(updatedBody, null, 2))

//CONTROLLER OBTENER TODAS LAS FACTURAS ELECTRÓNICAS
export const getElectronicInvoicingService = async (): Promise<IServiceLayerResponseElectronicInvoicing> => {
    try {
        const dataLayerResponse = await getElectronicInvoicingData();
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//CONTROLLER PARA OBTENER UNA FACTURA ELECTRONICA POR ID
export const getElectronicInvoicingByIdService = async (userId: string, idElectronicInvoicing: string): Promise<IServiceLayerResponseElectronicInvoicing> => {
    try {
        const electronicInvoicingFound = await getElectronicInvoicingByIdData(userId, idElectronicInvoicing);
        if (!electronicInvoicingFound) return { code: 404, message: "Factura electrónica no encontrada" };
        return { code: 200, result: electronicInvoicingFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};