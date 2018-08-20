USE [anuario]
GO

/****** Object:  StoredProcedure [dbo].[GetProduccionByEstado]    Script Date: 20/08/2018 05:17:22 p.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Juan Manuel Carballo
-- Create date: 21 de Junio de 2018
-- Description:	Consulta de producción por estado, distrito y municipio
-- =============================================
CREATE PROCEDURE [dbo].[GetProduccionByEstado]
	@anio INT,
	@ciclo INT,
	@moda INT,
	@cultivo INT,
	@variedad INT,
	@estado INT,
	@distrito INT,
	@catalogo varchar(8),
	@filtro varchar(9)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @sql as nvarchar(4000);
	DECLARE @where AS nvarchar(1000);
	DECLARE @from AS nvarchar(1000);
	DECLARE @order AS nvarchar(500);
	DECLARE @cols AS nvarchar(1000);
	DECLARE @op1 AS nvarchar(2);
	DECLARE @op2 AS nvarchar(2);
	DECLARE @op3 AS nvarchar(2);
	DECLARE @paramDefinition AS nvarchar(1500);


	IF @catalogo = 'generico'
		BEGIN
			IF @filtro = 'estado'
				BEGIN
					SET @order = ' ORDER BY [c].[nomestado] ASC';
					SET @cols = '[c].[idestado] as id, [c].[idestado], [c].[nomestado] as estado, ';
				END

			IF @filtro = 'distrito'
				BEGIN
					IF @distrito = 0
						BEGIN
							SET @order = ' ORDER BY [c].[nomestado], [d].[nomddr] ASC';
							SET @cols = '[c].[idestado] as id, [c].[idestado], [c].[nomestado] as estado, [d].[cveddr] as iddistrito, [d].[nomddr] as distrito, ';
						END
					ELSE
						BEGIN
							SET @order = ' ORDER BY [c].[nomestado], [d].[nomddr], [e].[nommpio] ASC';
							SET @cols = '[c].[idestado] as id, [c].[idestado] as id, [c].[idestado], [c].[nomestado] as estado, [d].[cveddr] as iddistrito, [d].[nomddr] as distrito, [e].[cvempio] as idmunicipio, [e].[nommpio] as municipio, ';
						END
				END

			IF @filtro = 'municipio'
				BEGIN
					IF @distrito = 0
						BEGIN
							SET @order = ' ORDER BY [c].[nomestado], [e].[nommpio] ASC';
							SET @cols = '[c].[idestado] as id, [c].[idestado] as id, [c].[idestado], [c].[nomestado] as estado, [e].[cvempio] as idmunicipio, [e].[nommpio] as municipio, ';
						END
					ELSE
						BEGIN
							SET @order = ' ORDER BY [c].[nomestado], [e].[nommpio] ASC';
							SET @cols = '[c].[idestado] as id, [c].[idestado] as id, [c].[idestado], [c].[nomestado] as estado, [e].[cvempio] as idmunicipio, [e].[nommpio] as municipio, ';
						END
				END


			IF @filtro = 'ddr-mun'
				BEGIN
					SET @order = ' ORDER BY [c].[nomestado], [d].[nomddr], [e].[nommpio] ASC';
					SET @cols = '[c].[idestado] as id, [c].[idestado] as id, [c].[idestado], [c].[nomestado] as estado, [d].[cveddr] as iddistrito, [d].[nomddr] as distrito, [e].[cvempio] as idmunicipio, [e].[nommpio] as municipio, ';
				END

			IF @estado = 0 AND @distrito = 0 AND @filtro = 'estado'
				BEGIN
					SET @op1 = '<>';
					SET @op2 = '=';
					SET @op3 = '=';
				END
			ELSE IF @estado = 0 AND @distrito = 0 AND @filtro = 'distrito'
				BEGIN
					SET @op1 = '<>';
					SET @op2 = '<>';
					SET @op3 = '=';
				END
			ELSE IF @estado = 0 AND @distrito = 0 AND @filtro = 'municipio'
				BEGIN
					SET @op1 = '<>';
					SET @op2 = '<>';
					SET @op3 = '<>';
				END
			ELSE IF @estado = 0 AND @distrito = 0 AND @filtro = 'ddr-mun'
				BEGIN
					SET @op1 = '<>';
					SET @op2 = '<>';
					SET @op3 = '<>';
				END
			ELSE IF @estado <> 0 AND @distrito = 0 AND @filtro = 'estado'
				BEGIN
					SET @op1 = '=';
					SET @op2 = '=';
					SET @op3 = '=';
				END
			ELSE IF @estado <> 0 AND @distrito = 0 AND @filtro = 'distrito'
				BEGIN
					SET @op1 = '=';
					SET @op2 = '<>';
					SET @op3 = '=';
				END
			ELSE IF @estado <> 0 AND @distrito = 0 AND @filtro = 'municipio'
				BEGIN
					SET @op1 = '=';
					SET @op2 = '<>';
					SET @op3 = '<>';
				END
			ELSE IF @estado <> 0 AND @distrito = 0 AND @filtro = 'ddr-mun'
				BEGIN
					SET @op1 = '=';
					SET @op2 = '<>';
					SET @op3 = '<>';
				END
			ELSE IF @estado <> 0 AND @distrito <> 0 AND @filtro = 'distrito'
				BEGIN
					SET @op1 = '=';
					SET @op2 = '=';
					SET @op3 = '=';
				END
			ELSE IF @estado <> 0 AND @distrito <> 0 AND @filtro = 'municipio'
				BEGIN
					SET @op1 = '=';
					SET @op2 = '=';
					SET @op3 = '<>';
				END
			ELSE IF @estado <> 0 AND @distrito <> 0 AND @filtro = 'ddr-mun'
				BEGIN
					SET @op1 = '=';
					SET @op2 = '=';
					SET @op3 = '<>';
				END

			IF @cultivo = 0
				SET @cols = @cols + 'CAST(ROUND(a.sembrada, 2) as decimal(12, 2)) as sembrada, CAST(ROUND(a.cosechada, 2) as decimal(12, 2)) as cosechada, CAST(ROUND(a.valor / 1000, 2) AS decimal(12,2) ) as valor';
			ELSE
				SET @cols = @cols + 'CAST(ROUND(a.sembrada, 2) as decimal(12, 2)) as sembrada, CAST(ROUND(a.cosechada, 2) as decimal(12, 2)) as cosechada, CAST(ROUND(a.produccion, 2) as decimal(12, 2)) as produccion, CAST(ROUND(a.rendimiento, 2) as decimal(12, 2)) as rendimiento, [a].[pmr], CAST(ROUND(a.valor / 1000, 2) AS decimal(12,2) ) as valor';

			SET @from = ' FROM
							agt_gcierre as a
						FULL OUTER JOIN
							agc_generico as b ON a.cultivo = b.cvegenerico
						FULL OUTER JOIN
							cat_estado as c ON a.estado = c.idestado
						FULL OUTER JOIN
							ago_distrito as d ON a.ddr = d.cveddr and a.estado = d.cveestado
						FULL OUTER JOIN
							cat_municipal as e ON a.mpio = e.cvempio and a.ddr = e.cveddr and a.estado = e.cveestado';

			SET @where = ' WHERE
								a.anio = @anio
									and
								a.ciclo = @ciclo
									and
								a.moda = @moda
									and
								a.cultivo = @cultivo
									and
								a.estado ' + @op1 + ' @estado
									and
								a.ddr ' + @op2 + ' @distrito
									and
								a.mpio ' + @op3 + ' 0
									and
								a.cader = 0';

			SET @sql = 'SELECT ' + @cols + @from + @where + @order;
			SET @paramDefinition = '@anio INT, @ciclo INT, @moda INT, @cultivo INT, @estado INT, @distrito INT'

			PRINT @sql
			
			EXEC sp_executesql @sql, @paramDefinition, @anio = @anio, @ciclo = @ciclo, @moda = @moda, @cultivo = @cultivo, @estado = @estado, @distrito = @distrito
		END
	ELSE -- Detalle
		BEGIN
			IF @filtro = 'estado'
				BEGIN
					SET @order = ' ORDER BY [c].[nomestado] ASC';
					SET @cols = '[c].[idestado] as id, [c].[idestado], [c].[nomestado] as estado, ';
				END

			IF @filtro = 'distrito'
				BEGIN
					IF @distrito = 0
						BEGIN
							SET @order = ' ORDER BY [c].[nomestado], [d].[nomddr] ASC';
							SET @cols = '[c].[idestado] as id, [c].[idestado], [c].[nomestado] as estado, [d].[cveddr] as iddistrito, [d].[nomddr] as distrito, ';
						END
					ELSE
						BEGIN
							SET @order = ' ORDER BY [c].[nomestado], [d].[nomddr], [e].[nommpio] ASC';
							SET @cols = '[c].[idestado] as id, [c].[idestado], [c].[nomestado] as estado, [d].[cveddr] as iddistrito, [d].[nomddr] as distrito, [e].[cvempio] as idmunicipio, [e].[nommpio] as municipio, ';
						END
				END

			IF @filtro = 'municipio'
				BEGIN
					IF @distrito = 0
						BEGIN
							SET @order = ' ORDER BY [c].[nomestado], [e].[nommpio] ASC';
							SET @cols = '[c].[idestado] as id, [c].[idestado], [c].[nomestado] as estado, [e].[cvempio] as idmunicipio, [e].[nommpio] as municipio, ';
						END
					ELSE
						BEGIN
							SET @order = ' ORDER BY [c].[nomestado], [e].[nommpio] ASC';
							SET @cols = '[c].[idestado] as id, [c].[idestado], [c].[nomestado] as estado, [e].[cvempio] as idmunicipio, [e].[nommpio] as municipio, ';
						END
				END

			IF @filtro = 'ddr-mun'
				BEGIN
					SET @order = ' ORDER BY [c].[nomestado], [d].[nomddr], [e].[nommpio] ASC';
					SET @cols = '[c].[idestado] as id, [c].[idestado], [c].[nomestado] as estado, [d].[cveddr] as iddistrito, [d].[nomddr] as distrito, [e].[cvempio] as idmunicipio, [e].[nommpio] as municipio, ';
				END

			IF @estado = 0 AND @distrito = 0 AND @filtro = 'estado'
				BEGIN
					SET @op1 = '<>';
					SET @op2 = '=';
					SET @op3 = '=';
				END
			ELSE IF @estado = 0 AND @distrito = 0 AND @filtro = 'distrito'
				BEGIN
					SET @op1 = '<>';
					SET @op2 = '<>';
					SET @op3 = '=';
				END
			ELSE IF @estado = 0 AND @distrito = 0 AND @filtro = 'municipio'
				BEGIN
					SET @op1 = '<>';
					SET @op2 = '<>';
					SET @op3 = '<>';
				END
			ELSE IF @estado = 0 AND @distrito = 0 AND @filtro = 'ddr-mun'
				BEGIN
					SET @op1 = '<>';
					SET @op2 = '<>';
					SET @op3 = '<>';
				END
			ELSE IF @estado <> 0 AND @distrito = 0 AND @filtro = 'estado'
				BEGIN
					SET @op1 = '=';
					SET @op2 = '=';
					SET @op3 = '=';
				END
			ELSE IF @estado <> 0 AND @distrito = 0 AND @filtro = 'distrito'
				BEGIN
					SET @op1 = '=';
					SET @op2 = '<>';
					SET @op3 = '=';
				END
			ELSE IF @estado <> 0 AND @distrito = 0 AND @filtro = 'municipio'
				BEGIN
					SET @op1 = '=';
					SET @op2 = '<>';
					SET @op3 = '<>';
				END
			ELSE IF @estado <> 0 AND @distrito = 0 AND @filtro = 'ddr-mun'
				BEGIN
					SET @op1 = '=';
					SET @op2 = '<>';
					SET @op3 = '<>';
				END
			ELSE IF @estado <> 0 AND @distrito <> 0 AND @filtro = 'distrito'
				BEGIN
					SET @op1 = '=';
					SET @op2 = '=';
					SET @op3 = '=';
				END
			ELSE IF @estado <> 0 AND @distrito <> 0 AND @filtro = 'municipio'
				BEGIN
					SET @op1 = '=';
					SET @op2 = '=';
					SET @op3 = '<>';
				END
			ELSE IF @estado <> 0 AND @distrito <> 0 AND @filtro = 'ddr-mun'
				BEGIN
					SET @op1 = '=';
					SET @op2 = '=';
					SET @op3 = '<>';
				END

			IF @cultivo = 0
				SET @cols = @cols + 'CAST(ROUND(a.sembrada, 2) as decimal(12, 2)) as sembrada, CAST(ROUND(a.cosechada, 2) as decimal(12, 2)) as cosechada, CAST(ROUND(a.valor / 1000, 2) AS decimal(12,2) ) as valor';
			ELSE
				SET @cols = @cols + 'CAST(ROUND(a.sembrada, 2) as decimal(12, 2)) as sembrada, CAST(ROUND(a.cosechada, 2) as decimal(12, 2)) as cosechada, CAST(ROUND(a.produccion, 2) as decimal(12, 2)) as produccion, CAST(ROUND(a.rendimiento, 2) as decimal(12, 2)) as rendimiento, [a].[pmr], CAST(ROUND(a.valor / 1000, 2) AS decimal(12,2) ) as valor';

			SET @from = ' FROM
							agt_cierre as a
						FULL OUTER JOIN
							ago_cultivo2 as b ON a.cultivo = b.cvecultivo
						FULL OUTER JOIN
							ago_variedades as f ON a.cultivo = f.cvecultivo and a.variedad = f.cvevariedad
						FULL OUTER JOIN
							cat_estado as c ON a.estado = c.idestado
						FULL OUTER JOIN
							ago_distrito as d ON a.ddr = d.cveddr and a.estado = d.cveestado
						FULL OUTER JOIN
							cat_municipal as e ON a.mpio = e.cvempio and a.ddr = e.cveddr and a.estado = e.cveestado';

			SET @where = ' WHERE
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
								a.estado ' + @op1 + ' @estado
									and
								a.ddr ' + @op2 + ' @distrito
									and
								a.mpio ' + @op3 + ' 0
									and
								a.cader = 0';

			SET @sql = 'SELECT ' + @cols + @from + @where + @order;

			SET @paramDefinition = '@anio INT, @ciclo INT, @moda INT, @cultivo INT, @variedad INT, @estado INT, @distrito INT'
			
			EXEC sp_executesql @sql, @paramDefinition, @anio = @anio, @ciclo = @ciclo, @moda = @moda, @cultivo = @cultivo, @variedad = @variedad, @estado = @estado, @distrito = @distrito
		END
	END
GO

