<?php

use app\widgets\NavbarWidget;

$this->title = 'Mapas Dinámicos';

?>

<?php echo NavbarWidget::widget(); ?>

<div class="calcite-map calcite-map-absolute">
    <div id="mapViewDiv"></div>
</div>


