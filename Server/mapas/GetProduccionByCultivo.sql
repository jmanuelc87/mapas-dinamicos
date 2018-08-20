USE [anuario]
GO

/****** Object:  StoredProcedure [dbo].[GetProduccionByCultivo]    Script Date: 20/08/2018 05:17:05 p.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Juan Manuel Carballo Montaño
-- Description:	Obtiene la produccion del cierre por cultivo
-- =============================================
CREATE PROCEDURE [dbo].[GetProduccionByCultivo]
	@anio INT,
	@ciclo INT,
	@modalidad INT,
	@estado INT,
	@distrito INT,
	@municipio INT,
	@catalogo VARCHAR(8)
AS
BEGIN
	IF @catalogo = 'generico'
		SELECT
               b.cvegenerico as id, b.nomgenerico as cultivo, b.cvegenerico as idvariedad, b.nomgenerico as variedad, CAST(ROUND(a.sembrada, 2) as decimal(12, 2)) as sembrada, CAST(ROUND(a.cosechada, 2) as decimal(12, 2)) as cosechada, CAST(ROUND(a.produccion, 2) AS decimal(12, 2)) as produccion, CAST(ROUND(a.rendimiento, 2) AS decimal(12, 2)) as rendimiento, CAST(ROUND(a.pmr, 2) AS decimal(12, 2)) as pmr, CAST(ROUND(a.valor / 1000, 2) AS decimal(12,2) ) AS valor
            FROM
                agt_gcierre AS a
            FULL OUTER JOIN
                agc_generico AS b ON b.cvegenerico = a.cultivo
            FULL OUTER JOIN
                cat_estado AS d ON a.estado = d.idestado
            FULL OUTER JOIN
                ago_distrito AS e ON a.estado = e.cveestado AND a.ddr = e.cveddr
            FULL OUTER JOIN
                cat_municipal AS f ON a.estado = f.cveestado AND a.mpio = f.cvempio AND a.ddr = f.cveddr
            WHERE
                a.ciclo = @ciclo
                    AND
                a.moda = @modalidad
                    AND
                a.anio = @anio
                    AND
                a.cultivo <> 0
                    AND
                a.estado = @distrito
                    AND
                a.ddr = @distrito
                    AND
                a.mpio = @municipio
                    AND
                a.cader = 0
            ORDER BY
                b.nomgenerico
            ASC
		ELSE
			SELECT
		b.cvecultivo as id, b.nomcultivo as cultivo, c.cvevariedad as idvariedad, 
			CASE c.nomvariedad
				WHEN '' THEN CONCAT(b.nomcultivo, ' ', 's/clasificar')
				ELSE CONCAT(b.nomcultivo, ' ', c.nomvariedad)
			END
			as variedad, 
				CAST(ROUND(a.sembrada, 2) AS decimal(12, 2)) as sembrada, CAST(ROUND(a.cosechada, 2) AS decimal(12, 2)) as cosechada, CAST(ROUND(a.produccion, 2) AS decimal(12, 2)) as produccion, CAST(ROUND(a.rendimiento, 2) AS decimal(12, 2)) as rendimiento, CAST(ROUND(a.pmr, 2) AS decimal(12, 2)) as pmr, CAST(ROUND(a.valor / 1000, 2) AS decimal(12,2) ) AS valor
			FROM
                agt_cierre AS a
            RIGHT JOIN
                ago_cultivo2 AS b ON b.cvecultivo = a.cultivo
            FULL OUTER JOIN
                ago_variedades AS c ON c.cvecultivo = a.cultivo AND c.cvevariedad = a.variedad
            FULL OUTER JOIN
                cat_estado AS d ON a.estado = d.idestado
            FULL OUTER JOIN
                ago_distrito AS e ON a.estado = e.cveestado AND a.ddr = e.cveddr
            FULL OUTER JOIN
                cat_municipal AS f ON a.estado = f.cveestado AND a.mpio = f.cvempio AND a.ddr = f.cveddr
            WHERE
                a.ciclo = @ciclo
                    AND
                a.moda = @modalidad
                    AND
                a.anio = @anio
                    AND
                a.cultivo <> 0
                    AND
                a.estado = @estado
                    AND
                a.ddr = @distrito
                    AND
                a.mpio = @municipio
                    AND
                a.cader = 0
            ORDER BY
                b.nomcultivo
                , c.nomvariedad
            ASC
END
GO

