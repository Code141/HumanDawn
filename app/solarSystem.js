solarSystem = ({
	stars : {
		sun : {
			morphologie : {
				equatorialDiametre : 1392684,
				syderalRotation : 0,
				textures : {
					self : 'sun.jpg'
				}
			},
			planets : {
				mercury : {
					morphologie : {
						equatorialDiametre : 4878,
						textures : {
							self : 'mercurymap.jpg',
							bump : 'mercurybump.jpg'
						}
					},
					orbit : {
						orbitalPeriod : 0.2408,
						rotationPeriod : 58.6462,
						orbitalSpeed : 47.9,
						orbitalEccentricity : 0.206,
						aphelion : 69817445,
						perihelion : 46001009,
						inclinaisonOfOrbitToEcliptic : 7,
						inclinaisonOfOrbitToEquator : 0.1,
						axialTilt : 0
					}
				},
				venus : {
					morphologie : {
						equatorialDiametre : 12104,
						textures : {
							self : 'venusmap.jpg',
							bump : 'venusbump.jpg'
						}
					},
					orbit : {
						orbitalPeriod : 0.6152,
						rotationPeriod : -243.0187,
						orbitalSpeed : 35.0,
						orbitalEccentricity : 0.007,
						aphelion : 108942780,
						perihelion : 107476170,
						inclinaisonOfOrbitToEcliptic : 3.39,
						inclinaisonOfOrbitToEquator : 177.3,
						axialTilt : 177
					}	
				},
				earth : {
					morphologie : {
						equatorialDiametre : 12756,
						textures : {
							self : 'earthmap1k.jpg',
							bump : 'earthbump1k.jpg',
							specular : 'earthspec1k.jpg',
							clouds : 'TEMPCLOUDS.jpg'	
						}
					},
					orbit : {
						orbitalPeriod : 1,
						rotationPeriod : 0.99726968,
						orbitalSpeed : 29.8,
						orbitalEccentricity : 0.017,
						aphelion : 152098233,
						perihelion : 147098291,
						inclinaisonOfOrbitToEcliptic : 0,
						inclinaisonOfOrbitToEquator : 23.4,
						axialTilt : 23
					},
					satellits : {
						moon : {
							morphologie : {
								equatorialDiametre : 3474.8,
								textures : {
									self : 'moonmap1k.jpg',
									bump : 'moonbump1k.jpg'
								}
							},
							orbit : {
								orbitalPeriod : 1,
								rotationPeriod : 0.99726968,
								orbitalSpeed : 29.8,
								orbitalEccentricity : 0.017,
								aphelion : 405696,
								perihelion : 363104,
								inclinaisonOfOrbitToEcliptic : 0,
								inclinaisonOfOrbitToEquator : 23.4,
								axialTilt : 23
							}
						},
						iss : {
							morphologie : {
								equatorialDiametre : 0.5,
								textures : {
									self : 'moonmap1k.jpg',
									bump : 'moonbump1k.jpg'
								}
							},
							orbit : {
								orbitalPeriod : 1,
								rotationPeriod : 0.99726968,
								orbitalSpeed : 29.8,
								orbitalEccentricity : 0.017,
								aphelion : 6778,
								perihelion : 6778,
								inclinaisonOfOrbitToEcliptic : 0,
								inclinaisonOfOrbitToEquator : 23.4,
								axialTilt : 23
							}
						}
					}
				},
				mars : {
					morphologie : {
						equatorialDiametre : 6787,
						textures : {
							self : 'mars_1k_color.jpg',
							bump : 'marsbump1k.jpg'
						}
					},
					orbit : {
						orbitalPeriod : 1.8809,
						rotationPeriod : 1.02595675,
						orbitalSpeed : 24.1,
						orbitalEccentricity : 0.093,
						aphelion : 249232432,
						perihelion : 206655215,
						inclinaisonOfOrbitToEcliptic : 1.85,
						inclinaisonOfOrbitToEquator : 25.2,
						axialTilt : 25
					}
				},
				jupiter : {
					morphologie : {
						equatorialDiametre : 142800,
						textures : {
							self : 'jupiter2_1k.jpg'
						}
					},
					orbit : {
						orbitalPeriod : 11.862,
						rotationPeriod : 0.4135344,
						orbitalSpeed : 13.1,
						orbitalEccentricity : 0.048,
						aphelion : 816001807,
						perihelion : 740679835,
						inclinaisonOfOrbitToEcliptic : 1.31,
						inclinaisonOfOrbitToEquator : 3.1,
						axialTilt : 3
					}
				},
				saturn : {
					morphologie : {
						equatorialDiametre : 120000,
						textures : {
							self : 'saturnmap.jpg'
						}
					},
					orbit : {
						orbitalPeriod : 29.458,
						rotationPeriod : 0.44403,
						orbitalSpeed : 9.6,
						orbitalEccentricity : 0.056,
						aphelion : 1503509229,
						perihelion : 1349823615,
						inclinaisonOfOrbitToEcliptic : 2.49,
						inclinaisonOfOrbitToEquator : 26.7,
						axialTilt : 27
					}
				},
				uranus : {
					morphologie : {
						equatorialDiametre : 51200,
						textures : {
							self : 'uranusmap.jpg'
						}
					},
					orbit : {
						orbitalPeriod : 84.01,
						rotationPeriod : -0.71833,
						orbitalSpeed : 6.8,
						orbitalEccentricity : 0.046,
						aphelion : 3006318143,
						perihelion : 2734998229,
						inclinaisonOfOrbitToEcliptic : 0.77,
						inclinaisonOfOrbitToEquator : 97.9,
						axialTilt : 98
					}
				},
				neptune : {
					morphologie : {
						equatorialDiametre : 48600,
						textures : {
							self : 'neptunemap.jpg'
						}
					},
					orbit : {
						orbitalPeriod : 164.79,
						rotationPeriod : 0.67125,
						orbitalSpeed : 5.4,
						orbitalEccentricity : 0.010,
						aphelion : 4537039826,
						perihelion : 4459753056,
						inclinaisonOfOrbitToEcliptic : 1.77,
						inclinaisonOfOrbitToEquator : 29.6,
						axialTilt : 30
					}
				},
				pluto : {
					morphologie : {
						equatorialDiametre : 2300,
						textures : {
							self : 'plutomap2k.jpg',
							bump : 'plutobump1k.jpg'
						}
					},
					orbit : {
						orbitalPeriod : 248.54,
						rotationPeriod : -6.38718,
						orbitalSpeed : 4.7,
						orbitalEccentricity : 0.248,
						aphelion : 7376124302,
						perihelion : 4436756954,
						inclinaisonOfOrbitToEcliptic : 17.15,
						inclinaisonOfOrbitToEquator : 122.5,
						axialTilt : 120
					}
				}
			}
		}
	}
});


/*
equatorialDiametre : 0,				(Km)
orbitalPeriod : 0,					(Year)
rotationPeriod : 0,					(days)
orbitalSpeed : 0,					(Km)
orbitalEccentricity : 0,
aphelion : 0,
perihelion : 0,
inclinaisonOfOrbitToEcliptic : 0,	(Deg)
inclinaisonOfOrbitToEquator : 0,	(Deg)
axialTilt : 0						(Deg)
*/

