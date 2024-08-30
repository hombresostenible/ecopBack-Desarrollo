[
    {
        "Parametros": {
            "VersionDocElectronico": "4.0",
            "NombreSistemaEmisor": "Simba-Factura-Web",
            "VersionSistemaEmisor": "4.0.0.84",
            "ModoRespuesta": "1",
            "TipoAmbiente": "2",
            "TipoReporte": "1",
            "Wildcards": "[NT_SK_VFA]",
            "Personalizacion": "20",
            "ContactoReceptor": [
                {
                    "CorreoElectronico": "jshernandez@stone.com.co",
                    "IdEtiquetaUbicacionCorreo": "1",
                    "SoloEnvioCasoDeFalloSpecified": false
                },
                {
                    "CorreoElectronico": "jshernandez@stone.com.co",
                    "IdEtiquetaUbicacionCorreo": "2",
                    "SoloEnvioCasoDeFalloSpecified": false
                }
            ],
            "IndicadoresAdicionales": [
                {
                    "NombreIndicador": "SKIPVALIDDIANLOGI",
                    "Activado": true
                },
                {
                    "NombreIndicador": "SKIPVALIDDIANREQU",
                    "Activado": true
                }
            ]
        },


        "Encabezado": {
            "TipoDocElectronico": "1",
            "IdPersonalizacion": {
                "Value": "10"
            },
            "PrefijoDocumento": "",
            "NumeroDocumento": "0",
            "IndicaCopiaSpecified": false,
            "FechaYHoraDocumento": "2024-06-25T12:25:34-05:00",
            "FechaDeVencimientoSpecified": false,
            "TipoDeFactura": {
                "Value": "01"
            },
            "FechaTributariaSpecified": false,
            "CodigoMoneda": {
                "Value": "COP"
            },
            "CantidadLineas": 4.0,
            "CantidadLineasSpecified": true
        },
        
    
        "Terceros": {
            "TerceroProveedorContable": {
                "IdAdicional": [
                    {
                        "Value": "1"
                    }
                ],
                "Tercero": {
                "IndicaATravesDeSpecified": false,
                "IndicaAtencionASpecified": false,
                "CodigoClasificacionIndustria": {
                    "Value": "6496"
                },
                "IdTercero": [
                    {
                        "SmaIdCodigo": "7",
                        "SmaIdNombre": "31",
                        "Value": "830041118"
                    }
                ],
                "NombreTercero": [
                    {
                        "Value": "QUALITY SOFTWARE SAS"
                    }
                ],
                    "UbicacionFisica": {
                        "Direccion": {
                        "Id": {
                            "Value": "11001"
                        },
                        "Departamento": {
                            "Value": "Bogotá"
                        },
                        "Ciudad": {
                            "Value": "Bogotá, D.C."
                        },
                        "ZonaPostal": {
                            "Value": "110121"
                        },
                        "SubdivisionPais": {
                            "Value": "Bogotá"
                        },
                        "SubdivisionPaisCodigo": {
                            "Value": "11"
                        },
                        "LineaDireccion": [
                            {
                            "TextoLinea": {
                                "Value": "CRA 15 No. 98 - 42 OF 401"
                            }
                            }
                        ],
                        "Pais": {
                            "Codigo": {
                            "Value": "CO"
                            },
                            "Nombre": {
                            "IdLenguaje": "es",
                            "Value": "Colombia"
                            }
                        }
                        }
                    },
                    "EsquemaTributarioTercero": [
                        {
                            "NombreRegistrado": {
                                "Value": "QUALITY SOFTWARE SAS"
                            },
                            "NumeroIdTributario": {
                                "SmaIdCodigo": "7",
                                "SmaIdNombre": "31",
                                "Value": "830041118"
                            },
                            "NivelTributario": {
                                "ListaNombre": "48",
                                "Value": "R-99-PN"
                            },
                            "DireccionParaImpuestos": {
                                "Id": {
                                    "Value": "11001"
                                },
                                "Departamento": {
                                    "Value": "Bogotá"
                                },
                                "Ciudad": {
                                    "Value": "Bogotá, D.C."
                                },
                                "ZonaPostal": {
                                    "Value": "110121"
                                },
                                "SubdivisionPais": {
                                    "Value": "Bogotá"
                                },
                                "SubdivisionPaisCodigo": {
                                    "Value": "11"
                                },
                                "LineaDireccion": [
                                    {
                                        "TextoLinea": {
                                            "Value": "CRA 15 No. 98 - 42 OF 401"
                                        }
                                    }
                                ],
                                "Pais": {
                                    "Codigo": {
                                        "Value": "CO"
                                    },
                                    "Nombre": {
                                        "IdLenguaje": "es",
                                        "Value": "Colombia"
                                    }
                                }
                            },
                            "EsquemaTributario": {
                                "Id": {
                                    "Value": "01"
                                },
                                "Nombre": {
                                    "Value": "IVA"
                                }
                            }
                        }
                    ],
                    "EntidadLegalTercero": [
                        {
                            "NombreRegistrado": {
                                "Value": "QUALITY SOFTWARE SAS"
                            },
                            "NumeroIdLegal": {
                                "SmaIdCodigo": "7",
                                "SmaIdNombre": "31",
                                "Value": "830041118"
                            },
                            "FechaRegistroSpecified": false,
                            "FechaExpiracionRegistroSpecified": false,
                            "IndicaPropietarioPersonaSpecified": false,
                            "IndicaAccionesPagadasSpecified": false,
                            "EsquemaRegistroCorporativo": {
                                "Nombre": {
                                    "Value": "6496"
                                }
                            }
                        }
                    ],
                    "Contacto": {
                        "Nombre": {
                            "Value": "Jhon  Sebastián"
                        },
                        "Telefono": {
                            "Value": "15962587"
                        },
                        "Email": {
                            "Value": "jshernandez@stone.com.co"
                        },
                        "Nota": []
                    }
                }
            },

            "TerceroClienteContable": {
                "IdAdicional": [
                    {
                        "Value": "2"
                    }
                ],
                "Tercero": {
                    "IndicaATravesDeSpecified": false,
                    "IndicaAtencionASpecified": false,
                    "IdTercero": [
                        {
                            "SmaIdNombre": "13",
                            "Value": "1234567"
                        }
                    ],
                    "NombreTercero": [
                        {
                            "Value": "Jhon Hernadez"
                        }
                    ],
                    "EsquemaTributarioTercero": [
                        {
                            "NombreRegistrado": {
                                "Value": "Jhon Hernadez"
                            },
                            "NumeroIdTributario": {
                                "SmaIdNombre": "13",
                                "Value": "1234567"
                            },
                            "NivelTributario": {
                                "ListaNombre": "49",
                                "Value": "R-99-PN"
                            },
                            "EsquemaTributario": {
                                "Id": {
                                    "Value": "01"
                                },
                                "Nombre": {
                                    "Value": "IVA"
                                }
                            }
                        }
                    ],
                    "EntidadLegalTercero": [
                        {
                            "NombreRegistrado": {
                                "Value": "Jhon Hernadez"
                            },
                            "NumeroIdLegal": {
                                "SmaIdNombre": "13",
                                "Value": "1234567"
                            },
                            "FechaRegistroSpecified": false,
                            "FechaExpiracionRegistroSpecified": false,
                            "IndicaPropietarioPersonaSpecified": false,
                            "IndicaAccionesPagadasSpecified": false,
                            "EsquemaRegistroCorporativo": {}
                        }
                    ],
                    "Contacto": {
                        "Nombre": {
                            "Value": "Jhon  Sebastián"
                        },
                        "Telefono": {
                            "Value": "15962587"
                        },
                        "Email": {
                            "Value": "jshernandez@stone.com.co"
                        },
                        "Nota": []
                    },
                    "Personas": [
                        {
                            "PrimerNombre": {
                                "Value": "Jhon Hernadez"
                            },
                            "FechaNacimientoSpecified": false
                        }
                    ]
                }
            }
        },

        
        "Lineas": [
            {
                "Id": {
                    "Value": "1"
                },
                "Nota": [
                    {
                        "Value": "Servicio Facturacion Electronica"
                    }
                ],
                "Cantidad": {
                    "CodUnidad": "C62",
                    "Value": 1.0000
                },
                "ValorNeto": {
                    "IdMoneda": "COP",
                    "Value": 1514.0000
                },
                "FechaVigenciaImpuestoSpecified": false,
                "IndicaEsGratisSpecified": false,
                "ReferenciaLineaDocPedido": [],
                "TotalImpuesto": [
                    {
                        "ValorImpuesto": {
                            "IdMoneda": "COP",
                            "Value": 287.6600
                        },
                        "ValorAjusteRedondeo": {
                            "IdMoneda": "COP",
                            "Value": 0.0
                        },
                        "IndicaEsSoloEvidencia": false,
                        "IndicaEsSoloEvidenciaSpecified": true,
                        "IndicaImpuestoIncluidoSpecified": false,
                        "SubTotalImpuesto": [
                            {
                                "BaseImponible": {
                                    "IdMoneda": "COP",
                                    "Value": 1514.0000
                                },
                                "ValorImpuesto": {
                                    "IdMoneda": "COP",
                                    "Value": 287.6600
                                },
                                "SecuenciaNumericaSpecified": false,
                                "PorcentajeSpecified": false,
                                "PorcentajeRangoSpecified": false,
                                "CategoriaImpuesto": {
                                    "Porcentaje": 19.00,
                                    "PorcentajeSpecified": true,
                                    "PorcentajeRangoSpecified": false,
                                    "EsquemaTributario": {
                                        "Id": {
                                            "Value": "01"
                                        },
                                        "Nombre": {
                                            "Value": "IVA"
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {
                        "ValorImpuesto": {
                            "IdMoneda": "COP",
                            "Value": 121.1200
                        },
                        "ValorAjusteRedondeo": {
                            "IdMoneda": "COP",
                            "Value": 0.0
                        },
                        "IndicaEsSoloEvidencia": false,
                        "IndicaEsSoloEvidenciaSpecified": true,
                        "IndicaImpuestoIncluidoSpecified": false,
                        "SubTotalImpuesto": [
                            {
                                "BaseImponible": {
                                    "IdMoneda": "COP",
                                    "Value": 1514.0000
                                },
                                "ValorImpuesto": {
                                    "IdMoneda": "COP",
                                    "Value": 121.1200
                                },
                                "SecuenciaNumericaSpecified": false,
                                "PorcentajeSpecified": false,
                                "PorcentajeRangoSpecified": false,
                                "CategoriaImpuesto": {
                                    "Porcentaje": 8.00,
                                    "PorcentajeSpecified": true,
                                    "PorcentajeRangoSpecified": false,
                                    "EsquemaTributario": {
                                        "Id": {
                                            "Value": "04"
                                        },
                                        "Nombre": {
                                            "Value": "INC"
                                        }
                                    }
                                }
                            }
                        ]
                    }
                ],
                "Item": {
                    "Descripcion": [
                        {
                            "Value": "Servicio Facturacion Electronica"
                        }
                    ],
                    "CantidadEmpaque": {
                        "CodUnidad": "C62",
                        "Value": 1.0000
                    },
                    "ItemsPorEmpaqueSpecified": false,
                    "IndicaDesdeCatalogoSpecified": false,
                    "Nombre": {
                        "Value": "Lapiz H2a"
                    },
                    "IndicadorDePeligroSpecified": false,
                    "Marca": [
                        {
                            "Value": "Faber Castel"
                        }
                    ],
                    "Modelo": [
                        {
                            "Value": "Hb2"
                        }
                    ],
                    "IdItemComprador": {
                        "Id": {
                            "SmaIdCodigo": "999",
                            "SmaIdNombre": "Estándar de adopción del contribuyente",
                            "Value": "9999999999999"
                        },
                        "IdExtendida": {
                            "Value": "IdExtendido"
                        },
                        "IdCodigoDeBarras": {
                            "Value": "Codigo de barras"
                        }
                    },
                    "IdItemVendedor": {
                        "Id": {
                            "SmaIdCodigo": "999",
                            "SmaIdNombre": "Estándar de adopción del contribuyente",
                            "Value": "9999999999999"
                        },
                        "IdExtendida": {
                            "Value": "IdExtendido"
                        },
                        "IdCodigoDeBarras": {
                            "Value": "Codigo de barras"
                        }
                    },
                    "IdItemEstandar": {
                        "Id": {
                            "SmaIdCodigo": "001",
                            "SmaIdNombre": "UNSPSC",
                            "SmaIdOrgEmisorID": "10",
                            "Value": "30192130-1"
                        }
                    },
                    "PropiedadesAdicionalesItem": [
                        {
                            "Nombre": {
                                "Value": "UnidadMedidaNombre"
                            },
                            "Valor": {
                                "Value": "one|Uno"
                            }
                        }
                    ]
                },
                "Precio": {
                    "ValorPrecio": {
                        "IdMoneda": "COP",
                        "Value": 1514.0000
                    },
                    "CantidadBase": {
                        "CodUnidad": "C62",
                        "Value": 1.0000
                    },
                    "FactorConvAUnidadPedidoSpecified": false
                }
            },
            
            {
                "Id": {
                    "Value": "2"
                },
                "Nota": [
                    {
                        "Value": "icui prueba"
                    }
                ],
                "Cantidad": {
                    "CodUnidad": "C62",
                    "Value": 1.0000
                },
                "ValorNeto": {
                    "IdMoneda": "COP",
                    "Value": 80000.0000
                },
                "FechaVigenciaImpuestoSpecified": false,
                "IndicaEsGratisSpecified": false,
                "ReferenciaLineaDocPedido": [],
                "TotalImpuesto": [
                    {
                        "ValorImpuesto": {
                            "IdMoneda": "COP",
                            "Value": 12000.0000
                        },
                        "ValorAjusteRedondeo": {
                            "IdMoneda": "COP",
                            "Value": 0.0
                        },
                        "IndicaEsSoloEvidencia": false,
                        "IndicaEsSoloEvidenciaSpecified": true,
                        "IndicaImpuestoIncluidoSpecified": false,
                        "SubTotalImpuesto": [
                            {
                                "BaseImponible": {
                                    "IdMoneda": "COP",
                                    "Value": 80000.0000
                                },
                                "ValorImpuesto": {
                                    "IdMoneda": "COP",
                                    "Value": 12000.0000
                                },
                                "SecuenciaNumericaSpecified": false,
                                "PorcentajeSpecified": false,
                                "PorcentajeRangoSpecified": false,
                                "CategoriaImpuesto": {
                                    "Porcentaje": 15.00,
                                    "PorcentajeSpecified": true,
                                    "PorcentajeRangoSpecified": false,
                                    "EsquemaTributario": {
                                        "Id": {
                                            "Value": "35"
                                        },
                                        "Nombre": {
                                            "Value": "ICUI"
                                        }
                                    }
                                }
                            }
                        ]
                    }
                ],
                "Item": {
                    "Descripcion": [
                        {
                            "Value": "icui prueba"
                        }
                    ],
                    "ItemsPorEmpaqueSpecified": false,
                    "IndicaDesdeCatalogoSpecified": false,
                    "Nombre": {
                        "Value": "icui prueba"
                    },
                    "IndicadorDePeligroSpecified": false,
                    "IdItemEstandar": {
                        "Id": {
                            "SmaIdCodigo": "999",
                            "SmaIdNombre": "Estándar de adopción del contribuyente",
                            "Value": "icui prueba"
                        }
                    },
                    "PropiedadesAdicionalesItem": [
                        {
                            "Nombre": {
                                "Value": "UnidadMedidaNombre"
                            },
                            "Valor": {
                                "Value": "one|Uno"
                            }
                        }
                    ]
                },
                "Precio": {
                    "ValorPrecio": {
                        "IdMoneda": "COP",
                        "Value": 80000.0000
                    },
                    "CantidadBase": {
                        "CodUnidad": "C62",
                        "Value": 1.0000
                    },
                    "FactorConvAUnidadPedidoSpecified": false
                }
            },

            {
                "Id": {
                    "Value": "3"
                },
                "Nota": [
                    {
                        "Value": "PORTATIL - PRUEBA"
                    }
                ],
                "Cantidad": {
                    "CodUnidad": "C62",
                    "Value": 1.0000
                },
                "ValorNeto": {
                    "IdMoneda": "COP",
                    "Value": 5000000.0000
                },
                "FechaVigenciaImpuestoSpecified": false,
                "IndicaEsGratisSpecified": false,
                "ReferenciaLineaDocPedido": [],
                "Item": {
                    "Descripcion": [
                        {
                            "Value": "PORTATIL - PRUEBA"
                        }
                    ],
                    "CantidadEmpaque": {
                        "CodUnidad": "C62",
                        "Value": 0.0000
                    },
                    "ItemsPorEmpaqueSpecified": false,
                    "IndicaDesdeCatalogoSpecified": false,
                    "Nombre": {
                        "Value": "PORTATIL PRUEBA"
                    },
                    "IndicadorDePeligroSpecified": false,
                    "IdItemEstandar": {
                        "Id": {
                            "SmaIdCodigo": "001",
                            "SmaIdNombre": "UNSPSC",
                            "SmaIdOrgEmisorID": "10",
                            "Value": "72222100-8"
                        }
                    },
                    "PropiedadesAdicionalesItem": [
                        {
                            "Nombre": {
                                "Value": "UnidadMedidaNombre"
                            },
                            "Valor": {
                                "Value": "one|Uno"
                            }
                        }
                    ]
                },
                "Precio": {
                    "ValorPrecio": {
                        "IdMoneda": "COP",
                        "Value": 5000000.0000
                    },
                    "CantidadBase": {
                        "CodUnidad": "C62",
                        "Value": 1.0000
                    },
                    "FactorConvAUnidadPedidoSpecified": false
                }
            },
            
            {
                "Id": {
                    "Value": "4"
                },
                "Nota": [
                    {
                        "Value": "inhalambricos marca samsung"
                    }
                ],
                "Cantidad": {
                    "CodUnidad": "C62",
                    "Value": 2.0000
                },
                "ValorNeto": {
                    "IdMoneda": "COP",
                    "Value": 460000.0000
                },
                "FechaVigenciaImpuestoSpecified": false,
                "IndicaEsGratisSpecified": false,
                "ReferenciaLineaDocPedido": [],
                "TotalRetenciones": [
                    {
                        "ValorImpuesto": {
                            "IdMoneda": "COP",
                            "Value": 4600.0000
                        },
                        "ValorAjusteRedondeo": {
                            "IdMoneda": "COP",
                            "Value": 0.0
                        },
                        "IndicaEsSoloEvidencia": true,
                        "IndicaEsSoloEvidenciaSpecified": true,
                        "IndicaImpuestoIncluidoSpecified": false,
                        "SubTotalImpuesto": [
                            {
                                "BaseImponible": {
                                    "IdMoneda": "COP",
                                    "Value": 460000.0000
                                },
                                "ValorImpuesto": {
                                    "IdMoneda": "COP",
                                    "Value": 4600.0000
                                },
                                "SecuenciaNumericaSpecified": false,
                                "PorcentajeSpecified": false,
                                "PorcentajeRangoSpecified": false,
                                "CategoriaImpuesto": {
                                    "Porcentaje": 1.00,
                                    "PorcentajeSpecified": true,
                                    "PorcentajeRangoSpecified": false,
                                    "EsquemaTributario": {
                                        "Id": {
                                            "Value": "06"
                                        },
                                        "Nombre": {
                                            "Value": "ReteRenta"
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {
                        "ValorImpuesto": {
                            "IdMoneda": "COP",
                            "Value": 4443.6000
                        },
                        "ValorAjusteRedondeo": {
                            "IdMoneda": "COP",
                            "Value": 0.0
                        },
                        "IndicaEsSoloEvidencia": true,
                        "IndicaEsSoloEvidenciaSpecified": true,
                        "IndicaImpuestoIncluidoSpecified": false,
                        "SubTotalImpuesto": [
                            {
                                "BaseImponible": {
                                    "IdMoneda": "COP",
                                    "Value": 460000.0000
                                },
                                "ValorImpuesto": {
                                    "IdMoneda": "COP",
                                    "Value": 4443.6000
                                },
                                "SecuenciaNumericaSpecified": false,
                                "PorcentajeSpecified": false,
                                "PorcentajeRangoSpecified": false,
                                "CategoriaImpuesto": {
                                    "Porcentaje": 0.9660,
                                    "PorcentajeSpecified": true,
                                    "PorcentajeRangoSpecified": false,
                                    "EsquemaTributario": {
                                        "Id": {
                                            "Value": "07"
                                        },
                                        "Nombre": {
                                            "Value": "ReteICA"
                                        }
                                    }
                                }
                            }
                        ]
                    }
                ],
                "Item": {
                    "Descripcion": [
                        {
                            "Value": "inhalambricos marca samsung"
                        }
                    ],
                    "CantidadEmpaque": {
                        "CodUnidad": "C62",
                        "Value": 0.0000
                    },
                    "ItemsPorEmpaqueSpecified": false,
                    "IndicaDesdeCatalogoSpecified": false,
                    "Nombre": {
                        "Value": "audifonos"
                    },
                    "IndicadorDePeligroSpecified": false,
                    "IdItemEstandar": {
                        "Id": {
                            "SmaIdCodigo": "999",
                            "SmaIdNombre": "Estándar de adopción del contribuyente",
                            "Value": "496"
                        },
                        "IdExtendida": {
                            "Value": "tecnología sonido"
                        }
                    },
                    "PropiedadesAdicionalesItem": [
                        {
                            "Nombre": {
                                "Value": "UnidadMedidaNombre"
                            },
                            "Valor": {
                                "Value": "one|Uno"
                            }
                        }
                    ]
                },
                "Precio": {
                    "ValorPrecio": {
                        "IdMoneda": "COP",
                        "Value": 230000.0000
                    },
                    "CantidadBase": {
                        "CodUnidad": "C62",
                        "Value": 2.0000
                    },
                    "FactorConvAUnidadPedidoSpecified": false
                }
            }
        ],

        "AgregadoComercial": {
            "MediosDePago": [
                {
                    "Id": {
                        "Value": "1"
                    },
                    "CodigoMedioDePago": {
                        "Value": "31"
                    },
                    "FechaLimitePagoSpecified": false,
                    "IdInstruccion": {
                        "Value": "02"
                    },
                    "NotaInstruccion": [
                        {
                            "Value": "Por favor realizar consignación a la cuenta corriente N° 123545678912 de Banco de Colombia"
                        }
                    ],
                    "IdPago": [
                        {
                            "Value": "1"
                        }
                    ],
                    "CuentaFinancieraPagador": {
                        "Id": {
                            "Value": "12345678912"
                        },
                        "Nombre": {
                            "Value": "Cuenta sede prueba bucaramanga"
                        },
                        "TipoDeCuenta": {
                            "Value": "Corriente"
                        },
                        "CodigoMoneda": {
                            "Value": "COP"
                        },
                        "Nota": [],
                        "Pais": {
                            "Codigo": {
                                "Value": "CO"
                            },
                            "Nombre": {
                                "IdLenguaje": "es",
                                "Value": "Colombia"
                            }
                        }
                    }
                }
            ]
        },

        "Notas": [
            {
                "Value": "[VLetras Origen]CINCO MILLONES QUINIENTOS CINCUENTA Y TRES MIL NOVECIENTOS VEINTE Y TRES COP "
            },
            {
                "Value": "[Usuario]JHON HERNANDEZ - CONSULTORIA 2"
            },
            {
                "Value": "[SaldoAFavor]0"
            },
            {
                "Value": "[VLetras Alternativo]CINCO MILLONES QUINIENTOS CUARENTA Y CUATRO MIL OCHOCIENTOS SETENTA Y NUEVE COP "
            },
            {
                "Value": "[Rete Renta]4600.0000"
            },
            {
                "Value": "[Rete Ica]4444.0000"
            },
            {
                "Value": "[Pie Pagina] Prie de PAgina 1"
            }
        ],

        "Totales": {
            "TotalImpuestos": [
                {
                    "ValorImpuesto": {
                        "IdMoneda": "COP",
                        "Value": 288.0000
                    },
                    "ValorAjusteRedondeo": {
                        "IdMoneda": "COP",
                        "Value": 0.0
                    },
                    "IndicaEsSoloEvidenciaSpecified": false,
                    "IndicaImpuestoIncluidoSpecified": false,
                    "SubTotalImpuesto": [
                        {
                            "BaseImponible": {
                                "IdMoneda": "COP",
                                "Value": 1514.0000
                            },
                            "ValorImpuesto": {
                                "IdMoneda": "COP",
                                "Value": 288.0000
                            },
                            "SecuenciaNumericaSpecified": false,
                            "PorcentajeSpecified": false,
                            "PorcentajeRangoSpecified": false,
                            "CategoriaImpuesto": {
                                "Porcentaje": 19.00,
                                "PorcentajeSpecified": true,
                                "PorcentajeRangoSpecified": false,
                                "EsquemaTributario": {
                                    "Id": {
                                        "Value": "01"
                                    },
                                    "Nombre": {
                                        "Value": "IVA"
                                }
                                }
                            }
                        }
                    ]
                },
                {
                    "ValorImpuesto": {
                        "IdMoneda": "COP",
                        "Value": 121.0000
                    },
                    "ValorAjusteRedondeo": {
                        "IdMoneda": "COP",
                        "Value": 0.0
                    },
                    "IndicaEsSoloEvidenciaSpecified": false,
                    "IndicaImpuestoIncluidoSpecified": false,
                    "SubTotalImpuesto": [
                        {
                            "BaseImponible": {
                                "IdMoneda": "COP",
                                "Value": 1514.0000
                            },
                            "ValorImpuesto": {
                                "IdMoneda": "COP",
                                "Value": 121.0000
                            },
                            "SecuenciaNumericaSpecified": false,
                            "PorcentajeSpecified": false,
                            "PorcentajeRangoSpecified": false,
                            "CategoriaImpuesto": {
                                "Porcentaje": 8.00,
                                "PorcentajeSpecified": true,
                                "PorcentajeRangoSpecified": false,
                                "EsquemaTributario": {
                                    "Id": {
                                        "Value": "04"
                                    },
                                    "Nombre": {
                                        "Value": "INC"
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    "ValorImpuesto": {
                        "IdMoneda": "COP",
                        "Value": 12000.0000
                    },
                    "ValorAjusteRedondeo": {
                        "IdMoneda": "COP",
                        "Value": 0.0
                    },
                    "IndicaEsSoloEvidenciaSpecified": false,
                    "IndicaImpuestoIncluidoSpecified": false,
                    "SubTotalImpuesto": [
                        {
                            "BaseImponible": {
                                "IdMoneda": "COP",
                                "Value": 80000.0000
                            },
                            "ValorImpuesto": {
                                "IdMoneda": "COP",
                                "Value": 12000.0000
                            },
                            "SecuenciaNumericaSpecified": false,
                            "PorcentajeSpecified": false,
                            "PorcentajeRangoSpecified": false,
                            "CategoriaImpuesto": {
                                "Porcentaje": 15.00,
                                "PorcentajeSpecified": true,
                                "PorcentajeRangoSpecified": false,
                                "EsquemaTributario": {
                                    "Id": {
                                        "Value": "35"
                                    },
                                    "Nombre": {
                                        "Value": "ICUI"
                                    }
                                }
                            }
                        }
                    ]
                }
            ],

            "TotalRetenciones": [
                {
                    "ValorImpuesto": {
                        "IdMoneda": "COP",
                        "Value": 4600.0000
                    },
                    "ValorAjusteRedondeo": {
                        "IdMoneda": "COP",
                        "Value": 0.0
                    },
                    "IndicaEsSoloEvidenciaSpecified": false,
                    "IndicaImpuestoIncluidoSpecified": false,
                    "SubTotalImpuesto": [
                        {
                            "BaseImponible": {
                                "IdMoneda": "COP",
                                "Value": 460000.0000
                            },
                            "ValorImpuesto": {
                                "IdMoneda": "COP",
                                "Value": 4600.0000
                            },
                            "SecuenciaNumericaSpecified": false,
                            "PorcentajeSpecified": false,
                            "PorcentajeRangoSpecified": false,
                            "CategoriaImpuesto": {
                                "Porcentaje": 1.00,
                                "PorcentajeSpecified": true,
                                "PorcentajeRangoSpecified": false,
                                "EsquemaTributario": {
                                    "Id": {
                                        "Value": "06"
                                    },
                                    "Nombre": {
                                        "Value": "ReteRenta"
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    "ValorImpuesto": {
                        "IdMoneda": "COP",
                        "Value": 4444.0000
                    },
                    "ValorAjusteRedondeo": {
                        "IdMoneda": "COP",
                        "Value": 0.0
                    },
                    "IndicaEsSoloEvidenciaSpecified": false,
                    "IndicaImpuestoIncluidoSpecified": false,
                    "SubTotalImpuesto": [
                        {
                            "BaseImponible": {
                                "IdMoneda": "COP",
                                "Value": 460000.0000
                            },
                            "ValorImpuesto": {
                                "IdMoneda": "COP",
                                "Value": 4444.0000
                            },
                            "SecuenciaNumericaSpecified": false,
                            "PorcentajeSpecified": false,
                            "PorcentajeRangoSpecified": false,
                            "CategoriaImpuesto": {
                                "Porcentaje": 0.9660,
                                "PorcentajeSpecified": true,
                                "PorcentajeRangoSpecified": false,
                                "EsquemaTributario": {
                                    "Id": {
                                        "Value": "07"
                                    },
                                    "Nombre": {
                                        "Value": "ReteICA"
                                    }
                                }
                            }
                        }
                    ]
                }
            ],

            "TotalMonetario": {
                "ValorBruto": {                     //SUMA DE TODOS LOS PRODUCTOS
                    "IdMoneda": "COP",
                    "Value": 5541514.0000
                },
                "ValorBaseImpuestos": {             //SUMA DE TODOS LOS PRODUCTOS QUE TIENEN IMPUESTOS (ICA E IVA) NO SE INCLUYEN RETENCIONES
                    "IdMoneda": "COP",
                    "Value": 81514.0000
                },
                "TotalMasImpuestos": {              //SUMA DE TODOS LOS PRODUCTOS MAS LOS IMPUESTOS (ICA, IVA Y ICUI) SIN RETENCIONES
                    "IdMoneda": "COP",
                    "Value": 5553923.0000
                },
                "ValorAjusteRedondeo": {
                    "IdMoneda": "COP",
                    "Value": 0.0000
                },
                "ValorAPagar": {                    //SUMA DE TODOS LOS PRODUCTOS MAS LOS IMPUESTOS (ICA, IVA Y ICUI) SIN RETENCIONES
                    "IdMoneda": "COP",
                    "Value": 5553923.0000
                },
                "ValorAPagarAlternativo": {         //SUMA DE TODOS LOS PRODUCTOS MAS LOS IMPUESTOS (ICA, IVA Y ICUI) MENOS RETENCIONES
                    "IdMoneda": "COP",
                    "Value": 5544879.0000
                }
            }
        }
    }
]