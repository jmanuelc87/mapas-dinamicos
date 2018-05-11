/**
 * import configurations for esri workers
 */
import './config';

/**
 * import default styles from node_modules packages
 */
import '../node_modules/calcite-maps/dist/css/calcite-maps-bootstrap.min-v0.7.css';
import '../node_modules/calcite-maps/dist/css/calcite-maps-arcgis-4.x.min-v0.7.css';
import '../node_modules/arcgis-js-api/css/main.scss';

/**
 * import custom styles from src packages
 */
import './css/main.scss';

/**
 * dojo plugin to load when dom ready
 */
import './services/geometry-service';
import 'dojo/domReady';