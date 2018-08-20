USE [anuario]
GO

/****** Object:  StoredProcedure [dbo].[GetEstadosByParams]    Script Date: 20/08/2018 05:16:47 p.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


--
--	Obtiene los estados, municipios y distritos de acuerdo a los parámetros
--	año desde 1980 hasta 2016
--	moda 1,2,3
--	cultivo
--	variedad
--	estado
--	ddr
--	mpio
--	catalogo 'detalle' o 'generico'
--
CREATE PROCEDURE [dbo].[GetEstadosByParams]
	@anio INT,
	@ciclo INT,
	@moda INT,
	@cultivo INT,
	@variedad INT,
	@estado INT,
	@ddr INT,
	@mpio INT,
	@catalogo VARCHAR(8)
AS
BEGIN
	-- Declaramos variables booleanas para determinar el nivel de granularidad del nivel del query
	DECLARE @B_EST AS INT = 0;	-- Estado
	DECLARE @B_DDR AS INT = 0;  -- Distrito
	DECLARE @B_MUN AS INT = 0;  -- Municipio

	IF @catalogo = 'generico'
		BEGIN
			PRINT 'generico'
			SELECT
				DISTINCT(b.idestado),
				b.nomestado,
				CASE
					WHEN c.cveddr IS NULL THEN -1
					ELSE c.cveddr
				END
					AS cveddr,
				CASE
					WHEN c.nomddr IS NULL THEN ''
					ELSE c.nomddr
				END
					AS nomddr,
				CASE
					WHEN d.cvempio IS NULL THEN -1
					ELSE d.cvempio
				END
					AS cvempio,
				CASE
					WHEN d.nommpio IS NULL THEN ''
					ELSE d.nommpio
				END
					AS nommpio
			FROM
				agt_gcierre AS a
			FULL OUTER JOIN
				cat_estado AS b ON a.estado = b.idestado
			FULL OUTER JOIN
				ago_distrito AS c ON c.cveestado = b.idestado AND c.cveddr = a.ddr
			FULL OUTER JOIN
				cat_municipal AS d ON d.cveestado = b.idestado AND d.cveddr = c.cveddr AND d.cvempio = a.mpio
			WHERE
			(
				a.anio = @anio
					and
				a.ciclo = @ciclo
					and
				a.moda = @moda
					and
				a.cultivo = @cultivo
					and
				estado <> @estado	-- @estado es igual a cero
					and
				ddr = @ddr			-- @ddr es igual a cero
					and
				mpio = @mpio		-- @mpio es igual a cero
					and
				-- Condiciones de ejecucion del query
				@B_EST = @estado	-- si @estado == 0 entonces true
					and
				@B_DDR = @ddr		-- si @ddr == 0 entonces true
					and
				@B_MUN = @mpio      -- si @mpio == 0 entonces true
			)
			UNION ALL
			SELECT
				DISTINCT(b.idestado),
				b.nomestado,
				CASE
					WHEN c.cveddr IS NULL THEN -1
					ELSE c.cveddr
				END
					AS cveddr,
				CASE
					WHEN c.nomddr IS NULL THEN ''
					ELSE c.nomddr
				END
					AS nomddr,
				CASE
					WHEN d.cvempio IS NULL THEN -1
					ELSE d.cvempio
				END
					AS cvempio,
				CASE
					WHEN d.nommpio IS NULL THEN ''
					ELSE d.nommpio
				END
					AS nommpio 
			FROM
				agt_gcierre AS a
			FULL OUTER JOIN
				cat_estado AS b ON a.estado = b.idestado
			FULL OUTER JOIN
				ago_distrito AS c ON c.cveestado = b.idestado AND c.cveddr = a.ddr
			FULL OUTER JOIN
				cat_municipal AS d ON d.cveestado = b.idestado AND d.cveddr = c.cveddr AND d.cvempio = a.mpio
			WHERE
			(
				a.anio = @anio
					and
				a.ciclo = @ciclo
					and
				a.moda = @moda
					and
				a.cultivo = @cultivo
					and
				estado = @estado		-- @estado es diferente a cero
					and
				ddr <> @ddr				-- @ddr es igual a cero
					and
				mpio = @mpio			-- @mpio es igual a cero
					and
				-- condiciones de ejecucion del query
				@B_EST <> @estado
					and
				@B_DDR = @ddr
					and
				@B_MUN = @mpio
			)
			UNION ALL
			SELECT
				DISTINCT(b.idestado),
				b.nomestado,
				CASE
					WHEN c.cveddr IS NULL THEN -1
					ELSE c.cveddr
				END
					AS cveddr,
				CASE
					WHEN c.nomddr IS NULL THEN ''
					ELSE c.nomddr
				END
					AS nomddr,
				CASE
					WHEN d.cvempio IS NULL THEN -1
					ELSE d.cvempio
				END
					AS cvempio,
				CASE
					WHEN d.nommpio IS NULL THEN ''
					ELSE d.nommpio
				END
					AS nommpio 
			FROM
				agt_gcierre AS a
			FULL OUTER JOIN
				cat_estado AS b ON a.estado = b.idestado
			FULL OUTER JOIN
				ago_distrito AS c ON c.cveestado = b.idestado AND c.cveddr = a.ddr
			FULL OUTER JOIN
				cat_municipal AS d ON d.cveestado = b.idestado AND d.cveddr = c.cveddr AND d.cvempio = a.mpio
			WHERE
			(
				a.anio = @anio
					and
				a.ciclo = @ciclo
					and
				a.moda = @moda
					and
				a.cultivo = @cultivo
					and
				estado = @estado		-- @estado es diferente de cero
					and
				ddr = @ddr				-- @ddr es diferente de cero
					and
				mpio <> @mpio			-- @mpio es igual a cero
					and
				-- condiciones de ejecucion del query
				@B_EST <> @estado
					and
				@B_DDR <> @ddr
					and
				@B_MUN = @mpio
			)
			UNION ALL
			SELECT
				DISTINCT(b.idestado),
				b.nomestado,
				CASE
					WHEN c.cveddr IS NULL THEN -1
					ELSE c.cveddr
				END
					AS cveddr,
				CASE
					WHEN c.nomddr IS NULL THEN ''
					ELSE c.nomddr
				END
					AS nomddr,
				CASE
					WHEN d.cvempio IS NULL THEN -1
					ELSE d.cvempio
				END
					AS cvempio,
				CASE
					WHEN d.nommpio IS NULL THEN ''
					ELSE d.nommpio
				END
					AS nommpio 
			FROM
				agt_gcierre AS a
			FULL OUTER JOIN
				cat_estado AS b ON a.estado = b.idestado
			FULL OUTER JOIN
				ago_distrito AS c ON c.cveestado = b.idestado AND c.cveddr = a.ddr
			FULL OUTER JOIN
				cat_municipal AS d ON d.cveestado = b.idestado AND d.cveddr = c.cveddr AND d.cvempio = a.mpio
			WHERE
			(
				a.anio = @anio
					and
				a.ciclo = @ciclo
					and
				a.moda = @moda
					and
				a.cultivo = @cultivo
					and
				estado = @estado			-- @estado es diferente de cero
					and
				ddr = @ddr					-- @ddr es diferente de cero
					and
				mpio = @mpio				-- @mpio es diferente de cero
					and
				-- condiciones de ejecucion del query
				@B_EST <> @estado
					and
				@B_DDR <> @ddr
					and
				@B_MUN <> @mpio
			)
			ORDER BY nomestado ASC
			RETURN
		END
	ELSE
		BEGIN
			PRINT 'detalle'
			SELECT
				DISTINCT(b.idestado),
				b.nomestado,
				CASE
					WHEN c.cveddr IS NULL THEN -1
					ELSE c.cveddr
				END
					AS cveddr,
				CASE
					WHEN c.nomddr IS NULL THEN ''
					ELSE c.nomddr
				END
					AS nomddr,
				CASE
					WHEN d.cvempio IS NULL THEN -1
					ELSE d.cvempio
				END
					AS cvempio,
				CASE
					WHEN d.nommpio IS NULL THEN ''
					ELSE d.nommpio
				END
					AS nommpio 
			FROM
				agt_cierre AS a
			FULL OUTER JOIN
				cat_estado AS b ON a.estado = b.idestado
			FULL OUTER JOIN
				ago_distrito AS c ON c.cveestado = b.idestado AND c.cveddr = a.ddr
			FULL OUTER JOIN
				cat_municipal AS d ON d.cveestado = b.idestado AND d.cveddr = c.cveddr AND d.cvempio = a.mpio
			WHERE
			(
				a.anio = @anio
					and
				a.ciclo = @ciclo
					and
				a.moda = @moda
					and
				a.cultivo = @cultivo
					and
				a.variedad = @variedad
					and
				estado <> @estado	-- @estado es igual a cero
					and
				ddr = @ddr			-- @ddr es igual a cero
					and
				mpio = @mpio		-- @mpio es igual a cero
					and
				-- Condiciones de ejecucion del query
				@B_EST = @estado	-- si @estado == 0 entonces true
					and
				@B_DDR = @ddr		-- si @ddr == 0 entonces true
					and
				@B_MUN = @mpio      -- si @mpio == 0 entonces true
			)
			UNION ALL
			SELECT
				DISTINCT(b.idestado),
				b.nomestado,
				CASE
					WHEN c.cveddr IS NULL THEN -1
					ELSE c.cveddr
				END
					AS cveddr,
				CASE
					WHEN c.nomddr IS NULL THEN ''
					ELSE c.nomddr
				END
					AS nomddr,
				CASE
					WHEN d.cvempio IS NULL THEN -1
					ELSE d.cvempio
				END
					AS cvempio,
				CASE
					WHEN d.nommpio IS NULL THEN ''
					ELSE d.nommpio
				END
					AS nommpio 
			FROM
				agt_cierre AS a
			FULL OUTER JOIN
				cat_estado AS b ON a.estado = b.idestado
			FULL OUTER JOIN
				ago_distrito AS c ON c.cveestado = b.idestado AND c.cveddr = a.ddr
			FULL OUTER JOIN
				cat_municipal AS d ON d.cveestado = b.idestado AND d.cveddr = c.cveddr AND d.cvempio = a.mpio
			WHERE
			(
				a.anio = @anio
					and
				a.ciclo = @ciclo
					and
				a.moda = @moda
					and
				a.cultivo = @cultivo
					and
				a.variedad = @variedad
					and
				estado = @estado		-- @estado es diferente a cero
					and
				ddr <> @ddr				-- @ddr es igual a cero
					and
				mpio = @mpio			-- @mpio es igual a cero
					and
				-- condiciones de ejecucion del query
				@B_EST <> @estado
					and
				@B_DDR = @ddr
					and
				@B_MUN = @mpio
			)
			UNION ALL
			SELECT
				DISTINCT(b.idestado),
				b.nomestado,
				CASE
					WHEN c.cveddr IS NULL THEN -1
					ELSE c.cveddr
				END
					AS cveddr,
				CASE
					WHEN c.nomddr IS NULL THEN ''
					ELSE c.nomddr
				END
					AS nomddr,
				CASE
					WHEN d.cvempio IS NULL THEN -1
					ELSE d.cvempio
				END
					AS cvempio,
				CASE
					WHEN d.nommpio IS NULL THEN ''
					ELSE d.nommpio
				END
					AS nommpio 
			FROM
				agt_cierre AS a
			FULL OUTER JOIN
				cat_estado AS b ON a.estado = b.idestado
			FULL OUTER JOIN
				ago_distrito AS c ON c.cveestado = b.idestado AND c.cveddr = a.ddr
			FULL OUTER JOIN
				cat_municipal AS d ON d.cveestado = b.idestado AND d.cveddr = c.cveddr AND d.cvempio = a.mpio
			WHERE
			(
				a.anio = @anio
					and
				a.ciclo = @ciclo
					and
				a.moda = @moda
					and
				a.cultivo = @cultivo
					and
				a.variedad = @variedad
					and
				estado = @estado		-- @estado es diferente de cero
					and
				ddr = @ddr				-- @ddr es diferente de cero
					and
				mpio <> @mpio			-- @mpio es igual a cero
					and
				-- condiciones de ejecucion del query
				@B_EST <> @estado
					and
				@B_DDR <> @ddr
					and
				@B_MUN = @mpio
			)
			UNION ALL
			SELECT
				DISTINCT(b.idestado),
				b.nomestado,
				CASE
					WHEN c.cveddr IS NULL THEN -1
					ELSE c.cveddr
				END
					AS cveddr,
				CASE
					WHEN c.nomddr IS NULL THEN ''
					ELSE c.nomddr
				END
					AS nomddr,
				CASE
					WHEN d.cvempio IS NULL THEN -1
					ELSE d.cvempio
				END
					AS cvempio,
				CASE
					WHEN d.nommpio IS NULL THEN ''
					ELSE d.nommpio
				END
					AS nommpio 
			FROM
				agt_cierre AS a
			FULL OUTER JOIN
				cat_estado AS b ON a.estado = b.idestado
			FULL OUTER JOIN
				ago_distrito AS c ON c.cveestado = b.idestado AND c.cveddr = a.ddr
			FULL OUTER JOIN
				cat_municipal AS d ON d.cveestado = b.idestado AND d.cveddr = c.cveddr AND d.cvempio = a.mpio
			WHERE
			(
				a.anio = @anio
					and
				a.ciclo = @ciclo
					and
				a.moda = @moda
					and
				a.cultivo = @cultivo
					and
				a.variedad = @variedad
					and
				estado = @estado			-- @estado es diferente de cero
					and
				ddr = @ddr					-- @ddr es diferente de cero
					and
				mpio = @mpio				-- @mpio es diferente de cero
					and
				-- condiciones de ejecucion del query
				@B_EST <> @estado
					and
				@B_DDR <> @ddr
					and
				@B_MUN <> @mpio
			) ORDER BY nomestado ASC
			RETURN
		END
END
GO

